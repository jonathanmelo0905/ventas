import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenClientesComponent } from './resumen-clientes.component';

describe('ResumenClientesComponent', () => {
  let component: ResumenClientesComponent;
  let fixture: ComponentFixture<ResumenClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
