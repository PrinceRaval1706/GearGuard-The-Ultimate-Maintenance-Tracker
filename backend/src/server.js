require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 5000;
const pool = require("./config/db");

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);



app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

pool.query("SELECT 1")
  .then(() => console.log("✅ Neon DB Connected"))
  .catch(err => console.error("❌ DB Error", err.message));