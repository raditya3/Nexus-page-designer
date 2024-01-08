import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutRendererComponent } from './layout-renderer.component';

describe('LayoutRendererComponent', () => {
  let component: LayoutRendererComponent;
  let fixture: ComponentFixture<LayoutRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
