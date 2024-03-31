import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { of } from 'rxjs';
import { SessionApiService } from './session-api.service';

describe('SessionApiService', () => {
  let service: SessionApiService;
  let httpClientSpy: { get: jest.Mock, post: jest.Mock, put: jest.Mock, delete: jest.Mock };

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(SessionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all sessions', () => {
    const expectedSessions = [{ id: '1', name: 'Session 1' }, { id: '2', name: 'Session 2' }];
    httpClientSpy.get.mockReturnValue(of(expectedSessions));

    service.all().subscribe(sessions => {
      expect(sessions).toEqual(expectedSessions);
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith('api/session');
  });

  it('should retrieve session detail', () => {
    const sessionId = '1';
    const expectedSession = { id: sessionId, name: 'Session 1' };
    httpClientSpy.get.mockReturnValue(of(expectedSession));

    service.detail(sessionId).subscribe(session => {
      expect(session).toEqual(expectedSession);
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(`api/session/${sessionId}`);
  });

  it('should delete session', () => {
    const sessionId = '1';
    httpClientSpy.delete.mockReturnValue(of({}));

    service.delete(sessionId).subscribe(response => {
      expect(response).toEqual({});
    });

    expect(httpClientSpy.delete).toHaveBeenCalledWith(`api/session/${sessionId}`);
  });

  it('should create session', () => {
    const session = { id: 1, name: 'Session 1', date: new Date('2021-12-12'), teacher_id: 1, description: 'Description', users: [] };
    httpClientSpy.post.mockReturnValue(of(session));

    service.create(session).subscribe(createdSession => {
      expect(createdSession).toEqual(session);
    });

    expect(httpClientSpy.post).toHaveBeenCalledWith('api/session', session);
  });

  it('should update session', () => {
    const sessionId = '1';
    const session = { id: 1, name: 'Updated Session', date: new Date('2021-12-12'), teacher_id: 1, description: 'Description', users: [] };
    httpClientSpy.put.mockReturnValue(of(session));

    service.update(sessionId, session).subscribe(updatedSession => {
      expect(updatedSession).toEqual(session);
    });

    expect(httpClientSpy.put).toHaveBeenCalledWith(`api/session/${sessionId}`, session);
  });

  it('should participate in session', () => {
    const sessionId = '1';
    const userId = '123';
    httpClientSpy.post.mockReturnValue(of({}));

    service.participate(sessionId, userId).subscribe(response => {
      expect(response).toEqual({});
    });

    expect(httpClientSpy.post).toHaveBeenCalledWith(`api/session/${sessionId}/participate/${userId}`, null);
  });

  it('should unparticipate in session', () => {
    const sessionId = '1';
    const userId = '123';
    httpClientSpy.delete.mockReturnValue(of({}));

    service.unParticipate(sessionId, userId).subscribe(response => {
      expect(response).toEqual({});
    });

    expect(httpClientSpy.delete).toHaveBeenCalledWith(`api/session/${sessionId}/participate/${userId}`);
  });
});