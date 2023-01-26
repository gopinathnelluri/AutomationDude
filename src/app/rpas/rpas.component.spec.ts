import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpasComponent } from './rpas.component';

describe('RpasComponent', () => {
  let component: RpasComponent;
  let fixture: ComponentFixture<RpasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RpasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RpasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
