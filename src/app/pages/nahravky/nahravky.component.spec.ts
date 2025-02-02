import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NahravkyComponent } from './nahravky.component';

describe('NahravkyComponent', () => {
  let component: NahravkyComponent;
  let fixture: ComponentFixture<NahravkyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NahravkyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NahravkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
