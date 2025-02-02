import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresarComponent } from './adresar.component';

describe('AdresarComponent', () => {
  let component: AdresarComponent;
  let fixture: ComponentFixture<AdresarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdresarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdresarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
