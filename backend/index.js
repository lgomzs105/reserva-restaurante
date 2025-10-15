require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const reservasRouter = require("./src/routes/reservas.routes");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Healthcheck
app.get("/health", (_, res) => res.json({ ok: true }));

// Rutas
app.use("/api/reservas", reservasRouter);

// Errores
app.use(errorHandler);

async function start() {
  try {
    if (!process.env.MONGO_URI) throw new Error("Falta MONGO_URI en .env");
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ No se pudo iniciar:", err.message);
    process.exit(1);
  }
}

start();