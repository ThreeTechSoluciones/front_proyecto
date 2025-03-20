import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Style from "./perfil.module.css";
import ImageAvatars from '../../components/avatar/fotoPerfil';
import { useEffect, useRef, useState } from 'react';
import { InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { validationsPerfil } from './validationsPerfil';
import { usePerfil } from '../../contexts/PerfilContext';
import imageCompression from 'browser-image-compression';
import Notificaciones from '../../components/notificaciones';

const Perfil: React.FC = () => {

  const { fetchPerfil, updatePerfil, datosPerfil, loading} = usePerfil();

  const [mostrarBoton, setMostrarBoton] = useState(false); // Estado inicial oculto
  
  const handleMostrarBoton = () => setMostrarBoton(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleSubirArchivo = () => fileInputRef.current!.click();

  const [imagenPerfil, setImagenPerfil] = useState<string | null>(null);

// Recuperar imagen del localStorage al cargar la página
useEffect(() => {
  const imagenGuardada = localStorage.getItem("imagenPerfil");
  if (imagenGuardada) {
    setImagenPerfil(imagenGuardada); // Actualizar el estado con la imagen desde localStorage
  }
}, []); // Este efecto solo se ejecuta al cargar la página



const manejarSeleccionDeArchivo = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const archivo = e.target.files?.[0];
  if (archivo) {
   if (archivo.type.startsWith("image/")) { //se analiza si el archivo supera 5mb
      try {
        // Comprimir la imagen
        const opciones = {
          maxSizeMB: 1, // Máximo tamaño de archivo de 1MB
          maxWidthOrHeight: 1024, // Redimensionar para que la dimensión más grande sea 1024px
          useWebWorker: true,
        };
        const imagenComprimida = await imageCompression(archivo, opciones);
        const reader = new FileReader();
        reader.onloadend = () => {
        const imagenDataUrl = reader.result as string;
         
      // Actualiza el estado y guarda la imagen comprimida en localStorage
        setImagenPerfil(imagenDataUrl);
        localStorage.setItem('imagenPerfil', imagenDataUrl);
        };
        reader.readAsDataURL(imagenComprimida);
      } catch (error) {
        console.error('Error al comprimir la imagen:', error);
      }
    } else {
      Notificaciones.error("El archivo no es una imagen válida");
    }
  } else {
    Notificaciones.error('No se seleccionó archivo');
  }
};
//VALIDACIONES
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(validationsPerfil),
  });


  //MANEJO DEL ENVIO DE FORMULARIO
  const onSubmitPerfil = (data: any) => {
  
    // Ocultar los botones de selección de archivos
    setMostrarBoton(false);
  
    // Actualizar los datos del perfil en el backend
    updatePerfil({
      nombre: data.nombre,
      email: data.email,
      direccionEnvio: data.direccionEnvio,
      telefono: data.numeroTelefono,
      
    });
    
  
   
  };
  

  useEffect(() => {
    fetchPerfil(); // Esto hará el GET y traerá los datos del perfil
  }, []);

  return (
    <div className={Style.screen}>
      <div className={Style.container}>
        <h1>MI PERFIL</h1>
        <ImageAvatars src={imagenPerfil || "/broken-image.jpg"} alt="Foto perfil" width="130px" height="130px" />
        <a className={Style.image} onClick={handleMostrarBoton}>Editar imagen</a>
        <div className={mostrarBoton ? Style.show : Style.hide}>
          <input type="file" className={Style.inputFile} ref={fileInputRef} onChange={manejarSeleccionDeArchivo} accept="image/*" />
          <button onClick={handleSubirArchivo} className={Style.button}>Seleccionar Archivo</button>
        </div>
        <form onSubmit={handleSubmit(onSubmitPerfil)}>
          <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '35ch' } }} noValidate autoComplete="off">
            {/*Input nombre */}
            <div className={Style.input}>
              <TextField
                label="Nombre"
                defaultValue={datosPerfil?.nombre || ""}
                variant="standard"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <EditIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                {...register('nombre')}
              />
              {errors.nombre && typeof errors.nombre.message === 'string' && (
                <p className={Style.alerts}>{errors.nombre.message}</p>)}
            </div>
            {/*Input mail */}
            <div className={Style.input}>
              <TextField
                label="Correo electrónico"
                defaultValue={datosPerfil?.email || ""}
                variant="standard"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <EditIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                {...register('email')}
              />
              {errors.email && typeof errors.email.message === 'string' && (
                <p className={Style.alerts}>{errors.email.message}</p>)}
            </div>
            {/*Input direccion envio */}
            <div className={Style.input}>
              <TextField
                label="Dirección de envío"
                defaultValue={datosPerfil?.direccionEnvio || 'Dirección no disponible'}
                variant="standard"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <EditIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                {...register('direccionEnvio')}
              />
             {errors.direccionEnvio && typeof errors.direccionEnvio.message === 'string' && (
                <p className={Style.alerts}>{errors.direccionEnvio.message}</p>)}
            </div>
            {/*Input nro tel */}
            <div className={Style.input}>
              <TextField
                label="Nro teléfono"
                defaultValue={datosPerfil?.telefono || ""}
                variant="standard"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <EditIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                {...register('numeroTelefono')}
              />
              {errors.numeroTelefono && typeof errors.numeroTelefono.message === 'string' && (
                <p className={Style.alerts}>{errors.numeroTelefono.message}</p>
              )}
            </div>
          </Box>
          <button type="submit" className={Style.button} disabled={loading}>Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default Perfil;
