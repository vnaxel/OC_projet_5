
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { SessionService } from './session.service';
import { SessionInformation } from '../interfaces/sessionInformation.interface';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with isLogged set to false', () => {
    expect(service.isLogged).toBeFalsy();
  });

  it('should initialize with sessionInformation set to undefined', () => {
    expect(service.sessionInformation).toBeUndefined();
  });

  it('should emit isLogged value when $isLogged is called', () => {
    const isLoggedValue = true;
    service.isLogged = isLoggedValue;

    service.$isLogged().subscribe((value) => {
      expect(value).toBe(isLoggedValue);
    });
  });

  it('should set sessionInformation and isLogged to true when logIn is called', () => {

    const user: SessionInformation = { 
        token: 'token',
        type: 'bearer',
        id: 1,
        username: 'JohnDoe',
        firstName: 'John',
        lastName: 'Doe',
        admin: false
    };

    service.logIn(user);

    expect(service.sessionInformation).toBe(user);
    expect(service.isLogged).toBe(true);
  });

  it('should set sessionInformation and isLogged to false when logOut is called', () => {
    service.logOut();

    expect(service.sessionInformation).toBeUndefined();
    expect(service.isLogged).toBeFalsy();
  });
});