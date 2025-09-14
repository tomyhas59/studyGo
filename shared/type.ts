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
  comments?: CommentType[];
};

export type CommentType = {
  id: number;
  content: string;
  author: {
    id: number;
    name: string;
  };
  postId: number;
  createdAt: string;
  updatedAt?: string;
};
