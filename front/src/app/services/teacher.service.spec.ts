import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { TeacherService } from './teacher.service';
import { Teacher } from '../interfaces/teacher.interface';

describe('TeacherService', () => {
  let service: TeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ]
    });
    service = TestBed.inject(TeacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all teachers', () => {
    const teachers: Teacher[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', createdAt: new Date('2021-12-12'), updatedAt: new Date('2021-12-12') },
      { id: 2, firstName: 'Jane', lastName: 'Doe', createdAt: new Date('2021-12-12'), updatedAt: new Date('2021-12-12') },
    ];

    service.all().subscribe((result) => {
      expect(result).toEqual(teachers);
    });
  });

  it('should return teacher detail', () => {
    const teacher: Teacher = { id: 1, firstName: 'John', lastName: 'Doe', createdAt: new Date('2021-12-12'), updatedAt: new Date('2021-12-12') };
    const teacherId = '1';

    service.detail(teacherId).subscribe((result) => {
      expect(result).toEqual(teacher);
    });
  });
});