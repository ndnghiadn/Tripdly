import { User, TimeTrip } from "@/utils/types";
import create from "zustand";

export const useUserStore = create((set) => ({
  current: {},
  setUser: (user: User) => set((state: any) => ({ current: user })),
  //   decrease: () => set((state: any) => ({ count: state.count - 1 })),
}));

export const useTripStore = create((set) => ({
  tripCreated: {},
  setTitleTrip: (title:string) => set((state:any)=>({tripCreated: {...state.tripCreated,title}})),
  setLocationTrip: (locationId:string[]) => set((state:any)=>({tripCreated: {...state.tripCreated,locationId}})),
  setTimeTrip: (time:TimeTrip[]) => set((state:any)=>({tripCreated: {...state.tripCreated,time}})),
  setDescriptionTrip: (description:string) => set((state:any)=>({tripCreated: {...state.tripCreated,description}})),
  setMemberLimitTrip: (memberLimit:Number) => set((state:any)=>({tripCreated: {...state.tripCreated,memberLimit}}))
  
}));