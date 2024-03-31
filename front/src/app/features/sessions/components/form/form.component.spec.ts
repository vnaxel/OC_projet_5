import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Add this line
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { FormComponent } from './form.component';
import { SessionApiService } from '../../services/session-api.service';
import { SessionService } from '../../../../services/session.service';
import { TeacherService } from '../../../../services/teacher.service';
import { FixNavigationTriggeredOutsideAngularZoneNgModule } from 'src/app/fix_navigation_tests/fix-navigation';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

describe('FormComponent', () => {
    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;
    let mockActivatedRoute: any;
    let mockRouter: any;
    let mockSessionApiService: any;
    let mockSessionService: any;
    let mockTeacherService: any;
    let mockMatSnackBar: any;

    beforeEach(async () => {
        mockActivatedRoute = {
            snapshot: {
                paramMap: {
                    get: jest.fn()
                }
            }
        };

        mockRouter = {
            navigate: jest.fn(),
            url: '/sessions'
        };

        mockSessionApiService = {
            detail: jest.fn().mockReturnValue(of({})),
            create: jest.fn().mockReturnValue(of({})),
            update: jest.fn().mockReturnValue(of({}))
        };

        mockSessionService = {
            sessionInformation: {
                admin: true
            }
        };

        mockTeacherService = {
            all: jest.fn().mockReturnValue(of([]))
        };

        mockMatSnackBar = {
            open: jest.fn()
        };

        await TestBed.configureTestingModule({
            imports: [
                FixNavigationTriggeredOutsideAngularZoneNgModule,
                NoopAnimationsModule,
                HttpClientModule,
                MatCardModule,
                MatIconModule,
                MatFormFieldModule,
                MatInputModule,
                ReactiveFormsModule,
                MatSnackBarModule,
                MatSelectModule
            ],
            declarations: [FormComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: Router, useValue: mockRouter },
                { provide: SessionApiService, useValue: mockSessionApiService },
                { provide: SessionService, useValue: mockSessionService },
                { provide: TeacherService, useValue: mockTeacherService },
                { provide: MatSnackBar, useValue: mockMatSnackBar }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to /sessions if user is not an admin', () => {
        mockSessionService.sessionInformation.admin = false;
        component.ngOnInit();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/sessions']);
    });

    it('should initialize form for update', () => {
        const mockSession = { id: 1, name: 'Session 1', date: new Date('2021-12-12'), teacher_id: 1, description: 'Description', users: [] };
        jest.spyOn(mockSessionApiService, 'detail').mockReturnValue(of(mockSession));
        mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('1');
        mockRouter.url = '/sessions/update/1';
        component.ngOnInit();
        expect(component.onUpdate).toBe(true);
        expect(mockSessionApiService.detail).toHaveBeenCalledWith('1');
        expect(component.sessionForm?.value).toEqual({ name: 'Session 1', description: 'Description', date: '2021-12-12', teacher_id: 1 });
    });

    it('should initialize form for create', () => {
        component.ngOnInit();
        expect(component.sessionForm).toBeDefined();
        expect(component.sessionForm?.value).toEqual({ name: '', description: '', date: '', teacher_id: '' });
        expect(component.onUpdate).toBe(false);
        expect(mockSessionApiService.detail).not.toHaveBeenCalled();
    });

    it('should submit form and create session', () => {
        const mockSession = { name: 'Session 1', date: '2021-12-12', teacher_id: 1, description: 'Description' };
        component.ngOnInit();
        component.sessionForm?.patchValue(mockSession);
        const spy = jest.spyOn(mockSessionApiService, 'create');
        component.submit();
        expect(spy).toHaveBeenCalledWith(mockSession);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['sessions'])
    });

    it('should submit form and update session', () => {
        const mockSession = { name: 'Session 1', date: '2021-12-12', teacher_id: 1, description: 'Description' };
        mockRouter.url = '/sessions/update/1';
        mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('1');
        component.ngOnInit();
        expect(component.onUpdate).toBeTruthy();
        component.sessionForm?.patchValue(mockSession);
        const spy = jest.spyOn(mockSessionApiService, 'update');
        component.submit();
        expect(spy).toHaveBeenCalledWith('1', mockSession);
    });

    it('should exit page with message', () => {
        component['exitPage']('Test Message');
        expect(mockMatSnackBar.open).toHaveBeenCalledWith('Test Message', 'Close', { duration: 3000 });
        expect(mockRouter.navigate).toHaveBeenCalledWith(['sessions']);
    });


});