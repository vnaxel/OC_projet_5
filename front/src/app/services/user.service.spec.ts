import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user by id', () => {
    const id = '123';
    const dummyUser = { id: '123', name: 'John Doe' };

    service.getById(id).subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`api/user/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('should delete user by id', () => {
    const id = '123';

    service.delete(id).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`api/user/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});