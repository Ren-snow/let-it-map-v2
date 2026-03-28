export type LocationData = {
  placeId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
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
