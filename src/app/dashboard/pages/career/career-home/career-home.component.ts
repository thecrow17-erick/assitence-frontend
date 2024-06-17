import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CareerTableComponent } from '../../../components/career/career-table/career-table.component';
import { CareerService } from '../../../service/career.service';
import { IValuePagination } from '../../../../interface';
import { ICareer } from '../../../interface/career';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-career-home',
  standalone: true,
  imports: [
    CommonModule,
    CareerTableComponent
  ],
  templateUrl: './career-home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareerHomeComponent implements OnInit,OnDestroy {

  public ICareers= signal<ICareer[]>([]);
  public pages = signal<number>(0);
  public totalPages = signal<number>(0);
  private careerSubscription: Subscription = new Subscription();

  constructor(
    private readonly careerService:CareerService,
    private router: Router
  ) {
    this.getCareers({ skip: this.pages(), limit: 6 });
  }

  ngOnInit(): void {
    this.careerSubscription = this.careerService.careerCreated.subscribe(() => {
      this.getCareers({ skip: this.pages(), limit: 6 });
    });
  }
  public nextPage():void{
    if(this.pages() < this.totalPages() - 1 ){
      console.log({page: this.pages(),tota: this.totalPages()})
      this.pages.update(value => value + 1);
      this.getCareers({ skip: this.pages(), limit: 6 });
    }
  }
  public previewPage():void{
    if(this.pages() >= 1 ){
      console.log({page: this.pages(),total: this.totalPages()})
      this.pages.update(value => value - 1);
      this.getCareers({ skip: this.pages(), limit: 6 });
    }
  }

  public deleteTeacher(id: number){
    this.careerService.deleteCareer(id).subscribe(
      {
        next: (res)=>{
          console.log(res)
          this.getCareers({ skip: this.pages(), limit: 6 });
        },
        error: (err)=>{
          console.log(err)
        }
      }
    )
  }

  public onNavCreate(){
    this.router.navigate(["/dashboard/carrera/create"]);
  }
  

  public getCareers(pages:IValuePagination):void{
    this.careerService.getCareer(pages)
      .subscribe( res => {  
        // console.log(res.data)
        const resCareers:ICareer[] = res.data.content.map(t => ({
          id: t.id,
          name: t.name,
          status: t.status,
        }));
        this.ICareers.update((_)=>resCareers)
        this.totalPages.set(res.data.totalPages)
      })
  }


  ngOnDestroy(): void {
    if (this.careerSubscription) {
      this.careerSubscription.unsubscribe();
    }
  }
}
