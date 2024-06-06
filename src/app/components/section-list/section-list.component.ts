import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TeacherDialogComponent } from '../../teacher/components/teacher-dialog/teacher-dialog.component';
import { CommonModule } from '@angular/common';
import { Observable, first, from } from 'rxjs';

@Component({
  selector: 'app-section-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './section-list.component.html',
  styleUrl: './section-list.component.css'
})
export class SectionListComponent {

  @Input() titulo = '';
  @Input() tablas: string[] = [];
  @Input() items: any[] | null = [];
  items$: Observable<any[]>;

  @Output() newItem = new EventEmitter<void>();
  @Output() editItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  constructor() {
    this.items$ = new Observable<any[]>();
  }

  get ObItablas() {
    return this.tablas;
  }

  public ObIitems( item : any) {
    // console.log( Object.values(item) );
    return Object.values(item)
  }

  abrirDialogo() {
    this.newItem.emit();
    // console.log( this.ObIitems(this.items![0]) );
    // console.log( this.items$);
  }

  editTeacher(item: any) {
    this.editItem.emit(item);
  }

  deleteTeacher(item: any) {
    this.deleteItem.emit(item);
  }

  getKeys(item: any): string[] {
    return Object.keys(item);
  }
}
