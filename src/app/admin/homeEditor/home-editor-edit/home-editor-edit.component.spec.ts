import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEditorEditComponent } from './home-editor-edit.component';

describe('HomeEditorEditComponent', () => {
  let component: HomeEditorEditComponent;
  let fixture: ComponentFixture<HomeEditorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeEditorEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEditorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
