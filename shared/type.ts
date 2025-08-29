export interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
  authorId: number;
  author: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}
