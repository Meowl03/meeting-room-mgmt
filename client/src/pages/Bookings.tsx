import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import Input from "../components/Input";
import Button from "../components/Button";

interface Booking {
  _id: string;
  room: { name: string };
  date: string;
}

interface Room {
  _id: string;
  name: string;
}

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomId, setRoomId] = useState("");
  const [date, setDate] = useState("");

  const fetchBookings = async () => {
    const res = await axiosInstance.get("/bookings");
    setBookings(res.data);
  };

  const fetchRooms = async () => {
    const res = await axiosInstance.get("/rooms");
    setRooms(res.data);
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/bookings", { room: roomId, date });
      fetchBookings();
      setRoomId("");
      setDate("");
    } catch (err) {
      console.error("Booking error");
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchRooms();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <ul className="mb-6">
        {bookings.map((b) => (
          <li key={b._id} className="border p-3 mb-2 rounded bg-white">
            Room: {b.room.name} - Date: {new Date(b.date).toLocaleDateString()}
          </li>
        ))}
      </ul>

      <form onSubmit={handleBooking} className="max-w-md">
        <h2 className="text-xl font-semibold mb-2">Book a Room</h2>
        <select
          className="border p-2 rounded w-full mb-2"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          required
        >
          <option value="">Select Room</option>
          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              {room.name}
            </option>
          ))}
        </select>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <Button type="submit">Book</Button>
      </form>
    </div>
  );
};

export default Bookings;
