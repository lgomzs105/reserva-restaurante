const Reserva = require("../models/reservas.model");

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

    const doc = await Reserva.create({
      nombre: req.body.nombre,
      personas: req.body.personas,
      fechaHora: new Date(req.body.fechaHora),
      telefono: req.body.telefono ?? null,
      notas: req.body.notas ?? null,
    });

    res.status(201).json(doc);
  } catch (e) { next(e); }
}

async function listarReservas(req, res, next) {
  try {
    const { desde, hasta } = req.query;
    const filter = {};
    if (desde || hasta) {
      filter.fechaHora = {};
      if (desde) filter.fechaHora.$gte = new Date(desde);
      if (hasta) filter.fechaHora.$lte = new Date(hasta);
    }

    const reservas = await Reserva.find(filter).sort({ fechaHora: 1, _id: 1 });
    res.json(reservas);
  } catch (e) { next(e); }
}

async function obtenerReserva(req, res, next) {
  try {
    const r = await Reserva.findById(req.params.id);
    if (!r) return res.status(404).json({ error: "Reserva no encontrada" });
    res.json(r);
  } catch (e) { next(e); }
}

async function actualizarReserva(req, res, next) {
  try {
    // validaciones ligeras
    if (req.body.fechaHora && isNaN(Date.parse(req.body.fechaHora))) {
      return res.status(400).json({ error: "fechaHora debe ser ISO válida." });
    }
    if (req.body.personas !== undefined && (!Number.isInteger(req.body.personas) || req.body.personas < 1)) {
      return res.status(400).json({ error: "personas debe ser entero >= 1." });
    }

    const patch = { ...req.body };
    if (patch.fechaHora) patch.fechaHora = new Date(patch.fechaHora);

    const r = await Reserva.findByIdAndUpdate(req.params.id, patch, { new: true });
    if (!r) return res.status(404).json({ error: "Reserva no encontrada" });
    res.json(r);
  } catch (e) { next(e); }
}

async function eliminarReserva(req, res, next) {
  try {
    const r = await Reserva.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ error: "Reserva no encontrada" });
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