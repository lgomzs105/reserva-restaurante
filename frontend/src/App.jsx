import { useState } from 'react';
import ReservasList from './pages/ReservasList';
import NuevaReserva from './pages/NuevaReserva';

export default function App() {
  const [tab, setTab] = useState('list');
  return (
    <div style={{maxWidth:960, margin:'0 auto', padding:16}}>
      <h1>Reserva Restaurante</h1>
      <nav style={{display:'flex', gap:8, marginBottom:12}}>
        <button onClick={()=>setTab('list')} disabled={tab==='list'}>Listado</button>
        <button onClick={()=>setTab('new')} disabled={tab==='new'}>Nueva</button>
      </nav>
      {tab === 'list' ? <ReservasList /> : <NuevaReserva />}
    </div>
  );
}