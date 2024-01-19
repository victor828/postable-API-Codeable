export type Restaurant = {
  id: number;
  name: string;
  address: string;
  category: string;
};

export type restaurant = Omit<Restaurant, "id">;

export type Review = {
  id_review: number;
  userid: number;
  restaurant_id: string;
  score: number;
  title: string;
  description: string;
};

export type review = Omit<Review, "id_reiview">;
