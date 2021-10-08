import { Quiz } from './quizz.model';
import { Student } from './student.model';
import { Teacher } from './teacher.model';

export interface State {
  quizzes: Quiz[] | null;
  student: Student | null;
  teacher: Teacher | null;
  title: string | null;
}
