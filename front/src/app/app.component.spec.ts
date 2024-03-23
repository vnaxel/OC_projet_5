import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';

import { AppComponent } from './app.component';


describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule,
                MatToolbarModule
            ],
            declarations: [
                AppComponent
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    // test $isLogged function
    it('should return an observable with propertie false', () => {
        component.$isLogged().subscribe((value) => {
            expect(value).toBe(false);
        });
    });

    // test logout function
    it('should call logout function and navigate to /', () => {
        component.logout();
        expect(location.pathname).toBe('/');
    })
});
