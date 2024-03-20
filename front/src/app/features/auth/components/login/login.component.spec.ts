import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    const mockSessionService = {
        isLogged: false,
        sessionInformation: {
            admin: null,
            id: null
        },
        logOut: jest.fn(() => {
            mockSessionService.isLogged = false;
        }),
        logIn: jest.fn(() => {
            mockSessionService.isLogged = true;
        })
    }

    const mockAuthService = {
        login: jest.fn().mockImplementation(() => {
            return {
                subscribe: jest.fn().mockImplementation(() => {
                    
                })
            }
        })
    }

    const mockLoginRequest = {
        email: 'email@test.com',
        password: 'password'
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [
                { provide: SessionService, useValue: mockSessionService },
                { provide: AuthService, useValue: mockAuthService }
            ],
            imports: [
                RouterTestingModule,
                BrowserAnimationsModule,
                HttpClientModule,
                MatCardModule,
                MatIconModule,
                MatFormFieldModule,
                MatInputModule,
                ReactiveFormsModule]
        })
            .compileComponents();
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a form', () => {
        expect(component.form).toBeTruthy();
    });

    it('should log in', () => {
        component.form.setValue(mockLoginRequest);
        component.submit();
        expect(mockAuthService.login).toHaveBeenCalledWith(mockLoginRequest);
        expect(mockSessionService.logIn).toHaveBeenCalled();
    });
});
