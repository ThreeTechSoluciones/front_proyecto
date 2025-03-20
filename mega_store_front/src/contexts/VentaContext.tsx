
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { postVenta } from "../service/VentaService";
import Notificaciones from "../components/notificaciones"
import { useCarrito } from "./CarritoContext";

interface VentaContextType {
    loading: boolean;
    error: string | null;
    registrarVenta: (productos:any) => void;
}


const VentaContext = createContext<VentaContextType | undefined>(undefined);
interface VentaProviderProps {
    children: ReactNode;
  }

// El Provider para manejar el estado 
export const VentaProvider: React.FC<VentaProviderProps> = ({ children }) => {

  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error] = useState<string | null>(null); // Estado de error
 
  const {LimpiarCarrito} = useCarrito()


  //POST
  const registrarVenta= async(productos: any)=>{
    
    try{
        setLoading(true)
        await postVenta(productos) //post
        Notificaciones.exito(`Venta registrada`) //mensaje
        LimpiarCarrito()
        // await fetchTalles(); 

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

  return (
    <VentaContext.Provider value={{ loading, error, registrarVenta }}>
      {children}
    </VentaContext.Provider> 
  );
};

// Hook personalizado para consumir el contexto
export const useVenta = () => {
  const context = useContext(VentaContext);
  if (!context) {
    throw new Error("useVenta debe usarse dentro de un VentaProvider");
  }
  return context;
};