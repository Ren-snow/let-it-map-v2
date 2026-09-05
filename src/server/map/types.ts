export type MapLocation = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  posts: {
    id: string;
    title: string;
    userName: string | null;
  }[];
};
