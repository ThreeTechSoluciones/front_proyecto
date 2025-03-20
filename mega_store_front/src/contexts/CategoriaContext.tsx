
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { newCategoria, getCategorias, deleteCategoria, putCategoria } from "../service/CategoriaService";
import Notificaciones from "../components/notificaciones";


export interface Categoria {
    id?: number;
    nombre: string;
    fechaDeEliminacion?: string;       
}

interface CategoriaContextType {
    fetchCategorias: () => void;
    postCategoria: (dato: Categoria) => void;
    actualizarCategoria: (dato: Categoria) => Promise<void>;
    eliminarCategoria: (dato: Categoria) => Promise<void>;
    categorias: Categoria[];
    loading: boolean;
    error: string | null;
}
//Interface para el PUT
export interface CategoriaPayload {
    id: number; // Lo que espera el endpoint
    nombre: string;
  }

const CategoriaContext = createContext<CategoriaContextType | undefined>(undefined);
interface CategoriaProviderProps {
    children: ReactNode;
  }

// El Provider para manejar el estado 
export const CategoriaProvider: React.FC<CategoriaProviderProps> = ({ children }) => {

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error


 //GET
  const fetchCategorias= async () => {
    setLoading(true);
    setError(null); // Limpiamos el error antes de la llamada
    try {
      const response = await getCategorias();
      setCategorias(response.data); 

    } catch (err: any) {
      setError('Error al cargar los Categoria'); 
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //POST
  const postCategoria= async(dato: Categoria)=>{
    
    try{
        setLoading(true)
        const response = await newCategoria(dato) //post
       
        await fetchCategorias(); //Recargamos 
        Notificaciones.exito(`Categoria ${response.data.nombre} registrada`) //mensaje

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
  const actualizarCategoria= async (dato: Categoria) => {
    const payload: CategoriaPayload = {
      id: Number(dato.id), // Convertimos id a number si fuera string
      nombre: dato.nombre,
    };

    try {
      const response  = await putCategoria(payload);
      if (response?.data?.id) {
        setCategorias((prev) =>
          prev.map((m) => (m.id === response.data.id ? response.data : m))
      )
      console.log(`Categoria ${response.data.nombre} actualizada`)

    } else {
      throw new Error('La respuesta del servidor no contiene los datos esperados');
    }
    }catch (error) {
      console.error('Error al actualizar la Categoria:', error);
    }
  };

  //DELETE
  const eliminarCategoria = async (dato: Categoria) => {
    try {
      const id = String(dato.id)
      const respuesta = await deleteCategoria(id);
      console.log(respuesta.data); 
      fetchCategorias();
    } catch (error) {
      console.error('Error al eliminar la Categoria:', error);
    }
  };

  return (
    <CategoriaContext.Provider value={{categorias, loading, error, actualizarCategoria, eliminarCategoria,fetchCategorias,postCategoria }}>
      {children}
    </CategoriaContext.Provider> 
  );
};

// Hook personalizado para consumir el contexto
export const useCategoria = () => {
  const context = useContext(CategoriaContext);
  if (!context) {
    throw new Error("useCategoria debe usarse dentro de un CategoriaProvider");
  }
  return context;
};