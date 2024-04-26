export type Product = {
  id: string;
  name: string;
  description?: string;
  image: string;
  category: string;
  price: number;
  stock: [
    {
      size: string;
      qty: number;
    }
  ];
  status: boolean;
  created_at: Date;
  updated_at: Date;
};
