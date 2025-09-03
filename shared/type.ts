export type PostType = {
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
};

export type RegisterForm = {
  email: string;
  password: string;
  name: string;
};
