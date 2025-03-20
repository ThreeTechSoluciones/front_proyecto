import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuth } from '../../contexts/LoginContext';
import Swal from 'sweetalert2';
import Notificaciones from '../notificaciones';


export default function Accordion2Usage() {

  const{ logout} = useAuth()
  

  
  // Recupera el valor del rol desde localStorage
  // useEffect(() => {
  //   const rolGuardado = localStorage.getItem("rol");
  //   setRol(rolGuardado); // Guarda el rol en el estado local
  // }, [rol]);

  //Función para cerrar sesión
  const cerrarSesion=()=>{
    Swal.fire({
      title: 'Cerrar Sesión',
      text: '¿Estás seguro de que deseas cerrar tu sesión?',
      icon: 'warning',
      showCancelButton: true,
      showCloseButton: true, // Habilitamos la cruz para cerrar
      closeButtonHtml: '&times;', // Personalizamos la cruz
      confirmButtonColor: '#a27eea', // Color lila para el botón de confirmar
      cancelButtonColor: '#ff6b6b', // Color rojo para el botón de cancelar
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      width: '360px', // Cuadro aún más pequeño
      padding: '16px', // Menor espaciado interno
      customClass: {
        popup: 'modern-swal',
        title: 'modern-swal-title',
        htmlContainer: 'modern-swal-text',
        confirmButton: 'modern-swal-confirm',
        cancelButton: 'modern-swal-cancel',
        closeButton: 'modern-swal-close',
      },
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        // Acciones al confirmar
        logout();
        Notificaciones.exito(`Has cerrado sesión exitosamente.`);
        
      }
    });
  };
  
  const navigate = useNavigate(); // Hook para navegar a otras rutas
  
  //función para manejo de rutas
  const handleNavigation = (ruta: string) => {
    navigate(ruta); // Navegar a la ruta especificada
  };
  
  //se definen las entidades del menú desplegable
  const entidades = [
    { id: 1, nombre: "Mi Perfil", onClick:() => handleNavigation("/appsAbril/perfil")}, //redirecciona al perfil del usuario
    { id: 2, nombre: "Mis compras", onClick:() => handleNavigation("/appsAbril/historialCompras")}, //redirecciona al historial de compras del usuario
    { id: 3 , onClick: cerrarSesion, icon:<LogoutIcon  sx={{ color: 'black' ,fontSize: 30  }} />  }, //sirve para cerrar sesión
  ];
  
  return (
    <div >
      <Accordion expanded >
        {entidades.map((entidad)=>(
        <AccordionDetails key={entidad.id} sx={{ color:'white',backgroundColor: 'white', padding: '15px', textAlign:'center', '&:hover': {backgroundColor: '#c99af3'} }}>
        <Button 
          sx={{
            color: 'BLACK',  // Color del texto del botón
            transition: 'background-color 0.3s',
            display: 'block',  // Hace que el botón ocupe toda la línea disponible
            width: '100%',                
            '&:hover': {color: 'WHITE'}// Cambia el color del texto cuando el ratón está sobre el botón
          }}
          startIcon={entidad.icon} //inicializa el icono de la entidad
          onClick={entidad.onClick} //cuando se hace click se llama al atributo asignado en la entidad
          > 
          {entidad.nombre}
        </Button>
        </AccordionDetails>
        ))}
      </Accordion>
    </div>
  );
}