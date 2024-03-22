enum UserRole {
  "MA",
  "Guide",
  "Visitor",
}
export type User = {
  _id: string;
  role: UserRole;
  username: string;
  fullname: string;
  dob: Date;
  address: string;
  phoneNumber: string;
  createdAt: Date;
};

export type Location = {
  _id?: string;
  createdBy?: User;
  name: string;
  description?: string;
  coordinates?: string;
  imageUrls: string[];
};

export type TimeTrip = {
  date: string;
  from: string;
  to: string;
};

export type Trip = {
  _id?: string;
  createdAt: Date;
  createdBy?: Partial<User>;
  locations: Location[];
  memberCount?: number;
  memberLimit: number;
  time: TimeTrip;
  title: string;
  description: string;
};

export type Noti = {
  _id: string;
  createdAt: Date;
  userId: User;
  data: string;
  type: string;
};

export type Request = {
  _id: string;
  createdBy: User;
  createdAt: string;
  tripId: Trip;
  message: string;
  memberQuantity: number;
  status: string;
};

export type SideBarItem = {
  path: string;
  namePath: string;
  icon: string;
};

export type MessageType = {
  ava: string;
  name: string;
  time: string;
  type: string;
  content: string;
  reply: string | null;
  role: string;
  site: string;
};
export type TRequest<T=undefined> = {
  message?: string,
  data: T,
  status?: number
}