import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPageBodyComponent } from './front-page-body.component';

describe('FrontPageBodyComponent', () => {
  let component: FrontPageBodyComponent;
  let fixture: ComponentFixture<FrontPageBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontPageBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontPageBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
