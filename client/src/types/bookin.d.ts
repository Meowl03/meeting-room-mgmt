export interface IBooking {
  _id: string;
  room: string; // room id
  user: string; // user id
  date: string; // yyyy-mm-dd
  startTime: string; // hh:mm
  endTime: string; // hh:mm
  purpose: string;
}
