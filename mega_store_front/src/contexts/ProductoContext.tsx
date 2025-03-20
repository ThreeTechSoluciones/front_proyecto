// Contexto para gestionar productos
import React, { createContext, ReactNode, useContext, useState } from "react";
import { getProductos, newProducto, putProducto, deleteProducto, getProductoEspecifico, getHitorial, getProductosPaginacion } from "../service/ProductoService"; // Asegúrate de ajustar la ruta si es necesario

import { Producto, ProductoGet } from "../pages/producto/interfazProducto";
import Notificaciones from "../components/notificaciones";

interface ProductoContextType {
    fetchProductos: (page: number, size: number, sort: string) => void;
    fetchProductosAll: () => void;
    postProducto: (producto: FormData) => void;
    modificarProducto:(producto:Producto)=>void;
    eliminarProducto:(producto:ProductoGet)=>void;
    fetchProductoEspe:(id: string)=>void;
    obtenerHistorial:(id: string)=>void;
    setProductosFiltradosAdmin: (p:ProductoGet[])=>void;
    productos: ProductoGet[];
    productosAll: ProductoGet[];
    productosFiltradosAdmin: ProductoGet[];
    loading: boolean;
    error: string | null;
    producto?: ProductoGet;
    historial:any[];
    goToPage: (page: number) => void;
    totalPages:number;
    currentPage:number;
    actualizarProducEspecifico:() => void;
    cambioProducto: boolean;
    filtrarProductosPorNombre: (termino: string) => void; 
    productosFiltradosUser: ProductoGet[];

}


//funcion que reciba un string para comparar con los productos existentes

//almacenar en una const productosFiltrados 


// Crear el contexto
const ProductosContext =  createContext<ProductoContextType | undefined>(undefined);

interface ProductoProviderProps {
    children: ReactNode;
}
// Proveedor del contexto

export const ProductoProvider: React.FC<ProductoProviderProps> = ({ children }) => {
    const [productos, setProductos] = useState<ProductoGet[]>([]);
    const [productosAll, setProductosAll] = useState<ProductoGet[]>([]);
    const [productosFiltradosAdmin, setProductosFiltradosAdmin] = useState<ProductoGet[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0); // Para almacenar el número total de páginas
    const [currentPage, setCurrentPage] = useState<number>(0); // Para llevar la página actual
    
    const [producto, setProducto] = useState<ProductoGet>();
    const [loading, setLoading] = useState<boolean>(false);
    const [historial, setHistorial] = useState([])
    const [error, setError] = useState(null);

    const [cambioProducto, setCambioProducto] =useState(false) //Variable para volver a llamar al fecht en producto especifico


    const [productosFiltradosUser, setProductosFiltradosUser] = useState<ProductoGet[]>([]); 

  
  
//GET

    const fetchProductos = async  (page = currentPage, size :number, sort = "id,asc") => {
      setLoading(true);
      try {
          const response = await getProductosPaginacion(page, size, sort);
          setProductos(response.data.content); 
          console.log('contex', response)
          setTotalPages(response.data.totalPages);  // Suponiendo que la API devuelve esta propiedad

          } catch (err: any) {
              
              console.error(err);
          } finally {
              setLoading(false);
          }
      };

      //GET ALL
    const fetchProductosAll = async  () => {
      setLoading(true);
      try {
          const response = await getProductos();
          setProductosAll(response.data); 
          // console.log('contex', response)

          } catch (err: any) {
              
              console.error(err);
          } finally {
              setLoading(false);
          }
      };
  
  // Función para cambiar de página
  const goToPage = (page: number) => {
      setCurrentPage(page);
      fetchProductos(page, 12);
  };


//GET ESPECIFICO
    const fetchProductoEspe = async (id: string) => {

      setLoading(true);
      setError(null); // Limpiamos el error antes de la llamada
      try {
          const response = await getProductoEspecifico(id);
          setProducto(response.data); 
          console.log(producto)

      } catch (err: any) {
          console.error(err);
      } finally {
          setLoading(false);
      }
    };

    
//POST
    const postProducto = async (producto: FormData) => {
        try{
            setLoading(true)
            const response = await newProducto(producto) //post
            Notificaciones.exito(`Prodcuto ${response.data.nombre} registrado`) //mensaje
            await fetchProductos(0,12,"id,asc"); //Recargamos las sucursales
        
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
  const modificarProducto = async (producto: Producto) => {
    try{
        setLoading(true)
        const response = await putProducto(producto) //post
        Notificaciones.exito(`Producto ${response.data.nombre} modificado`) //mensaje
        await fetchProductos(0,12,"id,asc"); //Recargamos las sucursales
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

  //DELETE
  const eliminarProducto = async (objeto: ProductoGet) => {
    try {
         
          const id = String(objeto.id)
          console.log(objeto.id)
          const respuesta = await deleteProducto(id);
          if (respuesta.status !== 200) {
            throw new Error(`Error al eliminar el producto. Status: ${respuesta.status}`);
        }
          console.log("producto eliminado"); 
          fetchProductos(0,12,"id,asc");
          Notificaciones.exito('Producto eliminado con exito')
        } catch (error) {
          console.error('Error al eliminar el Producto:', error);
        }
    } 
    //GET HISTORIAL
    const obtenerHistorial = async (id: string) => {

      setLoading(true);
      setError(null); // Limpiamos el error antes de la llamada
      try {
          const response = await getHitorial(id);
          setHistorial(response.data); 

      } catch (err: any) {
          console.error(err);
      } finally {
          setLoading(false);
      }
    };

    const actualizarProducEspecifico = ()=>{
      setCambioProducto(!cambioProducto)
    }


    const filtrarProductosPorNombre = async (termino: string) => {
      setLoading(true); // Activamos el estado de carga
  
      try {
          // Obtener todos los productos
          await fetchProductosAll();  
  
          // Filtrar los productos si hay un término de búsqueda
          if (!termino.trim()) {
              setProductosFiltradosUser([]); // Si el término está vacío, se limpia la lista
          } else {
              const productosFiltrados = productosAll.filter(producto =>
                  producto.nombre.toLowerCase().includes(termino.toLowerCase()) // Comparación sin distinción de mayúsculas/minúsculas
              );
              console.log(productosFiltrados)
              setProductosFiltradosUser(productosFiltrados); // Guardamos los productos filtrados
          }
  
      } catch (err) {
          console.error("Error al filtrar productos:", err);
      } finally {
          setLoading(false); // Desactivamos el estado de carga
      }
  };

    return (
    <ProductosContext.Provider
      value={{
        productos,
        productosAll,
        loading,
        error,
        producto,
        historial,
        fetchProductos,
        fetchProductosAll,
        postProducto,
        modificarProducto,
        eliminarProducto,
        fetchProductoEspe,
        obtenerHistorial,

        goToPage,
        totalPages,
        currentPage,
        actualizarProducEspecifico,
        cambioProducto,
        setProductosFiltradosAdmin,
        productosFiltradosUser,
        filtrarProductosPorNombre,
        productosFiltradosAdmin,

      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useProductos = (): ProductoContextType => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error("useProductos debe usarse dentro de un ProductoProvider");
  }
  return context;
};