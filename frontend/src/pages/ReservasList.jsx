import { useEffect, useState } from 'react';
import { apiGet, apiDelete } from '../api';

export default function ReservasList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  async function load() {
    try {
      setLoading(true);
      setErr('');
      const reservas = await apiGet('/api/reservas');
      setData(reservas);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function onDelete(id) {
    if (!confirm('¿Eliminar la reserva?')) return;
    await apiDelete(`/api/reservas/${id}`);
    load();
  }

  if (loading) return <p>Cargando…</p>;
  if (err) return <p style={{color:'crimson'}}>Error: {err}</p>;

  return (
    <div>
      <h2>Reservas</h2>
      {data.length === 0 && <p>No hay reservas.</p>}
      <ul style={{display:'grid', gap:12, padding:0}}>
        {data.map(r => (
          <li key={r._id} style={{listStyle:'none', border:'1px solid #ddd', borderRadius:8, padding:12}}>
            <b>{r.nombre}</b> — {r.personas} p. — {new Date(r.fechaHora).toLocaleString()}
            {r.telefono && <> — {r.telefono}</>}
            {r.notas && <div style={{opacity:.8}}>{r.notas}</div>}
            <div style={{marginTop:8, display:'flex', gap:8}}>
              {/* Aquí podrías linkear a una pantalla de edición */}
              <button onClick={() => onDelete(r._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={load} style={{marginTop:12}}>Recargar</button>
    </div>
  );
}