import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrarMarca from './pages/marca/registrarMarca'; 
import Footer from './components/footer/footer'; 
import MenuAdmin from './components/menuAdmin/menuAdmin';  
import RegistrarSucursal from'./pages/sucursal/registrarSucursal'; 
import RegistrarTalle from'./pages/talle/registrarTalle'; 
import RegistrarColor from'./pages/color/registrarColor'; 
import RegistrarCategoria from'./pages/categoria/registrarCategoria'; 
import Login from'./pages/login/login'; 
import Home from './pages/home/Home';
import Sesion from'./pages/sesion/sesion'; 
import CatalogoProducto from './pages/producto/catalogoProductos';
import { AuthProvider } from './contexts/LoginContext';
import { NotificationProvider} from './contexts/NotificacionContext';
import { MarcaProvider } from './contexts/MarcaContext';
import { SucursalProvider } from './contexts/SucursalContext';
import { ColorProvider } from './contexts/ColorContext';
import { TalleProvider } from './contexts/TalleContext';
import { CategoriaProvider } from './contexts/CategoriaContext';
import { ProductoProvider } from './contexts/ProductoContext';
import { RegisterProvider } from './contexts/RegisterContext';
import Nosotros from './pages/nosotros/nosotros';
import './App.css'
import AppsRami from './subApps/AppsRami'; //  apps rami
import AppsRo from './subApps/AppsRo'; //apps ro
import AppsAbril from './subApps/AppsAbril'; //apps abril
import { CarritoProvider } from './contexts/CarritoContext';
import { PerfilProvider } from './contexts/PerfilContext';
import { ToastContainer } from 'react-toastify';  // Importa el ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Importa los estilos de react-toastify
import { MovimientoStockProvider } from './contexts/MovimientoStockContext';
import { EstadisticasProvider } from './contexts/EstadisticasContext';
import { HistorialComprasProvider } from './contexts/HistorialComprasContext';

export default function App() {
  return (
    <NotificationProvider>
      <Router>
        <CarritoProvider>
        <AuthProvider>
          <MovimientoStockProvider>
            <ProductoProvider>
            <PerfilProvider>
            <HistorialComprasProvider>
              <div className='contenedorDeTodo'>
                <MenuAdmin /> 
               
                <Routes>
                  <Route path="/appsRami/*" element={<AppsRami />} />
                  <Route path="/appsRo/*" element={<AppsRo />} />
                  <Route path="/appsAbril/*" 
                  element=
                  {
                  <EstadisticasProvider>
                  <AppsAbril />
                  </EstadisticasProvider>} 
                  />


                        <Route path="/registrarMarca" 
                          element={
                            <MarcaProvider>
                              <RegistrarMarca />
                            </MarcaProvider>
                          } 
                        />
                        <Route path="/registrarSucursal" 
                          element={
                            <SucursalProvider>
                              <RegistrarSucursal />
                            </SucursalProvider>
                          } 
                        />
                        <Route path="/registrarTalle" 
                          element={
                            <TalleProvider>
                              <RegistrarTalle />
                            </TalleProvider>
                          } 
                        />
                        <Route path="/registrarColor" 
                          element={
                            <ColorProvider>
                              <RegistrarColor />
                            </ColorProvider>
                          } 
                        />
                        <Route path="/registrarCategoria" 
                          element={
                            <CategoriaProvider>
                              <RegistrarCategoria />
                            </CategoriaProvider>
                          } 
                        />
                        <Route path="/login" element={<Login />} />

                        <Route path="/sesion" 
                          element={
                            <RegisterProvider>
                              <Sesion />
                            </RegisterProvider>
                          } 
                        />

                        <Route path="/catalogoProductos" 
                          element={
                            <MarcaProvider>
                              <SucursalProvider>
                                <ColorProvider>
                                  <TalleProvider>
                                    <CategoriaProvider>
                                      <CatalogoProducto />
                                    </CategoriaProvider>
                                  </TalleProvider>
                                </ColorProvider>
                              </SucursalProvider>
                            </MarcaProvider>
                          } 
                        />

                  <Route path="/home" element={<Home />} />
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/nosotros" element={<Nosotros />} />
                </Routes>
                <Footer />
              </div>
              </HistorialComprasProvider>
                </PerfilProvider>
                </ProductoProvider> 
              </MovimientoStockProvider>
            </AuthProvider>
          </CarritoProvider>
      </Router>
      <ToastContainer />
    </NotificationProvider>
  );
}
