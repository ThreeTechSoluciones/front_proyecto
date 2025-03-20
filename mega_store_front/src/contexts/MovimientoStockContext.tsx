import React, { createContext, useState,  ReactNode } from 'react';
import { PostMovimientoStock } from '../service/MovimientoStockService';
import Notificaciones from '../components/notificaciones';



interface MovimientoStockContextType {
    movimientoStock : (movimiento:any) => void;
    loading: boolean;
    error: string | null;
    OpenModal: (dato:boolean) => void;
    open: boolean
    idProducto: number | null;
}


const MovimientoStockContext = createContext<MovimientoStockContextType | undefined>(undefined);

interface MovimientoStockProviderProps {
  children: ReactNode;
}

export const MovimientoStockProvider: React.FC<MovimientoStockProviderProps> = ({ children }) => { // Estado para almacenar las marcas
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error] = useState<string | null>(null); // Estado de error
  const [open, setOpenModal] = useState<boolean>(false)
  const [idProducto] = useState<number | null>(null);
 

  //POST
  const movimientoStock= async(movimiento:any)=>{
    try{
        setLoading(true)
        const response = await PostMovimientoStock(movimiento) //post
        Notificaciones.exito(`Momiviento de stock registrado con éxito`); //mensaje
        console.log(response)
        
    }catch(error:any){
        if (error) {
          Notificaciones.error(error.response?.data.errors);
         
            console.log(error.response?.data.errors);  // Accediendo a 'errors'
          } else {
            console.error("Error desconocido", error);
          }
    }finally{
        setLoading(false)
    }
  }

  const OpenModal = (dato: boolean) => {
   
    setOpenModal(dato); // Cambia el estado del modal.
     // Verificar el ID en consola.
  };

 

  return (
    <MovimientoStockContext.Provider value={{ loading, error, movimientoStock, OpenModal, open, idProducto }}>
      {children}
    </MovimientoStockContext.Provider>
  );
};

// Hook para usar el contexto de marcas en otros componentes
export const useMovimientoStock = () => {
  const context = React.useContext(MovimientoStockContext);
  if (!context) {
    throw new Error("useMovimientoStock debe ser usado dentro de un MovimientoStockProvider");
  }
  return context;
};