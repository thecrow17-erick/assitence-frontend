import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterListComponent } from './matter-list.component';

describe('MatterListComponent', () => {
  let component: MatterListComponent;
  let fixture: ComponentFixture<MatterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatterListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
