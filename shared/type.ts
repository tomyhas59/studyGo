export interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
  author: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt?: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  name: string;
}
