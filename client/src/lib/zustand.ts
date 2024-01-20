import { User } from "@/utils/types";
import create from "zustand";

export const useUserStore = create((set) => ({
  current: {},
  setUser: (user: User) => set((state: any) => ({ current: user })),
  //   decrease: () => set((state: any) => ({ count: state.count - 1 })),
}));
