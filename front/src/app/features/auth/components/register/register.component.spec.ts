import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let formBuilder: FormBuilder;
    let authService: jest.Mocked<AuthService>;
    let router: jest.Mocked<Router>;

    beforeEach(async () => {
        const authServiceMock = {
            register: jest.fn()
        };

        const routerMock = {
            navigate: jest.fn()
        };

        await TestBed.configureTestingModule({
            declarations: [RegisterComponent],
            imports: [
                BrowserAnimationsModule,
                HttpClientModule,
                ReactiveFormsModule,
                MatCardModule,
                MatFormFieldModule,
                MatIconModule,
                MatInputModule
            ],
            providers: [
                { provide: AuthService, useValue: authServiceMock },
                { provide: Router, useValue: routerMock }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        formBuilder = TestBed.inject(FormBuilder);
        authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
        router = TestBed.inject(Router) as jest.Mocked<Router>;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form with proper controls', () => {
        expect(component.form).toBeDefined();
        expect(component.form.controls['email']).toBeDefined();
        expect(component.form.controls['firstName']).toBeDefined();
        expect(component.form.controls['lastName']).toBeDefined();
        expect(component.form.controls['password']).toBeDefined();
    });

    it('should initialize form with empty values', () => {
        expect(component.form.value).toEqual({ email: '', firstName: '', lastName: '', password: '' });
    });

    it('should mark form as invalid if fields are empty', () => {
        expect(component.form.valid).toBeFalsy();
    });

    it('should submit form and navigate to login on success', fakeAsync(() => {
        // Mock form value
        const mockFormValue = { email: 'test@example.com', firstName: 'john', lastName: 'Doe', password: 'password' };
        component.form.setValue(mockFormValue);
    
        // Mock successful response from authService
        authService.register.mockReturnValue(of(void 0));
    
        // Call submit method
        component.submit();
    
        // Ensure authService.register is called with proper value
        expect(authService.register).toHaveBeenCalledWith(mockFormValue);
    
        // Ensure router.navigate is called with proper value
        tick(); // Wait for async operation to complete
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
      }));
    
      it('should set onError to true on error', fakeAsync(() => {
        // Mock form value
        const mockFormValue = { email: 'test@example.com', firstName: 'john', lastName: 'Doe', password: 'password' };
        component.form.setValue(mockFormValue);
    
        // Mock error response from authService
        authService.register.mockReturnValue(throwError('Error'));
    
        // Call submit method
        component.submit();
    
        // Ensure authService.register is called with proper value
        expect(authService.register).toHaveBeenCalledWith(mockFormValue);
    
        // Ensure onError is set to true
        tick(); // Wait for async operation to complete
        expect(component.onError).toBeTruthy();
      }));
});
