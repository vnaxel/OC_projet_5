import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { LoginRequest } from '../interfaces/loginRequest.interface';
import { RegisterRequest } from '../interfaces/registerRequest.interface';

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        });
        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should send a POST request to register', () => {
        const mockRegisterRequest: RegisterRequest = { email: 'email@test.com', password: 'password', firstName: 'John', lastName: 'Doe'};
        service.register(mockRegisterRequest).subscribe(() => {
            
            
        });

        const req = httpMock.expectOne('api/auth/register');
        expect(req.request.method).toBe('POST');
        req.flush(null);
    });

    it('should send a POST request to login', () => {
        const mockLoginRequest: LoginRequest = { email: 'email@test.com', password: 'password'};
        service.login(mockLoginRequest).subscribe(() => {
        });

        const req = httpMock.expectOne('api/auth/login');
        expect(req.request.method).toBe('POST');
        req.flush(null);
    });
});