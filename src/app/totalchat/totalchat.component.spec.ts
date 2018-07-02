import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalchatComponent } from './totalchat.component';

describe('TotalchatComponent', () => {
  let component: TotalchatComponent;
  let fixture: ComponentFixture<TotalchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
