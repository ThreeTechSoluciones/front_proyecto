
import CardProducto from '../../components/cardProductoAdmin/listaProductos';
import CardUser from '../../components/cardProductoUser/CardUser';
import BarraBusqueda from '../../components/busqueda/barrabusqueda';
import styles from './catalogoProductos.module.css'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RegistrarProducto from '../../pages/producto/registrarProducto'; 
import Dialog from '@mui/material/Dialog'; // Dialog (se usa como un modal)
import DialogContent from '@mui/material/DialogContent'; // Contenido del modal de Material UI
import DialogActions from '@mui/material/DialogActions'; // Acciones como botones en el modal de Material UI
import Button from '@mui/material/Button'; // Botón de Material UI
import ZoomBoton from '../../components/transitions/buttomzoom';  
import { useProductos } from '../../contexts/ProductoContext';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useMovimientoStock } from '../../contexts/MovimientoStockContext';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CardCarga from '../../components/cardCargaUser/cardCargaUser';
import FiltroProductos from '../../components/bucadorConFiltro/BuscadorConFiltro';



const CatalogoProducto =()=> {
    const {productos,fetchProductos, goToPage, totalPages, currentPage, loading : loadingProducto, productosFiltradosAdmin, fetchProductosAll, productosFiltradosUser} = useProductos()
    const {loading} = useMovimientoStock()
    const location = useLocation();
    const isAdmin = location.pathname === '/catalogoProductos';
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    // const [currentPage, setCurrentPage] = useState(0); 

    const modalProducto=()=>{
        setDialogOpen(!isDialogOpen)
    }
    // Función para ir cambiando el estado del menú
    const toggleMenu = () => { //Función para abrir el desplegable
        setMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        // Verifica la ruta
        const isHome = location.pathname === '/home';
        const isCatalogoProductos = location.pathname === '/catalogoProductos';
    
        
        // Si estás en home y productos está vacío, haz el fetch
        if (isHome && productos.length === 0) {
            fetchProductos(currentPage, 12, "id,asc"); // Paginación por defecto con 5 productos por página
        }
    
        // Si estás en catalogoProductos, siempre haz el fetch
        if (isCatalogoProductos) {
            fetchProductos(currentPage, 12, "id,asc");
            fetchProductosAll()
        }
    }, [location.pathname, productos.length, loading]);
    

    // Función para manejar el cambio de página
    const handlePageChange = (newPage: number) => {
        goToPage(newPage); // Usamos la función goToPage para navegar a la nueva página
        
        const catalogo = document.getElementById("catalogo");
        if (catalogo) {
          catalogo.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        
        <div className={styles.container} style={{marginTop: isAdmin ? '75px' : '0px'}} id='catalogo'>

                {isAdmin ? (

                        <div className={styles.productos}>
                            <h2 >ADMINISTRACIÓN DE PRODUCTOS </h2>
                            <div className={styles.contFiltros}>
                                <FiltroProductos></FiltroProductos>
                            </div>
                            
                            <div className={styles.contItems}>
                                {(productosFiltradosAdmin.length > 0 ? productosFiltradosAdmin : productos).map((producto) => (
                                    <CardProducto key={producto.id} {...producto} />
                                    ))}
                            </div>
                            <button className={styles.button} onClick={() => modalProducto()}><AddCircleIcon /></button>
                        </div>

                    ) : (
                        <div className={styles.listado}>

                            <div className={styles.fondo}>
                                <h1>CATÁLOGO DE PRODUCTOS </h1>
                                
                            </div>
                            <BarraBusqueda></BarraBusqueda>

                            {!loadingProducto ? 

                                (productosFiltradosUser.length > 0 ? productosFiltradosUser : productos).map((producto) => (
                                <CardUser key={producto.id}  {...producto}/>    
                                ))
                                :
                                Array.from({ length: 12 }).map((_, index) => (
                                    <CardCarga key={index} />
                                ))

                            }
                            

                        </div>
                    )}
            
            {/* Paginación */}
            {(productosFiltradosAdmin.length === 0 && productosFiltradosUser.length === 0) && totalPages > 1 && (
                <Stack spacing={2}>
                    <Pagination 
                        count={totalPages} 
                        page={currentPage + 1} 
                        onChange={(_, newPage) => handlePageChange(newPage - 1)} 
                        variant="outlined" 
                        color="secondary" 
                    />
                </Stack>
            )}
            

            {/* Dialog para el formulario de Registrar Producto */}
            <Dialog open={isDialogOpen} onClose={toggleMenu} fullWidth maxWidth="sm">
                    <DialogContent>
                        <RegistrarProducto/>{/* Es el formulario para registrar un producto que se renderiza dentro del Dialog */}
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={modalProducto}>
                        <ZoomBoton />
                    </Button>
                    </DialogActions>
            </Dialog>
        </div>
    );
};
export default CatalogoProducto;