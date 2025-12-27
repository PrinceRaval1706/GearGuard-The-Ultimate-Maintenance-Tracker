const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Gear Guardian Backend Running 🚀");
});

/* ROUTES */
const dashboardRoutes = require("./routes/dashboard.routes");
const gearRoutes = require("./routes/gear.routes");
const requestRoutes = require("./routes/request.routes");
const teamRoutes = require("./routes/team.routes");
const calendarRoutes = require("./routes/calendar.routes");
const reportRoutes = require("./routes/report.routes");

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/gears", gearRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/reports", reportRoutes);


module.exports = app;
