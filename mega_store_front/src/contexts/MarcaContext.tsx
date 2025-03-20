import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getMarcas, newMarca, putMarca, deleteMarca } from '../service/MarcaService'; // Importamos el servicio

import Notificaciones from '../components/notificaciones';


export interface Marca {
  id?: number;
  nombre: string;
  fechaDeEliminacion?: string;       
}

interface MarcaContextType {
    fetchMarcas: () => void;
    postMarca: (marca:Marca) => void;
    actualizarMarca: (marca: Marca) => Promise<void>;
    eliminarMarca: (marca: Marca) => Promise<void>;
    marcas: Marca[];
    loading: boolean;
    error: string | null;
}

//Interface para el PUT
export interface MarcaPayload {
  id: number; // Lo que espera el endpoint
  nombre: string;
}
const MarcaContext = createContext<MarcaContextType | undefined>(undefined);

interface MarcaProviderProps {
  children: ReactNode;
}

export const MarcaProvider: React.FC<MarcaProviderProps> = ({ children }) => {
  const [marcas, setMarcas] = useState<Marca[]>([]); // Estado para almacenar las marcas
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error
 

  //GET
  const fetchMarcas = async () => {
    setLoading(true);
    setError(null); // Limpiamos el error antes de la llamada
    try {
      const response = await getMarcas();
      setMarcas(response.data); 

    } catch (err: any) {
      setError('Error al cargar las marcas'); 
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarcas(); // Cargamos las marcas cuando el componente se monta
  }, []);

  //POST
  const postMarca= async(marca:Marca)=>{
    try{
        setLoading(true)
        const response = await newMarca(marca) //post
        Notificaciones.exito(`Marca ${response.data.nombre} registrada con éxito`); //mensaje
        await fetchMarcas(); //Recargamos las marcas
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

  //PUT
  const actualizarMarca = async (marca: Marca) => {
    const payload: MarcaPayload = {
      id: Number(marca.id), // Convertimos id a number si fuera string
      nombre: marca.nombre,
    };

    try {
      const response  = await putMarca(payload);
      if (response?.data?.id) {
        setMarcas((prev) =>
          prev.map((m) => (m.id === response.data.id ? response.data : m))
      )
      console.log(`Marca ${response.data.nombre} actualizada`)

    } else {
      throw new Error('La respuesta del servidor no contiene los datos esperados');
    }
    }catch (error) {
      console.error('Error al actualizar la marca:', error);
    }
  };

  //DELETE
  const eliminarMarca = async (marca: Marca) => {
    try {
      const id = String(marca.id)
      const respuesta = await deleteMarca(id);
      console.log(respuesta.data); 
      fetchMarcas();
    } catch (error) {
      console.error('Error al eliminar la marca:', error);
    }
  };

  return (
    <MarcaContext.Provider value={{ marcas, fetchMarcas, loading, error, postMarca, actualizarMarca, eliminarMarca }}>
      {children}
    </MarcaContext.Provider>
  );
};

// Hook para usar el contexto de marcas en otros componentes
export const useMarca = () => {
  const context = React.useContext(MarcaContext);
  if (!context) {
    throw new Error("useMarca debe ser usado dentro de un MarcaProvider");
  }
  return context;
};