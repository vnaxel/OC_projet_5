import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Add this line
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { FormComponent } from './form.component';
import { SessionApiService } from '../../services/session-api.service';
import { SessionService } from '../../../../services/session.service';
import { TeacherService } from '../../../../services/teacher.service';

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
            imports: [ReactiveFormsModule],
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
        mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('1');
        mockRouter.url = '/sessions/update/1';
        component.ngOnInit();
        expect(component.onUpdate).toBe(true);
        expect(mockSessionApiService.detail).toHaveBeenCalledWith('1');
    });

    it('should initialize form for create', () => {
        component.ngOnInit();
        expect(component.onUpdate).toBe(false);
        expect(mockSessionApiService.detail).not.toHaveBeenCalled();
    });

    it('should create session', () => {
        component.sessionForm?.controls['name'].setValue('Test Session');
        component.sessionForm?.controls['date'].setValue('2022-01-01');
        component.sessionForm?.controls['teacher_id'].setValue('1');
        component.sessionForm?.controls['description'].setValue('Test Description');
        component.submit();
        expect(mockSessionApiService.create).toHaveBeenCalledWith({
            name: 'Test Session',
            date: '2022-01-01',
            teacher_id: '1',
            description: 'Test Description'
        });
        expect(mockRouter.navigate).toHaveBeenCalledWith(['sessions']);
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