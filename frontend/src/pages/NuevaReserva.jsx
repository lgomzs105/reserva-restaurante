import { useState } from 'react';
import { apiPost } from '../api';

export default function NuevaReserva() {
  const [form, setForm] = useState({
    nombre: '',
    personas: 2,
    fecha: '',
    hora: '',
    telefono: '',
    notas: ''
  });
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  function update(k, v) { setForm(s => ({...s, [k]: v})); }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(''); setErr('');
    try {
      // Combina fecha + hora a ISO (Z opcional si quieres UTC; aquí usamos local)
      const iso = new Date(`${form.fecha}T${form.hora}:00`).toISOString();
      const body = {
        nombre: form.nombre.trim(),
        personas: Number(form.personas),
        fechaHora: iso,
        telefono: form.telefono.trim() || undefined,
        notas: form.notas.trim() || undefined
      };
      const created = await apiPost('/api/reservas', body);
      setMsg(`Reserva creada: ${created.nombre} (${new Date(created.fechaHora).toLocaleString()})`);
      setForm({ nombre:'', personas:2, fecha:'', hora:'', telefono:'', notas:'' });
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div>
      <h2>Nueva reserva</h2>
      {msg && <p style={{color:'green'}}>{msg}</p>}
      {err && <p style={{color:'crimson'}}>{err}</p>}
      <form onSubmit={onSubmit} style={{display:'grid', gap:8, maxWidth:420}}>
        <input placeholder="Nombre" value={form.nombre} onChange={e=>update('nombre', e.target.value)} required />
        <input type="number" min={1} placeholder="Personas" value={form.personas} onChange={e=>update('personas', e.target.value)} required />
        <input type="date" value={form.fecha} onChange={e=>update('fecha', e.target.value)} required />
        <input type="time" value={form.hora} onChange={e=>update('hora', e.target.value)} required />
        <input placeholder="Teléfono" value={form.telefono} onChange={e=>update('telefono', e.target.value)} />
        <textarea placeholder="Notas" value={form.notas} onChange={e=>update('notas', e.target.value)} />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}