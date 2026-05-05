import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../constants';
import OperaterService from '../services/operateri/OperaterService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState({});

  const navigate = useNavigate();

  // Pri pokretanju aplikacije, provjeri postoji li već spremljen operater
  useEffect(() => {
    const operater = localStorage.getItem('operater');

    if (operater) {
      try {
        const parsedOperater = JSON.parse(operater);
        setAuthUser(parsedOperater);
        setIsLoggedIn(true);
      } catch (e) {
        // Ako je podatak u localStorage neispravan, očisti ga
        localStorage.removeItem('operater');
        setIsLoggedIn(false);
      }
    }
    // Ovdje NE radimo navigate(HOME) jer bi to izbacilo korisnika 
    // čak i ako je na nekoj javnoj ruti (npr. registracija)
  }, []);

  async function login(email, lozinka) {
    const odgovor = await OperaterService.prijava(email, lozinka);
    
    if (odgovor.success) {
      // Spremi u localStorage za postojanost nakon osvježavanja stranice
      localStorage.setItem('operater', JSON.stringify(odgovor.data));
      
      setAuthUser(odgovor.data);
      setIsLoggedIn(true);
      
      // Preusmjeri na nadzornu ploču nakon uspješne prijave
      navigate(RouteNames.NADZORNA_PLOCA);
    } else {
      // Prikaz greške ako prijava ne uspije
      alert(odgovor.message || 'Neispravni podaci za prijavu');
      
      // Čišćenje stanja za svaki slučaj
      localStorage.removeItem('operater');
      setAuthUser({});
      setIsLoggedIn(false);
    }
  }

  function logout() {
    // Brisanje podataka iz memorije i stanja aplikacije
    localStorage.removeItem('operater');
    setAuthUser({});
    setIsLoggedIn(false);
    
    // Vraćanje na početnu stranicu
    navigate(RouteNames.HOME);
  }

  const value = {
    isLoggedIn,
    authUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}