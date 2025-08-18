import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useAuth } from "../hooks/useAuth";
import Input from "../components/Input";
import Button from "../components/Button";

interface Room {
  _id: string;
  name: string;
  capacity: number;
  amenities: string[];
}

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [amenities, setAmenities] = useState("");
  const { user } = useAuth();

  const fetchRooms = async () => {
    const res = await axiosInstance.get("/rooms");
    setRooms(res.data);
  };

  const handleAddRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/rooms", {
        name,
        capacity: Number(capacity),
        amenities: amenities.split(",").map((a) => a.trim()),
      });
      fetchRooms();
      setName("");
      setCapacity("");
      setAmenities("");
    } catch (err) {
      console.error("Error adding room");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Rooms</h1>
      <ul className="mb-6">
        {rooms.map((room) => (
          <li
            key={room._id}
            className="border p-3 mb-2 rounded shadow bg-white"
          >
            <strong>{room.name}</strong> - Capacity: {room.capacity} -
            Amenities: {room.amenities.join(", ")}
          </li>
        ))}
      </ul>

      {user?.role === "admin" && (
        <form onSubmit={handleAddRoom} className="max-w-md">
          <h2 className="text-xl font-semibold mb-2">Add New Room</h2>
          <Input
            label="Room Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Capacity"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
          <Input
            label="Amenities (comma separated)"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
            required
          />
          <Button type="submit">Add Room</Button>
        </form>
      )}
    </div>
  );
};

export default Rooms;
