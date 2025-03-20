import React, { createContext, useState, useContext, ReactNode } from 'react';
import { deleteSucursal, getSucursales, newSucursal, putSucursal } from '../service/SucursalesService';

import Notificaciones from '../components/notificaciones';

export interface Sucursal {
    id?: number;
    nombre: string;
    fechaDeEliminacion?: string;   
    idProducto?: number;
    cantidad?: number;    
  }

interface SucursalContextType {
    fetchSucursales: () => void;
    postSucursal: (sucursal:Sucursal) => void;
    actualizarSucursal: (sucursal: Sucursal) => Promise<void>;
    eliminarSucursal: (sucursal: Sucursal) => Promise<void>;
    sucursales: Sucursal[];
    loading: boolean;
    error: string | null;
}
//Interface para el PUT
export interface SucursalPayload {
    id: number; // Lo que espera el endpoint
    nombre: string;
  }

const SucursalContext = createContext<SucursalContextType | undefined>(undefined);
interface SucursalProviderProps {
    children: ReactNode;
  }

// El Provider para manejar el estado de las sucursales
export const SucursalProvider: React.FC<SucursalProviderProps> = ({ children }) => {

  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error
  

 //GET
  const fetchSucursales= async () => {
    setLoading(true);
    setError(null); // Limpiamos el error antes de la llamada
    try {
      const response = await getSucursales();
      setSucursales(response.data); 

    } catch (err: any) {
      setError('Error al cargar las Sucursales'); 
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //POST
  const postSucursal= async(sucursal:Sucursal)=>{
    try{
        setLoading(true)
        const response = await newSucursal(sucursal) //post
        Notificaciones.exito(`Sucursal ${response.data.nombre} registrada`) //mensaje
        await fetchSucursales(); //Recargamos las sucursales

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
  const actualizarSucursal = async (sucursal:Sucursal) => {
    const payload: SucursalPayload = {
      id: Number(sucursal.id), // Convertimos id a number si fuera string
      nombre: sucursal.nombre,
    };

    try {
      const response  = await putSucursal(payload);
      if (response?.data?.id) {
        setSucursales((prev) =>
          prev.map((m) => (m.id === response.data.id ? response.data : m))
      )
      console.log(`Sucursal ${response.data.nombre} actualizada`)

    } else {
      throw new Error('La respuesta del servidor no contiene los datos esperados');
    }
    }catch (error) {
      console.error('Error al actualizar la sucursal:', error);
    }
  };

  //DELETE
  const eliminarSucursal = async (sucursal: Sucursal) => {
    try {
      const id = String(sucursal.id)
      const respuesta = await deleteSucursal(id);
      console.log(respuesta.data); 
      fetchSucursales();
    } catch (error) {
      console.error('Error al eliminar la Sucursal:', error);
    }
  };

  return (
    <SucursalContext.Provider value={{ sucursales, loading, error, actualizarSucursal, eliminarSucursal,fetchSucursales,postSucursal }}>
      {children}
    </SucursalContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useSucursales = () => {
  const context = useContext(SucursalContext);
  if (!context) {
    throw new Error("useSucursales debe usarse dentro de un SucursalProvider");
  }
  return context;
};