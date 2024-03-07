import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WinComponent } from './win.component';

xdescribe('WinComponent', () => {
  let component: WinComponent;
  let fixture: ComponentFixture<WinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinComponent, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
