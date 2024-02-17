export type User = {
  _id: string;
  username: string;
  role: string;
};

export type Location = {
  _id?: string;
  createdBy?: User;
  name: string;
  description?: string;
  coordinates?: string;
  images: [File];
};

export type TimeTrip = {
  date: string,
  from: string,
  to: string
}

export type Trip = {
  _id?: string;
  createdAt?: Date;
  createdBy?: User;
  locations: Location[];
  memberCount?: number;
  memberLimit: number;
  time: TimeTrip;
  title: string;
  description: string
};

export type Noti = {
  _id: string;
  createdAt: Date;
  userId: User;
  data: string;
  type: string;
}

export type Request = {
  _id: string;
  createdBy: User;
  tripId: Trip;
  message: string;
  memberQuantity: number;
  status: string;
}

export type SideBarItem = {
  path: string,
  namePath: string,
  icon: string
}