import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlacesComponent } from './all-places.component';

describe('AllPlacesComponent', () => {
  let component: AllPlacesComponent;
  let fixture: ComponentFixture<AllPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
