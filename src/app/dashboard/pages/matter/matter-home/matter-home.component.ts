import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { MatterTableComponent } from '../../../components/matter/matter-table/matter-table.component';
import { IMatter } from '../../../interface/matter';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatterService } from '../../../service/matter.service';
import { IValuePagination } from '../../../../interface';

@Component({
  selector: 'app-matter-home',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    MatterTableComponent
  ],
  templateUrl: './matter-home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatterHomeComponent {

  public IMatters= signal<IMatter[]>([]);
  public pages = signal<number>(0);
  public totalPages = signal<number>(0);
  private matterSubscription: Subscription = new Subscription();

  constructor(
    private readonly matterService:MatterService,
    private router: Router
  ) {
    this.getMatters({ skip: this.pages(), limit: 6 });
  }

  ngOnInit(): void {
    this.matterSubscription = this.matterService.matterCreated.subscribe(() => {
      this.getMatters({ skip: this.pages(), limit: 6 });
    });
  }
  public nextPage():void{
    if(this.pages() < this.totalPages() - 1 ){
      console.log({page: this.pages(),tota: this.totalPages()})
      this.pages.update(value => value + 1);
      this.getMatters({ skip: this.pages(), limit: 6 });
    }
  }
  public previewPage():void{
    if(this.pages() >= 1 ){
      console.log({page: this.pages(),total: this.totalPages()})
      this.pages.update(value => value - 1);
      this.getMatters({ skip: this.pages(), limit: 6 });
    }
  }

  public deleteTeacher(id: number){
    this.matterService.deleteMatter(id).subscribe(
      {
        next: (res)=>{
          console.log(res)
          this.getMatters({ skip: this.pages(), limit: 6 });
        },
        error: (err)=>{
          console.log(err)
        }
      }
    )
  }

  public onNavCreate(){
    this.router.navigate(["/dashboard/materia/create"]);
  }
  

  public getMatters(pages:IValuePagination):void{
    this.matterService.getMatters(pages)
      .subscribe( res => {  
        // console.log(res.data)
        const resCareers:IMatter[] = res.data.content.map(t => ({
          id: t.id,
          name: t.name,
          code: t.code,
          status: t.status,
          career: {
            id: t.career.id,
            name: t.career.name,
            status: t.career.status,
          }
        }));
        this.IMatters.update((_)=>resCareers)
        this.totalPages.set(res.data.totalPages)
      })
  }


  ngOnDestroy(): void {
    if (this.matterSubscription) {
      this.matterSubscription.unsubscribe();
    }
  }

}
