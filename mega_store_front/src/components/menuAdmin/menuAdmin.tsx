import styles from './menuAdmin.module.css';
import AccordionUsage from './acordionRegistrar';
import { useEffect, useState } from 'react';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/LoginContext';
import CarritoMenuAdmin from '../carritoBarraMenu/CarritoBarraMenu';
import Accordion2Usage from './acordionUsuario';




const Menu = () => {
    const{rol} = useAuth()
    const [rolG, setRol] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/home';

    // Recupera el valor del rol desde localStorage
    useEffect(() => {
        const rolGuardado = localStorage.getItem("rol");
        setRol(rolGuardado); // Guarda el rol en el estado local
    }, [rol]);

    //Effect par que siempre se cargue desde el principio de la pag
    useEffect(() =>(
        window.scrollTo(0, 0)
    ),[location])


    //estado para contrlar la visibilidad del Menu desplegable
    const [isMenuOpen, setMenuOpen] = useState(false);

    const [isMenu2Open, setMenu2Open] = useState(false);

    
    // Función para ir cambiando el estado del menú
    const toggleMenu = () => { //Función para abrir el desplegable
        setMenuOpen(!isMenuOpen);
    };

    const toggleMenu2 = () => { //Función para abrir el desplegable
        setMenu2Open(!isMenu2Open);
    };

    const closeMenu = () => { //función para cerrar el desplegable
        setMenuOpen(false);  // Cerrar menú cuando el mouse salga del ícono o del menú
    };

    const closeMenu2 = () => { //función para cerrar el desplegable
        setMenu2Open(false);  // Cerrar menú cuando el mouse salga del ícono o del menú
    };

    const navigate = useNavigate(); // Hook para navegar a otras rutas

    const handleNavigation = () => {
       navigate('/sesion'); // Navegar a la ruta especificada
    };
    const handleNavigationCarrito = () => {
       navigate('/appsRami/carrito'); // Navegar a la ruta especificada
    };
    const handleCatalogo=()=>{
        navigate('/catalogoProductos')
    }
    const handleHome=()=>{
        navigate('/home')
    }
    const handleNosotros=()=>{
        navigate('/nosotros')
    }

    const handleEstadisticas=()=>{
        navigate('/appsAbril/opcionesEstadisticas')
    }

    
    

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 100) { // Mostrar el botón después de desplazarse 100px
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);
    

    return (
    <div className={styles.container1}>

        <div className={!isVisible ? styles.header : styles.header2}>
            
            <img src='/logo.png' alt="Logo" width="100" height="60" /> {/* Ajusta el tamaño según sea necesario */}
            <div className={styles.container2}>
                {rolG=='5' ?
                    <button className={styles.options} onMouseEnter={toggleMenu}><DensityMediumIcon/>{/* Agrega el ícono dentro del botón */}
                    </button>
                :''}
                
            
            {/* Contenido del menú que se muestra/oculta según el estado */}
                {isMenuOpen && (
                    <a className={styles.dropdownContent} onMouseLeave={closeMenu}>
                    <AccordionUsage />
                    </a>   
                )}
            </div> 
            <h1  className={styles.title} onClick={()=>handleHome()}>{isHome ? 'MEGASTORE': 'MEGASTORE'} </h1> 

            <div className={styles.components}>

                <a className={styles.seleccion2} onClick={handleNosotros} >Nosotros</a>
                {rolG == '5'? 

                <>
                <a className={styles.seleccion2} onClick={handleCatalogo}>Productos</a>
                <a className={styles.seleccion2} onClick={handleEstadisticas}>Estadísticas</a>
    
                <div className={styles.iconoUser}>
                    <a className={styles.seleccion2} onMouseEnter={toggleMenu2}> < PersonIcon className={styles.icono}/></a>
                    
                    {isMenu2Open && (
                        <a className={styles.dropdownContent2} onMouseLeave={closeMenu2}>
                        <Accordion2Usage />
                        </a>   
                    )}
                </div>
                <a className={styles.seleccion2} onClick={handleNavigationCarrito}> < CarritoMenuAdmin /></a>
                </>
                :''}
                
                {/**Si no está logueado, no se muestran las opciones de perfil */}
                {rolG != '5'?
                <>
                    {rolG==null ? 
                        <a className={styles.seleccion2} onClick={handleNavigation}> < PersonIcon className={styles.icono} /></a>
                    :
                    <div className={styles.iconoUser}> 

                        <a className={styles.seleccion2} onMouseEnter={toggleMenu2}> < PersonIcon className={styles.icono} /> </a>

                        {isMenu2Open && (
                            <a className={styles.dropdownContent2} onMouseLeave={closeMenu2}>
                             <Accordion2Usage />
                            </a>   
                        )}
                    </div>  
                    }
                    
                    

                    <a className={styles.seleccion2} onClick={handleNavigationCarrito}> < CarritoMenuAdmin/></a>
                </>
                :''}

            </div>

        </div>
        
    </div>
    );
};

export default Menu
