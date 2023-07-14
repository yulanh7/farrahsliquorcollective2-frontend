export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface RootState {
  posts: Post[];
  users: User[];
  loading: boolean;
  error: string | null;
}
