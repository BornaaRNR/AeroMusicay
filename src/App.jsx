import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import IzvodacPregled from './pages/izvodaci/IzvodacPregled';
import { IME_APLIKACIJE, RouteNames } from './constants';
import Izbornik from './components/Izbornik';
import IzvodacNovi from './pages/izvodaci/IzvodacNovi';
import IzvodacPromjena from './pages/izvodaci/IzvodacPromjena';
import AlbumPregled from './pages/album/AlbumPregled';
import AlbumNovi from './pages/album/AlbumNovi';
import AlbumPromjena from './pages/album/AlbumPromjena';
import PjesmaPregled from './pages/pjesma/PjesmaPregled';
import PjesmaNovi from './pages/pjesma/PjesmaNovi';
import PjesmaPromjena from './pages/pjesma/PjesmaPromjena';
import ZanrPregled from './pages/zanr/ZanrPregled';
import ZanrNovi from './pages/zanr/ZanrNovi';
import ZanrPromjena from './pages/zanr/ZanrPromjena';
import GeneriranjeGlazbe from './pages/GeneriranjeGlazbe';

import OperaterPregled from './pages/operateri/OperaterPregled'
import OperaterNovi from './pages/operateri/OperaterNovi'
import OperaterPromjena from './pages/operateri/OperaterPromjena'
import OperaterPromjenaLozinke from './pages/operateri/OperaterPromjenaLozinke'

import Login from './pages/login/Login'
import Registracija from './pages/registracija/Registracija'
import NadzornaPloca from './pages/NadzornaPloca'
import useAuth from './hooks/useAuth'

function App() {
  const { isLoggedIn, authUser } = useAuth()
   
  return (
    <>
      <Izbornik />
      <Container className="mt-3" style={{ marginBottom: '100px' }}>
        <Routes>
          <Route path={RouteNames.HOME} element={<Home />} />

          {isLoggedIn ? (
            <>
              <Route path={RouteNames.NADZORNA_PLOCA} element={<NadzornaPloca />} />

              <Route path={RouteNames.ZANROVI} element={<ZanrPregled />} />
              <Route path={RouteNames.ZANR_NOVI} element={<ZanrNovi />} />
              <Route path={RouteNames.ZANR_PROMJENA} element={<ZanrPromjena />} />

              <Route path={RouteNames.IZVODACI} element={<IzvodacPregled />} />
              <Route path={RouteNames.IZVODACI_NOVI} element={<IzvodacNovi />} />
              <Route path={RouteNames.IZVODACI_PROMJENA} element={<IzvodacPromjena />} />

              <Route path={RouteNames.ALBUMI} element={<AlbumPregled />} />
              <Route path={RouteNames.ALBUMI_NOVI} element={<AlbumNovi />} />
              <Route path={RouteNames.ALBUMI_PROMJENA} element={<AlbumPromjena />} />

              <Route path={RouteNames.PJESME} element={<PjesmaPregled />} />
              <Route path={RouteNames.PJESME_NOVI} element={<PjesmaNovi />} />
              <Route path={RouteNames.PJESME_PROMJENA} element={<PjesmaPromjena />} />

              {authUser && authUser.uloga === 'admin' && (
                <>
                  <Route path={RouteNames.OPERATERI} element={<OperaterPregled />} />
                  <Route path={RouteNames.OPERATERI_NOVI} element={<OperaterNovi />} />
                  <Route path={RouteNames.OPERATERI_PROMJENA} element={<OperaterPromjena />} />
                  <Route path={RouteNames.OPERATERI_PROMJENA_LOZINKE} element={<OperaterPromjenaLozinke />} />
                  <Route path={RouteNames.GENERIRANJE_GLAZBE} element={<GeneriranjeGlazbe />} />
                </>
              )}
            </>
          ) : (
            <>
              <Route path={RouteNames.LOGIN} element={<Login />} />
              <Route path={RouteNames.REGISTRACIJA} element={<Registracija />} />
            </>
          )}
        </Routes>
      </Container>

      <footer className="fixed-bottom text-center py-3 bg-light border-top">
        &copy; {IME_APLIKACIJE}
      </footer>
    </>
  );
}

export default App;