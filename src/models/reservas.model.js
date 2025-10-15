let _id = 1;
const reservas = []; // {id, nombre, personas, fechaHora, telefono, notas, createdAt}

function crear(data) {
  const nueva = {
    id: _id++,
    nombre: data.nombre,
    personas: data.personas,
    fechaHora: data.fechaHora, // ISO string
    telefono: data.telefono || null,
    notas: data.notas || null,
    createdAt: new Date().toISOString(),
  };
  reservas.push(nueva);
  return nueva;
}

function listar({ desde, hasta } = {}) {
  let out = [...reservas];
  if (desde) out = out.filter(r => r.fechaHora >= desde);
  if (hasta) out = out.filter(r => r.fechaHora <= hasta);
  return out;
}

function obtener(id) {
  return reservas.find(r => r.id === Number(id)) || null;
}

function actualizar(id, data) {
  const idx = reservas.findIndex(r => r.id === Number(id));
  if (idx === -1) return null;
  reservas[idx] = { ...reservas[idx], ...data };
  return reservas[idx];
}

function eliminar(id) {
  const idx = reservas.findIndex(r => r.id === Number(id));
  if (idx === -1) return false;
  reservas.splice(idx, 1);
  return true;
}

module.exports = { crear, listar, obtener, actualizar, eliminar };