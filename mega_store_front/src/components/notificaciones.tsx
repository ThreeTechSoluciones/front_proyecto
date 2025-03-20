import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notificaciones = {
    exito : (mensaje: string) => {
        toast.success(mensaje, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
          marginTop: '60px', // Ajusta esta propiedad para bajar la notificación
          fontSize: '14px',  // Fuente más pequeña
      },
        });
      },
  error: (mensaje: string) => {
    toast.error(mensaje, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        marginTop: '60px', // Ajusta esta propiedad para bajar la notificación
        fontSize: '14px',  // Fuente más pequeña
      },
    });
  },
  info: (mensaje: string) => {
    toast.info(mensaje, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        marginTop: '60px', // Ajusta esta propiedad para bajar la notificación
        fontSize: '14px',  // Fuente más pequeña
      },
    });
  },
  advertencia: (mensaje: string) => {
    toast.warn(mensaje, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        marginTop: '60px', // Ajusta esta propiedad para bajar la notificación
        fontSize: '14px',  // Fuente más pequeña
      },
    });
  },
};

export default Notificaciones;
