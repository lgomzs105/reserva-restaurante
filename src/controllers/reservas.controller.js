const Reservas = require("../models/reservas.model");

function validarPayload(body) {
  const errors = [];
  if (!body.nombre || typeof body.nombre !== "string") errors.push("nombre es requerido (string).");
  if (!Number.isInteger(body.personas) || body.personas < 1) errors.push("personas debe ser entero >= 1.");
  if (!body.fechaHora || isNaN(Date.parse(body.fechaHora))) errors.push("fechaHora debe ser ISO válida.");
  return errors;
}

async function crearReserva(req, res, next) {
  try {
    const errors = validarPayload(req.body);
    if (errors.length) return res.status(400).json({ errors });
    const creada = Reservas.crear(req.body);
    res.status(201).json(creada);
  } catch (e) { next(e); }
}

async function listarReservas(req, res, next) {
  try {
    const { desde, hasta } = req.query;
    res.json(Reservas.listar({ desde, hasta }));
  } catch (e) { next(e); }
}

async function obtenerReserva(req, res, next) {
  try {
    const r = Reservas.obtener(req.params.id);
    if (!r) return res.status(404).json({ error: "Reserva no encontrada" });
    res.json(r);
  } catch (e) { next(e); }
}

async function actualizarReserva(req, res, next) {
  try {
    // Validación opcional: si vienen campos clave, revisarlos
    if (req.body.fechaHora && isNaN(Date.parse(req.body.fechaHora))) {
      return res.status(400).json({ error: "fechaHora debe ser ISO válida." });
    }
    if (req.body.personas !== undefined && (!Number.isInteger(req.body.personas) || req.body.personas < 1)) {
      return res.status(400).json({ error: "personas debe ser entero >= 1." });
    }

    const r = Reservas.actualizar(req.params.id, req.body);
    if (!r) return res.status(404).json({ error: "Reserva no encontrada" });
    res.json(r);
  } catch (e) { next(e); }
}

async function eliminarReserva(req, res, next) {
  try {
    const ok = Reservas.eliminar(req.params.id);
    if (!ok) return res.status(404).json({ error: "Reserva no encontrada" });
    res.status(204).send();
  } catch (e) { next(e); }
}

module.exports = {
  crearReserva,
  listarReservas,
  obtenerReserva,
  actualizarReserva,
  eliminarReserva,
};