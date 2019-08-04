import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesOverlayComponent } from './messages-overlay.component';

describe('MessagesOverlayComponent', () => {
  let component: MessagesOverlayComponent;
  let fixture: ComponentFixture<MessagesOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
