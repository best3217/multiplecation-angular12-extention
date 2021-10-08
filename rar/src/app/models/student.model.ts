import { Teacher } from './teacher.model';

export interface Student {
  id?: number;
  name: string;
  code?: string;
  password?: string;
  image?: string;
  teacher?: Teacher
}
