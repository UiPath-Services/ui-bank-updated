import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanHomeComponent } from './loan-home.component';

xdescribe('LoanHomeComponent', () => {
  let component: LoanHomeComponent;
  let fixture: ComponentFixture<LoanHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanHomeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoanHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
