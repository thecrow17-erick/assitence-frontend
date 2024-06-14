import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IManagement } from '../../../interface/management';
import { ActivatedRoute } from '@angular/router';
import { ManagementService } from '../../../service/management.service';
import { ManagementFormComponent } from '../../../components/management/management-form/management-form.component';

@Component({
  selector: 'app-management-update',
  standalone: true,
  imports: [
    CommonModule,
    ManagementFormComponent
  ],
  templateUrl: './management-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementUpdateComponent { 
  public management = signal<IManagement | null>(null);

  constructor(
    private route: ActivatedRoute,
    private managementService: ManagementService
  ){}

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    const moduleId = this.route.snapshot.paramMap.get("id");
    this.managementService.findManagementById(+moduleId!).subscribe(
      {
        next:(value)=> {
          console.log(value)
          this.management.set({
            id: value.data.management.id,
            name: value.data.management.name,
            description: value.data.management.description,
            status: value.data.management.status,
          })
        },
        error: (err)=>{
          console.log(err)
        }
      }
    )
  }

}
