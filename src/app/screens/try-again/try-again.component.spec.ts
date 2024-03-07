import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing';;

import { TryAgainComponent } from './try-again.component';

describe('TryAgainComponent', () => {
  let component: TryAgainComponent;
  let fixture: ComponentFixture<TryAgainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TryAgainComponent, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TryAgainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
