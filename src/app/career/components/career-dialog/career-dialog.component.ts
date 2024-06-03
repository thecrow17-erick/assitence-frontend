import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-career-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule
  ],
  templateUrl: './career-dialog.component.html',
  styleUrl: './career-dialog.component.css'
})
export class CareerDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

}
