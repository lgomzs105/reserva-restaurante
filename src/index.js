const express = require("express");
const reservasRouter = require("./routes/reservas.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Healthcheck
app.get("/health", (_, res) => res.json({ ok: true }));

// Rutas de API
app.use("/api/reservas", reservasRouter);

// Manejo de errores (al final)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});