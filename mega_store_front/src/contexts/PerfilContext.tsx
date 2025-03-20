import React, { createContext, useContext, useState, ReactNode } from "react";
import { getDatosPerfil, updateDatosPerfil } from "../service/PerfilService";
import 'react-toastify/dist/ReactToastify.css';
import Notificaciones from "../components/notificaciones";

export interface Perfil {
  id?: number;
  nombre: string;
  email: string;
  direccionEnvio: string;
  telefono: string;
}

// Define las funciones del contexto
interface PerfilContextType {
  fetchPerfil: () => void;
  updatePerfil: (newData: { telefono?: string; nombre?: string; email?: string; direccionEnvio?: string }) => void; // Función para actualizar múltiples campos
  datosPerfil: Perfil | null; // Puede ser null si no se obtiene el perfil
  loading: boolean;
  error: string | null;
}

// Crea el contexto
const PerfilContext = createContext<PerfilContextType | undefined>(undefined);

interface PerfilProviderProps {
  children: ReactNode;
}

export const PerfilProvider: React.FC<PerfilProviderProps> = ({ children }) => {
  
  // Lee el perfil desde localStorage al iniciar
  const [datosPerfil, setDatosPerfil] = useState<Perfil | null>(() => {
    const storedPerfil = localStorage.getItem("perfilUsuario");
    return storedPerfil ? JSON.parse(storedPerfil) : null;
  });

  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  // GET Función para obtener los datos del perfil
const fetchPerfil = async () => {
  setLoading(true);
  setError(null); // Limpiamos el error antes de la llamada

  // Verificamos si ya tenemos el perfil almacenado en localStorage
  const storedPerfil = localStorage.getItem("perfilUsuario");

  if (storedPerfil) {
    console.log("existe")
    // Si ya existe el perfil en localStorage, lo cargamos directamente
    setDatosPerfil(JSON.parse(storedPerfil));
    setLoading(false);
    return;  // No realizamos la llamada al backend
  }

  // Si no encontramos el perfil en localStorage, realizamos la llamada al backend
  try {
    console.log("no existe")
    const id = localStorage.getItem("idUser") || '';
    console.log(id)
    if (!id) {
      setError("Usuario no autenticado");
      return;
    }
    localStorage.removeItem("perfilUsuario");
    
    // Llamamos al servicio para obtener los datos del perfil desde el backend
    const response = await getDatosPerfil(id); 
    console.log("Respuesta obtenida:", response.data);

      //Definimos la data que necesitamos recuperar
      const perfil: Perfil = {
        id: response.data.id,
        nombre: response.data.nombre,
        email: response.data.email,
        direccionEnvio: response.data.direccionEnvio,
        telefono: response.data.telefono,
      };

      // Guardar el perfil en Local Storage
      localStorage.setItem("perfilUsuario", JSON.stringify(perfil));

      // Actualizamos el estado
      setDatosPerfil(perfil);
    } catch (err: any) {
      setError("Error al cargar los datos del perfil");
      console.error("Error:", err.response ? err.response.data : err);
    } finally {
      setLoading(false);
      
    }
    
  };
  

  // PUT Función para actualizar los datos del perfil
  const updatePerfil = async (newData: { telefono?: string; nombre?: string; email?: string; direccionEnvio?: string }) => {
    setLoading(true);
    setError(null);
    if (!datosPerfil) {
      setError("No se ha cargado el perfil");
      return;
    }

    try {
      // Creamos el objeto con los datos actualizados usando el spread operator
      const updatedPerfil = { ...datosPerfil, ...newData };

      // Llamamos al servicio para actualizar el perfil
      const response = await updateDatosPerfil(updatedPerfil); // Asegúrate de que esta función haga el PUT correctamente
      console.log("Respuesta de la actualización:", response.data);

      // Actualizamos el perfil en el estado y localStorage
      setDatosPerfil(updatedPerfil);
      console.log("Datos del perfil enviados al backend");
      localStorage.setItem("perfilUsuario", JSON.stringify(updatedPerfil));

    } catch (err: any) {
      setError("Error al actualizar los datos del perfil");
      Notificaciones.error('Tus datos no puedieron ser actualizados. Intente nuevamente'); // Notificación adicional
    
    } finally {
      setLoading(false);
      Notificaciones.exito('Tus datos fueron actualizados.'); // Notificación adicional

    }
  };

  return (
    <PerfilContext.Provider value={{ fetchPerfil, updatePerfil, datosPerfil, loading, error }}>
      {children}
    </PerfilContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const usePerfil = () => {
  const context = useContext(PerfilContext);
  if (!context) {
    throw new Error("usePerfil debe usarse dentro de un PerfilProvider");
  }
  return context;
};
