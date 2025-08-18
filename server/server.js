const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// process.on("warning", (warning) => {
//   if (
//     warning.name === "DeprecationWarning" &&
//     warning.message.includes("MONGODB DRIVER")
//   ) {
//     // Skip MongoDB DRIVER warnings
//   } else {
//     console.warn(warning);
//   }
// });

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));

app.use("/api/rooms", require("./routes/room.routes"));
app.use("/api/bookings", require("./routes/booking.routes"));

// // Default route
// app.get("/", (req, res) => {
//   res.send(" API is running...");
// });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
