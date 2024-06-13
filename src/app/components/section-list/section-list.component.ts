import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable} from 'rxjs';

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
  @Input() page!: number;
  @Input() totalPage!: number;
  items$: Observable<any[]>;

  @Output() newItem = new EventEmitter<void>();
  @Output() editItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() previewPage = new EventEmitter<void>();

  constructor() {
    this.items$ = new Observable<any[]>();
    console.log(this.items$)
  }

  get ObItablas() {
    return this.tablas;
  }

  public ObIitems( item : any) {
    return Object.values(item)
  }

  abrirDialogo() {
    this.newItem.emit();
  }

  nextPageClick(){
    this.nextPage.emit();
  }

  previewPageClick(){
    this.previewPage.emit();
  }

  editTeacher(item: number) {
    console.log(item)
    this.editItem.emit(item);
  }

  deleteTeacher(item: any) {
    this.deleteItem.emit(item);
  }
  
  getKeys(item: any): string[] {
    return Object.keys(item);
  }
}
