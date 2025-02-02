import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoncertyComponent } from './koncerty.component';

describe('KoncertyComponent', () => {
  let component: KoncertyComponent;
  let fixture: ComponentFixture<KoncertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KoncertyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KoncertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
