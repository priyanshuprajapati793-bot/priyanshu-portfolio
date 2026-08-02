const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("🚀 Priyanshu Portfolio Backend Running...");
});

app.use("/api", contactRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
    res.send("🚀 Priyanshu Portfolio Backend Running...");
});
const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);