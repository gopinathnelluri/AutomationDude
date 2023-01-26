import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunnersComponent } from './runners.component';

describe('DevicesComponent', () => {
  let component: RunnersComponent;
  let fixture: ComponentFixture<RunnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
