import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcastComponent } from './ucast.component';

describe('UcastComponent', () => {
  let component: UcastComponent;
  let fixture: ComponentFixture<UcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UcastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
