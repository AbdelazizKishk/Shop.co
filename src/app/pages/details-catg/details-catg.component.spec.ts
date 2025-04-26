import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCatgComponent } from './details-catg.component';

describe('DetailsCatgComponent', () => {
  let component: DetailsCatgComponent;
  let fixture: ComponentFixture<DetailsCatgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCatgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCatgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
