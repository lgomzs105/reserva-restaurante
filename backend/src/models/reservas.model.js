const { Schema, model } = require("mongoose");

const ReservaSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    personas: { type: Number, required: true, min: 1 },
    fechaHora: { type: Date, required: true }, // guardamos como Date
    telefono: { type: String, default: null },
    notas: { type: String, default: null },
  },
  { timestamps: true } // createdAt, updatedAt
);

// Índice útil para consultas por fecha
ReservaSchema.index({ fechaHora: 1 });

module.exports = model("Reserva", ReservaSchema);