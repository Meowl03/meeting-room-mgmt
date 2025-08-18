import axiosInstance from "./axios";

export interface IRoom {
  _id: string;
  name: string;
  location: string;
  capacity: number;
  description?: string;
  // backend ke hisaab se fields update kar lena
}

export interface ICreateRoomPayload {
  name: string;
  location: string;
  capacity: number;
  description?: string;
}

export const createRoom = (data: ICreateRoomPayload) =>
  axiosInstance.post<IRoom>("/room", data);

export const getRooms = () => axiosInstance.get<IRoom[]>("/room");
