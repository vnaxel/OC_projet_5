import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';
import { expect } from '@jest/globals';
import { MeComponent } from './me.component';
import { UserService } from 'src/app/services/user.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FixNavigationTriggeredOutsideAngularZoneNgModule } from 'src/app/fix_navigation_tests/fix-navigation';

describe('MeComponent', () => {
    let component: MeComponent;
    let fixture: ComponentFixture<MeComponent>;

    const mockSessionService = {
        isLogged: true,
        sessionInformation: {
            admin: true,
            id: 1
        },
        logOut: jest.fn(() => {
            mockSessionService.isLogged = false;
        })
    }
    const mockUserService = {
        getById: jest.fn().mockImplementation(() => {
            return {
                subscribe: jest.fn().mockImplementation((callback) => {
                    callback({
                        admin: true,
                        id: 1
                    });
                })
            }
        }),
        delete: jest.fn().mockImplementation(() => {
            return {
                subscribe: jest.fn().mockImplementation((callback) => {
                    callback({});
                })
            }
        })
    }
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MeComponent],
            imports: [
                FixNavigationTriggeredOutsideAngularZoneNgModule,
                NoopAnimationsModule,
                MatSnackBarModule,
                HttpClientModule,
                MatCardModule,
                MatFormFieldModule,
                MatIconModule,
                MatInputModule,
            ],
            providers: [
                { provide: SessionService, useValue: mockSessionService },
                { provide: UserService, useValue: mockUserService }
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(MeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('User should be admin with id 1', () => {
        component.ngOnInit();
        expect(component.user?.admin).toBe(true);
        expect(component.user?.id).toBe(1);
    });

    it('Back should call window.history.back', () => {
        const spy = jest.spyOn(window.history, 'back').mockImplementation(() => { });
        component.back();
        expect(spy).toBeCalled();

    });

    it('Delete should call userService.delete', () => {
        component.delete();
        expect(mockUserService.delete).toBeCalled();
        expect(mockSessionService.logOut).toBeCalled();
        expect(mockSessionService.isLogged).toBe(false);
        expect(location.pathname).toBe('/');
    });
});
