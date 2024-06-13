import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CareerMenuComponent } from '../career-menu/career-menu.component';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-matter-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    CareerMenuComponent,
    MatLabel,
    MatSelect,
    MatOption
  ],
  templateUrl: './matter-dialog.component.html',
  styleUrl: './matter-dialog.component.css'
})
export class MatterDialogComponent {

}
