export type User = {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  image: string;
  role: string;
  password?: string;
  type?: string;
  created_at: Date;
  updated_at: Date;
};
