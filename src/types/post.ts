export type LocationData = {
  placeId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type PaginatedResult<T> = {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
};

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
