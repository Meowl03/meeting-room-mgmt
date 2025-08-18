import axiosInstance from "./axios";

export interface IBooking {
  _id: string;
  room: string; // ya Room type agar define karoge
  user: string; // user id
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  // backend se jo fields aate hain, uske hisaab se add karo
}

export interface ICreateBookingPayload {
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
}

export const createBooking = (data: ICreateBookingPayload) =>
  axiosInstance.post<IBooking>("/booking", data);

export const getBookings = () => axiosInstance.get<IBooking[]>("/booking");
