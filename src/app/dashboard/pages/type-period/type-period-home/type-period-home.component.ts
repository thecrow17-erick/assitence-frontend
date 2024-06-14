import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ITypePeriod } from '../../../interface/type_period';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TypePeriodService } from '../../../service/type-period.service';
import { IValuePagination } from '../../../../interface';
import { TypePeriodTableComponent } from '../../../components/type-period/type-period-table/type-period-table.component';

@Component({
  selector: 'app-type-period-home',
  standalone: true,
  imports: [
    CommonModule,
    TypePeriodTableComponent
  ],
  templateUrl: './type-period-home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypePeriodHomeComponent implements OnInit, OnDestroy {

  public ITypePeriods= signal<ITypePeriod[]>([]);
  public pages = signal<number>(0);
  public totalPages = signal<number>(0);
  private typePeriodSubscription: Subscription = new Subscription();
  constructor(
    private readonly typePeriodService:TypePeriodService,
    private router: Router
  ) {
    this.getTypePeriods({ skip: this.pages(), limit: 6 });
  }

  ngOnInit(): void {
    this.typePeriodSubscription = this.typePeriodService.typePeriodCreated.subscribe(() => {
      this.getTypePeriods({ skip: this.pages(), limit: 6 });
    });
  }

  public getTypePeriods(pages:IValuePagination):void{
    this.typePeriodService.getTypePeriods(pages)
      .subscribe( res => {  
        // console.log(res.data)
        const resCareers:ITypePeriod[] = res.data.content.map(t => ({
          id: t.id,
          description: t.description,
          status: t.status,
        }));
        this.ITypePeriods.update((_)=>resCareers)
        this.totalPages.set(res.data.totalPages)
      })
  }

  public deleteTypePeriod(id: number){
    this.typePeriodService.deleteTypePeriod(id).subscribe(
      {
        next: (res)=>{
          console.log(res)
          this.getTypePeriods({ skip: this.pages(), limit: 6 });
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
      this.getTypePeriods({ skip: this.pages(), limit: 6 });
    }
  }
  public previewPage():void{
    if(this.pages() >= 1 ){
      console.log({page: this.pages(),total: this.totalPages()})
      this.pages.update(value => value - 1);
      this.getTypePeriods({ skip: this.pages(), limit: 6 });
    }
  }

  public onNavCreate(){
    this.router.navigate(["/dashboard/tipo-periodo/create"]);
  }

  ngOnDestroy(): void {
    if (this.typePeriodSubscription) {
      this.typePeriodSubscription.unsubscribe();
    }
  }
}
