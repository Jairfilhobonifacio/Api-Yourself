import { Link, NavLink } from 'react-router-dom';
import './App.css';

export default function Header() {
  return (
    <header className="header">
      <nav>
        <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>Dashboard</NavLink>
        <NavLink to="/lista" className={({isActive}) => isActive ? 'active' : ''}>Lista</NavLink>
        <NavLink to="/mapa" className={({isActive}) => isActive ? 'active' : ''}>Mapa</NavLink>
      </nav>
    </header>
  );
}
