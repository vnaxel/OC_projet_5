import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { SessionApiService } from '../../services/session-api.service';
import { FormComponent } from './form.component';
import { ListComponent } from '../list/list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FixNavigationTriggeredOutsideAngularZoneNgModule } from 'src/app/fix_navigation_tests/fix-navigation';
import { of } from 'rxjs';
describe('FormComponent', () => {
    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;
    let sessionApiService: SessionApiService;
    let router: Router;
    let route: ActivatedRoute;

    const mockSessionService = {
        sessionInformation: {
            admin: true
        }
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({

            imports: [
                FixNavigationTriggeredOutsideAngularZoneNgModule,
                RouterTestingModule.withRoutes([{ path: 'sessions', component: ListComponent }, { path: 'sessions/update/:id', component: FormComponent }]),
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
            providers: [
                { provide: SessionService, useValue: mockSessionService },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get: jest.fn().mockReturnValue('1')
                            }
                        }
                    }
                },
                SessionApiService
            ],
            declarations: [FormComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FormComponent);
        router = TestBed.inject(Router);
        route = TestBed.inject(ActivatedRoute);
        sessionApiService = TestBed.inject(SessionApiService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // test redirect to sessions page if not admin
    it('should redirect to sessions page if not admin', () => {
        mockSessionService.sessionInformation!.admin = false;
        const spy = jest.spyOn(router, 'navigate');
        component.ngOnInit();
        expect(spy).toHaveBeenCalledWith(['/sessions']);
    });

    //test init form and empty value in form
    it('should init form', () => {
        component.ngOnInit();
        expect(component.sessionForm).toBeDefined();
        expect(component.sessionForm?.value).toEqual({ name: '', description: '', date: '', teacher_id: '' });
    });

    it('should initialize form for updating session', () => {
        const mockSession = { id: 1, name: 'Session 1', date: new Date('2021-12-12'), teacher_id: 1, description: 'Description', users: [] };
        jest.spyOn(router, 'url', 'get').mockReturnValue('/sessions/update/1');
        jest.spyOn(sessionApiService, 'detail').mockReturnValue(of(mockSession));
        component.ngOnInit();
        expect(component.onUpdate).toBeTruthy();
        expect(component.sessionForm?.value).toEqual({ name: 'Session 1', description: 'Description', date: '2021-12-12', teacher_id: 1 });
    });

    it('should submit form and create session', () => {
        const mockSession = { name: 'Session 1', date: '2021-12-12', teacher_id: 1, description: 'Description' };
        component.ngOnInit();
        component.sessionForm?.patchValue(mockSession);
        const spy = jest.spyOn(sessionApiService, 'create');
        component.submit();
        expect(spy).toHaveBeenCalledWith(mockSession);
    });

    it('should submit form and update session', () => {
        const mockSession = { name: 'Session 1', date: '2021-12-12', teacher_id: 1, description: 'Description' };
        jest.spyOn(router, 'url', 'get').mockReturnValue('/sessions/update/1');
        component.ngOnInit();
        expect(component.onUpdate).toBeTruthy();
        component.sessionForm?.patchValue(mockSession);
        const spy = jest.spyOn(sessionApiService, 'update');
        component.submit();
        expect(spy).toHaveBeenCalledWith('1', mockSession);
    })
});