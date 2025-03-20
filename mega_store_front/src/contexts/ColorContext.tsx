
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { getColores, newColor, putColor, deleteColor } from "../service/ColorService";
import Notificaciones from "../components/notificaciones";

export interface Color {
    id?: number;
    nombre: string;
    fechaDeEliminacion?: string;       
  }

  interface ColorContextType {
    fetchColores: () => void;
    postColor: (color: Color) => void;
    actualizarColor: (color: Color) => Promise<void>;
    eliminarColor: (color: Color) => Promise<void>;
    colores: Color[];
    loading: boolean;
    error: string | null;
}
//Interface para el PUT
export interface ColorPayload {
    id: number; // Lo que espera el endpoint
    nombre: string;
  }

const ColorContext = createContext<ColorContextType | undefined>(undefined);
interface ColorProviderProps {
    children: ReactNode;
  }

// El Provider para manejar el estado 
export const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {

  const [colores, setColores] = useState<Color[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error
  

 //GET
  const fetchColores= async () => {
    setLoading(true);
    setError(null); // Limpiamos el error antes de la llamada
    try {
      const response = await getColores();
      setColores(response.data); 

    } catch (err: any) {
      setError('Error al cargar los Colores'); 
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //POST
  const postColor= async(dato: Color)=>{
    
    try{
        setLoading(true)
        const response = await newColor(dato) //post
        Notificaciones.exito(`Color ${response.data.nombre} registrada`) //mensaje
        await fetchColores(); //Recargamos las sucursales

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
  const actualizarColor = async (dato: Color) => {
    const payload: ColorPayload = {
      id: Number(dato.id), // Convertimos id a number si fuera string
      nombre: dato.nombre,
    };

    try {
      const response  = await putColor(payload);
      if (response?.data?.id) {
        setColores((prev) =>
          prev.map((m) => (m.id === response.data.id ? response.data : m))
      )
      console.log(`Color ${response.data.nombre} actualizada`)

    } else {
      throw new Error('La respuesta del servidor no contiene los datos esperados');
    }
    }catch (error) {
      console.error('Error al actualizar el color:', error);
    }
  };

  //DELETE
  const eliminarColor = async (dato: Color) => {
    try {
      const id = String(dato.id)
      const respuesta = await deleteColor(id);
      console.log(respuesta.data); 
      fetchColores();
    } catch (error) {
      console.error('Error al eliminar el color:', error);
    }
  };

  return (
    <ColorContext.Provider value={{ colores, loading, error, actualizarColor, eliminarColor,fetchColores,postColor }}>
      {children}
    </ColorContext.Provider> 
  );
};

// Hook personalizado para consumir el contexto
export const useColor = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColor debe usarse dentro de un ColorProvider");
  }
  return context;
};