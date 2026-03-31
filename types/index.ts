export type IssueCategory = 'Private/Parent' | 'Self' | 'Community' | 'Environment';

export interface MentorLog {
  id: string;
  studentAlias: string;
  age: number;
  location: string;
  category: IssueCategory;
  observation: string;
  isUrgent: boolean;
  dateLogged: string;
  mentorId: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'trainee' | 'mentor';
  currentScore: number | null;
  activeIssues: string[];
  chatHistory: { role: string; text: string }[];
}
