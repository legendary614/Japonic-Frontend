import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotdetailsComponent } from './lotdetails.component';

describe('LotdetailsComponent', () => {
  let component: LotdetailsComponent;
  let fixture: ComponentFixture<LotdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
