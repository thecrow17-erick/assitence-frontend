import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { IManagement } from '../../../interface/management';
import { Subscription } from 'rxjs';
import { ManagementService } from '../../../service/management.service';
import { Router } from '@angular/router';
import { IValuePagination } from '../../../../interface';
import { ManagementTableComponent } from '../../../components/management/management-table/management-table.component';

@Component({
  selector: 'app-management-home',
  standalone: true,
  imports: [
    CommonModule,
    ManagementTableComponent
  ],
  templateUrl: './management-home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementHomeComponent implements OnInit, OnDestroy {

  public IManagements= signal<IManagement[]>([]);
  public pages = signal<number>(0);
  public totalPages = signal<number>(0);
  private managementSubscription: Subscription = new Subscription();
  constructor(
    private readonly managementService:ManagementService,
    private router: Router
  ) {
    this.getManagements({ skip: this.pages(), limit: 6 });
  }

  ngOnInit(): void {
    this.managementSubscription = this.managementService.managementCreated.subscribe(() => {
      this.getManagements({ skip: this.pages(), limit: 6 });
    });
  }

  public getManagements(pages:IValuePagination):void{
    this.managementService.getManagements(pages)
      .subscribe( res => {  
        // console.log(res.data)
        const resCareers:IManagement[] = res.data.content.map(t => ({
          id: t.id,
          name: t.name,
          description: t.description,
          status: t.status,
        }));
        this.IManagements.update((_)=>resCareers)
        this.totalPages.set(res.data.totalPages)
      })
  }

  public deleteModule(id: number){
    this.managementService.deleteManagement(id).subscribe(
      {
        next: (res)=>{
          console.log(res)
          this.getManagements({ skip: this.pages(), limit: 6 });
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
      this.getManagements({ skip: this.pages(), limit: 6 });
    }
  }
  public previewPage():void{
    if(this.pages() >= 1 ){
      console.log({page: this.pages(),total: this.totalPages()})
      this.pages.update(value => value - 1);
      this.getManagements({ skip: this.pages(), limit: 6 });
    }
  }

  public onNavCreate(){
    this.router.navigate(["/dashboard/gestion/create"]);
  }

  ngOnDestroy(): void {
    if (this.managementSubscription) {
      this.managementSubscription.unsubscribe();
    }
  }
}
