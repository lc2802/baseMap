import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerControllerComponent } from './layers-controller.component';

describe('LayersControllerComponent', () => {
  let component: LayerControllerComponent;
  let fixture: ComponentFixture<LayerControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayerControllerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayerControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
