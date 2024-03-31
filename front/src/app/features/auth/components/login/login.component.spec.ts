import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';
import { of, throwError } from 'rxjs';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: AuthService;
    let fb: FormBuilder;
    let router: Router;
    let sessionService: SessionService;

    const mockAuthService = {
        login: jest.fn()
    };
    const mockRouter = {
        navigate: jest.fn()
    };
    const mockSessionService = {
        logIn: jest.fn()
    };
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                BrowserAnimationsModule,
                MatCardModule,
                MatIconModule,
                MatFormFieldModule,
                MatInputModule,
                ReactiveFormsModule
            ],
            providers: [
                FormBuilder,
                { provide: AuthService, useValue: mockAuthService },
                { provide: Router, useValue: mockRouter },
                { provide: SessionService, useValue: mockSessionService }
            ]
        }).compileComponents();

        authService = TestBed.inject(AuthService);
        fb = TestBed.inject(FormBuilder);
        router = TestBed.inject(Router);
        sessionService = TestBed.inject(SessionService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should submit login form and redirect on successful login', () => {
        const loginRequest: LoginRequest = { email: 'test@example.com', password: 'password' };
        const sessionInfo: SessionInformation = {
            token: 'token',
            type: 'id_token',
            id: 1,
            username: 'jdoe',
            firstName: 'john',
            lastName: 'doe',
            admin: true
        };

        (authService.login as any).mockReturnValue(of(sessionInfo));

        component.form.patchValue(loginRequest);
        component.submit();

        expect(authService.login).toHaveBeenCalledWith(loginRequest);
        expect(sessionService.logIn).toHaveBeenCalledWith(sessionInfo);
        expect(router.navigate).toHaveBeenCalledWith(['/sessions']);
    });

    it('should handle error on login', () => {
        (authService.login as any).mockReturnValue(throwError('Login failed'));
        component.submit();
        expect(component.onError).toBe(true);
    });
});