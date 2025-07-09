import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ListaPontos from './pages/ListaPontos';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lista" element={<ListaPontos />} />
          <Route path="/mapa" element={<div>Mapa de Pontos (Em breve)</div>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
