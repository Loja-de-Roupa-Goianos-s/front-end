import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenhaMudancaComponent } from './senha-mudanca.component';

describe('SenhaMudancaComponent', () => {
  let component: SenhaMudancaComponent;
  let fixture: ComponentFixture<SenhaMudancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SenhaMudancaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenhaMudancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
