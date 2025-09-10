export type PostType = {
  id: number;
  title: string;
  content: string;
  category: string;
  image?: string;
  author: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt?: string;
  participants: { id: number; name: string }[];
};
