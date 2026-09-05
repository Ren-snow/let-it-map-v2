export type PostWithDetails = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  location: {
    name: string;
    address: string;
  };
};
