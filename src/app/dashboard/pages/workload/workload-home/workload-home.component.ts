import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IWorkload } from '../../../interface/workload';
import { Subscription } from 'rxjs';
import { WorkloadService } from '../../../service/workload.service';
import { IValuePagination } from '../../../../interface';
import { WorkloadTableComponent } from '../../../components/workload/workload-table/workload-table.component';

@Component({
  selector: 'app-workload-home',
  standalone: true,
  imports: [
    CommonModule,
    WorkloadTableComponent
  ],
  templateUrl: './workload-home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkloadHomeComponent implements OnInit, OnDestroy {

  public IWorkload= signal<IWorkload[]>([]);
  public pages = signal<number>(0);
  public totalPages = signal<number>(0);
  private workloadSubscription: Subscription = new Subscription();
  constructor(
    private readonly workloadService:WorkloadService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.getWorkLoads({ skip: this.pages(), limit: 6 });
  }

  ngOnInit(): void {
    this.workloadSubscription = this.workloadService.typePeriodCreated.subscribe(() => {
      this.getWorkLoads({ skip: this.pages(), limit: 6 });
    });
  }

  public getWorkLoads(pages:IValuePagination):void{
    const userId = this.route.snapshot.paramMap.get("user_id");
    this.workloadService.getWorkloads(+userId!,pages)
      .subscribe( res => {  
        // console.log(res.data)
        const resCareers:IWorkload[] = res.data.content.map(t => ({
          id: t.id,
          period: {
            id: t.period.id,
            endDate: t.period.endDate, 
            startDate: t.period.startDate,
            status: t.period.status,
            name: t.period.name,
            management:{
              description: t.period.management.description,
              id: t.period.management.id,
              name: t.period.management.name,
              status: t.period.management.status,
            },
            typePeriod:{
              description:t.period.typePeriod.description,
              id:t.period.typePeriod.id,
              status:t.period.typePeriod.status,
            },
          },
          user:{
            email:t.user.email,
            id:t.user.id,
            name: t.user.name,
            phone:t.user.phone,
            roles: t.user.roles.map(r => r)
          }
        }));
        this.IWorkload.update((_)=>resCareers)
        this.totalPages.set(res.data.totalPages)
      })
  }

  public nextPage():void{
    if(this.pages() < this.totalPages() - 1 ){
      console.log({page: this.pages(),tota: this.totalPages()})
      this.pages.update(value => value + 1);
      this.getWorkLoads({ skip: this.pages(), limit: 6 });
    }
  }
  public previewPage():void{
    if(this.pages() >= 1 ){
      console.log({page: this.pages(),total: this.totalPages()})
      this.pages.update(value => value - 1);
      this.getWorkLoads({ skip: this.pages(), limit: 6 });
    }
  }

  public onNavCreate(){
    this.router.navigate(["/dashboard/tipo-periodo/create"]);
  }

  ngOnDestroy(): void {
    if (this.workloadSubscription) {
      this.workloadSubscription.unsubscribe();
    }
  }
}
