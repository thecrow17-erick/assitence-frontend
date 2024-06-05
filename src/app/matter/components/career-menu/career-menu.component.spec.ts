import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerMenuComponent } from './career-menu.component';

describe('CareerMenuComponent', () => {
  let component: CareerMenuComponent;
  let fixture: ComponentFixture<CareerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CareerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
