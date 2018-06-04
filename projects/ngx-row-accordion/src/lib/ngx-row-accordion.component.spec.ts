import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxRowAccordionService } from './ngx-row-accordion.service';

import { NgxRowAccordionComponent } from './ngx-row-accordion.component';

describe('NgxRowAccordionComponent', () => {
  let component: NgxRowAccordionComponent;
  let fixture: ComponentFixture<NgxRowAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NgxRowAccordionComponent],
      providers: [NgxRowAccordionService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxRowAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
