import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { TeacherService } from '../../../service/teacher.service';
import { IValuePagination } from '../../../../interface';
import { ITeacher } from '../../../interface/teacher';
import { Subscription } from 'rxjs';
import { TeacherTableComponent } from '../../../components/teacher/teacher-table/teacher-table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-home',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    TeacherTableComponent
  ],
  templateUrl: './teacher-home.component.html',
})
export class TeacherHomeComponent implements OnInit,OnDestroy{

  public teachers = signal<ITeacher[]>([]);
  public pages = signal<number>(0);
  public totalPages = signal<number>(0);
  private teacherSubscription: Subscription = new Subscription();

  constructor(
    private readonly teacherService: TeacherService,
    private router: Router
  ) {
    this.getTeachers({ skip: this.pages(), limit: 6 });
  }
  ngOnInit(): void {
    this.teacherSubscription = this.teacherService.teacherCreated.subscribe(() => {
      this.getTeachers({ skip: this.pages(), limit: 6 });
    });
  }

  public onNavCreate(){
    this.router.navigate(["/dashboard/docente/create"]);
  }

  public getTeachers(pages:IValuePagination):void{
    this.teacherService.getTeachers(pages)
      .subscribe( res => {  
        // console.log(res.data)
        const resTeachers:ITeacher[] = res.data.content.map(t => ({
          id: t.id,
          email: t.email,
          name: t.name,
          phone: t.phone,
          status: t.status,
        }));
        this.teachers.update((_)=>resTeachers)
        this.totalPages.set(res.data.totalPages)
      })
  }
  public nextPage():void{
    if(this.pages() < this.totalPages() - 1 ){
      console.log({page: this.pages(),tota: this.totalPages()})
      this.pages.update(value => value + 1);
      this.getTeachers({ skip: this.pages(), limit: 6 });
    }
  } 
  public deleteTeacher(id: number){
    this.teacherService.deleteTeacher(id).subscribe(
      {
        next: (res)=>{
          console.log(res)
          this.getTeachers({ skip: this.pages(), limit: 6 });
        },
        error: (err)=>{
          console.log(err)
        }
      }
    )
  }
  public passwordReestar(id: number){
    this.teacherService.passwordReestart(id).subscribe(
      {
        next: (res)=>{
          this.getTeachers({ skip: this.pages(), limit: 6 });
        },
        error: (err)=>{
          console.log(err)
        }
      }
    )
  }
  

  public previewPage():void{
    if(this.pages() >= 1 ){
      console.log({page: this.pages(),total: this.totalPages()})
      this.pages.update(value => value - 1);
      this.getTeachers({ skip: this.pages(), limit: 6 });
    }
  }

  ngOnDestroy(): void {
    if (this.teacherSubscription) {
      this.teacherSubscription.unsubscribe();
    }
  }
}
