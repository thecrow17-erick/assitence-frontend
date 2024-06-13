import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IModule } from '../../../interface/module';
import { Subscription } from 'rxjs';
import { ModuleService } from '../../../service/module.service';
import { IValuePagination } from '../../../../interface';
import { ModuleTableComponent } from '../../../components/module/module-table/module-table.component';

@Component({
  selector: 'app-module-home',
  standalone: true,
  imports: [
    CommonModule,
    ModuleTableComponent
  ],
  templateUrl: './module-home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleHomeComponent implements OnInit, OnDestroy {

  public IModules= signal<IModule[]>([]);
  public pages = signal<number>(0);
  public totalPages = signal<number>(0);
  private moduleSubscription: Subscription = new Subscription();
  constructor(
    private readonly moduleService:ModuleService,
    private router: Router
  ) {
    this.getModules({ skip: this.pages(), limit: 6 });
  }

  ngOnInit(): void {
    this.moduleSubscription = this.moduleService.moduleCreated.subscribe(() => {
      this.getModules({ skip: this.pages(), limit: 6 });
    });
  }

  public getModules(pages:IValuePagination):void{
    this.moduleService.getModules(pages)
      .subscribe( res => {  
        // console.log(res.data)
        const resCareers:IModule[] = res.data.content.map(t => ({
          id: t.id,
          nro: t.nro,
          description: t.description,
          status: t.status,
        }));
        this.IModules.update((_)=>resCareers)
        this.totalPages.set(res.data.totalPages)
      })
  }

  public deleteModule(id: number){
    this.moduleService.deleteModule(id).subscribe(
      {
        next: (res)=>{
          console.log(res)
          this.getModules({ skip: this.pages(), limit: 6 });
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
      this.getModules({ skip: this.pages(), limit: 6 });
    }
  }
  public previewPage():void{
    if(this.pages() >= 1 ){
      console.log({page: this.pages(),total: this.totalPages()})
      this.pages.update(value => value - 1);
      this.getModules({ skip: this.pages(), limit: 6 });
    }
  }

  public onNavCreate(){
    this.router.navigate(["/dashboard/modulo/create"]);
  }

  ngOnDestroy(): void {
    if (this.moduleSubscription) {
      this.moduleSubscription.unsubscribe();
    }
  }
}
