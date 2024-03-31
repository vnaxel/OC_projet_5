import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule, } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from '../../../../services/session.service';
import { SessionApiService } from '../../services/session-api.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DetailComponent } from './detail.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ListComponent } from '../list/list.component';
import { FixNavigationTriggeredOutsideAngularZoneNgModule } from 'src/app/fix_navigation_tests/fix-navigation';

describe('DetailComponent', () => {
    let component: DetailComponent;
    let fixture: ComponentFixture<DetailComponent>;
    let apiService: SessionApiService;

    const mockSessionService = {
        sessionInformation: {
            admin: true,
            id: 1
        }
    }

    const MockSessionApiService = {
        detail: jest.fn(() => {
            return {
                //return observable of session
                subscribe: (fn: any) => fn({
                    id: 1,
                    name: 'test session',
                    description: 'test description',
                    date: '2021-12-12',
                    teacher_id: 1,
                    users: [1]
                })
            }
        }),
        delete: jest.fn(() => {
            return {
                subscribe: (fn: any) => fn()
            }
        }),
        participate: jest.fn(() => {
            return {
                subscribe: (fn: any) => fn()
            }
        }),
        unParticipate: jest.fn(() => {
            return {
                subscribe: (fn: any) => fn()
            }
        }),
        fetchSession: jest.fn(() => {
            return {
                subscribe: (fn: any) => fn()
            }
        })

    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FixNavigationTriggeredOutsideAngularZoneNgModule,
                NoopAnimationsModule,
                RouterTestingModule,
                HttpClientModule,
                MatSnackBarModule,
                MatCardModule,
                MatIconModule,
                MatButtonModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([{ path: 'sessions', component: ListComponent }])
            ],
            declarations: [DetailComponent],
            providers: [{ provide: SessionService, useValue: mockSessionService }, { provide: SessionApiService, useValue: MockSessionApiService }],
        })
            .compileComponents();
        apiService = TestBed.inject(SessionApiService);
        fixture = TestBed.createComponent(DetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should go back', () => {
        const spy = jest.spyOn(window.history, 'back');
        component.back();
        expect(spy).toHaveBeenCalled();
    });

    it('should display sessionApiService details', () => {
        component.ngOnInit();
        expect(component.session).toEqual({
            id: 1,
            name: 'test session',
            description: 'test description',
            date: '2021-12-12',
            teacher_id: 1,
            users: [1]
        });
    })

    it('should delete session', () => {
        const spy = jest.spyOn(apiService, 'delete');
        component.delete();
        expect(spy).toHaveBeenCalled();
    });

    it('should participate in session', () => {
        const spy = jest.spyOn(apiService, 'participate');
        component.participate();
        expect(spy).toHaveBeenCalled();
    });

    it('should unparticipate in session', () => {
        const spy = jest.spyOn(apiService, 'unParticipate');
        component.unParticipate();
        expect(spy).toHaveBeenCalled();
    });

    it('should fetch session with teacher', () => {
        const detailSpy = jest.spyOn(apiService, 'detail').mockReturnValue(of({
            id: 1,
            name: 'test session',
            description: 'test description',
            date: new Date('2021-12-12'),
            teacher_id: 1,
            users: [1]
        }));
    
        const teacherDetailSpy = jest.spyOn(component['teacherService'], 'detail').mockReturnValue(of({
            id: 1,
            name: 'Test Teacher',
            lastName: 'Test',
            firstName: 'Teacher',
            createdAt: new Date('2021-12-12'),
            updatedAt: new Date('2021-12-12')
        }));
    
        component['fetchSession']();
    
        expect(detailSpy).toHaveBeenCalled();
    
        expect(component.session).toEqual({
            id: 1,
            name: 'test session',
            description: 'test description',
            date: new Date('2021-12-12'),
            teacher_id: 1,
            users: [1]
        });
    
        expect(teacherDetailSpy).toHaveBeenCalledWith('1');
    
        expect(component.teacher).toEqual({
            id: 1,
            name: 'Test Teacher',
            lastName: 'Test',
            firstName: 'Teacher',
            createdAt: new Date('2021-12-12'),
            updatedAt: new Date('2021-12-12')
        });
    });
});
