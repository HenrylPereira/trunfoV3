import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTemasComponent } from './menu-temas.component';

describe('MenuTemasComponent', () => {
  let component: MenuTemasComponent;
  let fixture: ComponentFixture<MenuTemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuTemasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuTemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
