import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpaConfigRendererComponent } from './spa-config-renderer.component';

describe('SpaConfigRendererComponent', () => {
  let component: SpaConfigRendererComponent;
  let fixture: ComponentFixture<SpaConfigRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaConfigRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpaConfigRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
