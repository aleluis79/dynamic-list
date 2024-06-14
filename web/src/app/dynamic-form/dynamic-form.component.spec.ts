import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormComponent } from './dynamic-form.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DynamicFormComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicFormComponent);
    fixture.componentRef.setInput("formStructure", 
    [
      {
        type: "text",
        label: "Name",
        name: "name",
        value: "",
        validations: [
          {
            validator: "required",
            message: "Name is required"
          }
        ]
      },
      {
        type: "email",
        label: "Email",
        name: "email",
        value: "",
        validations: [
          {
            validator: "required",
            message: "Email is required"
          },
          {
            validator: "email",
            message: "Invalid email format"
          }
        ]
      },
      {
        type: "date",
        label: "Date",
        name: "date",
        value: "",
        validations: [
          {
            validator: "required",
            message: "Date is required"
          }
        ]
      }
    ]);

    fixture.componentRef.setInput("initialData",
    {
      name: "prueba", 
      email: "prueba@prueba",
      date: "2020-01-01"
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the text input field', () => {
    expect(component.dynamicForm.get('name')?.valid).toBeTruthy();
  });

  it('should validate the email input field', () => {
    expect(component.dynamicForm.get('email')?.valid).toBeTruthy();
  });

  it('should validate the date input field', () => {
    expect(component.dynamicForm.get('date')?.valid).toBeTruthy();
  });


});
