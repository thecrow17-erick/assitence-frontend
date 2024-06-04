import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ItemSideNav } from '../../interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-side-nav',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './item-side-nav.component.html',
})
export class ItemSideNavComponent implements OnInit { 
  @Input() 
  public item!: ItemSideNav;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  
  get urlActual(){
    return this.router.url;
  }

  ngOnInit(): void {
    if(!this.item) throw Error("not property item menu")
    // Obtener la URL completa
    const fullUrl = this.router.url;
    console.log(fullUrl);

    // Obtener la URL activa a través de la ruta activada
    const currentUrl = this.activatedRoute.snapshot.url.join('/');
    console.log('Current URL:', currentUrl);
  }

}
