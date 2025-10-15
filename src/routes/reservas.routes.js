const { Router } = require("express");
const {
  crearReserva,
  listarReservas,
  obtenerReserva,
  actualizarReserva,
  eliminarReserva,
} = require("../controllers/reservas.controller");

const router = Router();

router.get("/", listarReservas);        // GET    /api/reservas?desde=ISO&hasta=ISO
router.get("/:id", obtenerReserva);     // GET    /api/reservas/:id
router.post("/", crearReserva);         // POST   /api/reservas
router.put("/:id", actualizarReserva);  // PUT    /api/reservas/:id
router.delete("/:id", eliminarReserva); // DELETE /api/reservas/:id

module.exports = router;