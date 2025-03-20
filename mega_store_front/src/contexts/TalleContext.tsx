
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { newTalle, deleteTalle,getTalles,putTalle } from "../service/TalleService";
import Notificaciones from "../components/notificaciones";


export interface Talle {
    id?: number;
    nombre: string;
    fechaDeEliminacion?: string;       
}

interface TalleContextType {
    fetchTalles: () => void;
    postTalle: (dato: Talle) => void;
    actualizarTalle: (dato: Talle) => Promise<void>;
    eliminarTalle: (dato: Talle) => Promise<void>;
    talles: Talle[];
    loading: boolean;
    error: string | null;
}
//Interface para el PUT
export interface TallePayload {
    id: number; // Lo que espera el endpoint
    nombre: string;
  }

const TalleContext = createContext<TalleContextType | undefined>(undefined);
interface TalleProviderProps {
    children: ReactNode;
  }

// El Provider para manejar el estado 
export const TalleProvider: React.FC<TalleProviderProps> = ({ children }) => {

  const [talles, setTalles] = useState<Talle[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error


 //GET
  const fetchTalles= async () => {
    setLoading(true);
    setError(null); // Limpiamos el error antes de la llamada
    try {
      const response = await getTalles();
      setTalles(response.data); 

    } catch (err: any) {
      setError('Error al cargar los Talles'); 
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //POST
  const postTalle= async(dato: Talle)=>{
    
    try{
        setLoading(true)
        const response = await newTalle(dato) //post
        Notificaciones.exito(`Talle ${response.data.nombre} registrada`) //mensaje
        await fetchTalles(); //Recargamos 

    }catch(error:any){
        if (error) {
           Notificaciones.error(error.response?.data.errors)
            console.log(error.response?.data.errors);  // Accediendo a 'errors'
          } else {
            console.error("Error desconocido", error);
          }
    }finally{
        setLoading(false)
    }
  }

  //PUT
  const actualizarTalle = async (dato: Talle) => {
    const payload: TallePayload = {
      id: Number(dato.id), // Convertimos id a number si fuera string
      nombre: dato.nombre,
    };

    try {
      const response  = await putTalle(payload);
      if (response?.data?.id) {
        setTalles((prev) =>
          prev.map((m) => (m.id === response.data.id ? response.data : m))
      )
      console.log(`Talle ${response.data.nombre} actualizada`)

    } else {
      throw new Error('La respuesta del servidor no contiene los datos esperados');
    }
    }catch (error) {
      console.error('Error al actualizar el talle:', error);
    }
  };

  //DELETE
  const eliminarTalle = async (dato: Talle) => {
    try {
      const id = String(dato.id)
      const respuesta = await deleteTalle(id);
      console.log(respuesta.data); 
      fetchTalles();
    } catch (error) {
      console.error('Error al eliminar el talle:', error);
    }
  };

  return (
    <TalleContext.Provider value={{ talles, loading, error, actualizarTalle, eliminarTalle,fetchTalles,postTalle }}>
      {children}
    </TalleContext.Provider> 
  );
};

// Hook personalizado para consumir el contexto
export const useTalle = () => {
  const context = useContext(TalleContext);
  if (!context) {
    throw new Error("useTalle debe usarse dentro de un TalleProvider");
  }
  return context;
};