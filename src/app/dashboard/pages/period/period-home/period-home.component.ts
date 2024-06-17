import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { IPeriod } from '../../../interface/period';
import { Subscription } from 'rxjs';
import { PeriodService } from '../../../service/period.service';
import { Router } from '@angular/router';
import { IValuePagination } from '../../../../interface';
import { PeriodTableComponent } from '../../../components/period/period-table/period-table.component';

@Component({
  selector: 'app-period-home',
  standalone: true,
  imports: [
    CommonModule,
    PeriodTableComponent
  ],
  templateUrl: './period-home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodHomeComponent implements OnInit, OnDestroy {

  public IPeriods= signal<IPeriod[]>([]);
  public pages = signal<number>(0);
  public totalPages = signal<number>(0);
  private periodSubscription: Subscription = new Subscription();
  constructor(
    private readonly periodService:PeriodService,
    private router: Router
  ) {
    this.getPeriods({ skip: this.pages(), limit: 6 });
  }

  ngOnInit(): void {
    this.periodSubscription = this.periodService.periodCreated.subscribe(() => {
      this.getPeriods({ skip: this.pages(), limit: 6 });
    });
  }

  public getPeriods(pages:IValuePagination):void{
    this.periodService.getPeriods(pages)
      .subscribe( res => {  
        // console.log(res.data)
        const resCareers:IPeriod[] = res.data.content.map(t => ({
          id: t.id,
          name: t.name,
          startDate: t.startDate,
          endDate: t.endDate,
          status: t.status,
          management:{
            id: t.management.id,
            description: t.management.description,
            name: t.management.name,
            status: t.management.status,
          },
          typePeriod: {
            id: t.typePeriod.id,
            description: t.typePeriod.description,
            status: t.typePeriod.status,
          }
        }));
        this.IPeriods.update((_)=>resCareers)
        this.totalPages.set(res.data.totalPages)
      })
  }

  public deletePeriod(id: number){
    this.periodService.deletePeriod(id).subscribe(
      {
        next: (res)=>{
          console.log(res)
          this.getPeriods({ skip: this.pages(), limit: 6 });
        },
        error: (err)=>{
          console.log(err)
        }
      }
    )
  }

  public nextPage():void{
    if(this.pages() < this.totalPages() - 1 ){
      console.log({page: this.pages(),tota: this.totalPages()})
      this.pages.update(value => value + 1);
      this.getPeriods({ skip: this.pages(), limit: 6 });
    }
  }
  public previewPage():void{
    if(this.pages() >= 1 ){
      console.log({page: this.pages(),total: this.totalPages()})
      this.pages.update(value => value - 1);
      this.getPeriods({ skip: this.pages(), limit: 6 });
    }
  }

  public onNavCreate(){
    this.router.navigate(["/dashboard/periodo/create"]);
  }

  ngOnDestroy(): void {
    if (this.periodSubscription) {
      this.periodSubscription.unsubscribe();
    }
  }
}
