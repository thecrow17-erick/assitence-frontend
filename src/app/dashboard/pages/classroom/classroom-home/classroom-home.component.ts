import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { IClassroom } from '../../../interface/classroom';
import { Subscription } from 'rxjs';
import { ClassroomService } from '../../../service/classroom.service';
import { Router } from '@angular/router';
import { IValuePagination } from '../../../../interface';
import { ClassroomTableComponent } from '../../../components/classroom/classroom-table/classroom-table.component';

@Component({
  selector: 'app-classroom-home',
  standalone: true,
  imports: [
    CommonModule,
    ClassroomTableComponent
  ],
  templateUrl: './classroom-home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassroomHomeComponent implements OnInit,OnDestroy {

  public IClassrooms= signal<IClassroom[]>([]);
  public pages = signal<number>(0);
  public totalPages = signal<number>(0);
  private classroomSubscription: Subscription = new Subscription();

  constructor(
    private readonly classroomService:ClassroomService,
    private router: Router
  ) {
    this.getClassrooms({ skip: this.pages(), limit: 6 });
  }

  ngOnInit(): void {
    this.classroomSubscription = this.classroomService.classroomCreated.subscribe(() => {
      this.getClassrooms({ skip: this.pages(), limit: 6 });
    });
  }
  public nextPage():void{
    if(this.pages() < this.totalPages() - 1 ){
      console.log({page: this.pages(),tota: this.totalPages()})
      this.pages.update(value => value + 1);
      this.getClassrooms({ skip: this.pages(), limit: 6 });
    }
  }
  public previewPage():void{
    if(this.pages() >= 1 ){
      console.log({page: this.pages(),total: this.totalPages()})
      this.pages.update(value => value - 1);
      this.getClassrooms({ skip: this.pages(), limit: 6 });
    }
  }

  public deleteClassroom(id: number){
    this.classroomService.deleteClassroom(id).subscribe(
      {
        next: (res)=>{
          console.log(res)
          this.getClassrooms({ skip: this.pages(), limit: 6 });
        },
        error: (err)=>{
          console.log(err)
        }
      }
    )
  }

  public onNavCreate(){
    this.router.navigate(["/dashboard/aula/create"]);
  }
  

  public getClassrooms(pages:IValuePagination):void{
    this.classroomService.getClassrooms(pages)
      .subscribe( res => {  
        // console.log(res.data)
        const resClassroom:IClassroom[] = res.data.content.map(t => ({
          id: t.id,
          nro: t.nro,
          description: t.description,
          status: t.status,
          module: {
            id: t.module.id,
            nro: t.module.nro,
            description: t.module.description,
            status: t.module.status
          },
        }));
        this.IClassrooms.update((_)=>resClassroom)
        this.totalPages.set(res.data.totalPages)
      })
  }


  ngOnDestroy(): void {
    if (this.classroomSubscription) {
      this.classroomSubscription.unsubscribe();
    }
  }
}
