import { Question } from './question.model';

export interface Quiz {
 id: number;
 name: string;
 teacherId: string;
 time: number;
 isPaid: boolean;
 numberOfQuestion: number;
 hasResult?: boolean;
 results?: Question[];
 isCompleted?: boolean;
 progress?: number;
 answerId?: number;
 progressTime?: number;
}
