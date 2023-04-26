import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesUsuarioComponent } from './detalhes-usuario.component';

describe('DetalhesUsuarioComponent', () => {
  let component: DetalhesUsuarioComponent;
  let fixture: ComponentFixture<DetalhesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
