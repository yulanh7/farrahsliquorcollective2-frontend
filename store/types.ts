export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: string;
  name: string;
}

export interface RootState {
  posts: Post[];
  users: User[];
  loading: boolean;
  error: string | null;
}
