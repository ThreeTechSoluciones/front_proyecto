import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getEstadisticasFrecVenta, getEstadisticasProductos, getEstadisticasVentas, getEstadisticasPromVentas} from "../service/EstadisticasService";

// Definimos los datos que esperamos recibir
export interface EstadisticasVentas {
    fecha:string;
    total_ventas: number;
    total_monto: number;
}

export interface EstadisticasProductos{
    producto: string;
    cantidad_vendida: number;

    
}

export interface EstadisticasFrecVentas{
  clientes:number;
  rango_dias:string;
}

export interface EstadisticasPromVentas{
  clientes:number;
  rango_montos:string;
}

// Definimos todo lo que el contexto proporciona
export interface EstadisticasVentasContextType {
  ventasData: EstadisticasVentas[]; // Datos de las estadísticas
  productosData: EstadisticasProductos[];
  frecuenciaData: EstadisticasFrecVentas[];
  promedioData: EstadisticasPromVentas[];
  loading: boolean;
  error: string | null;
  fetchVentas: (fechaDesde: string, fechaHasta: string, frecuencia: string) => Promise<void>; // Función para llamar al back
  fetchProductos: (fechaDesde: string, fechaHasta: string) => Promise<void>; // Función para llamar al back
  fetchFrecVentas: () => void;
  fetchPromVentas:()=>void;
}

const EstadisticasContext = createContext<EstadisticasVentasContextType | undefined>(undefined);

interface EstadisticasProviderProps {
  children: ReactNode;
}

// El Provider para manejar el estado
export const EstadisticasProvider: React.FC<EstadisticasProviderProps> = ({ children }) => {
  const [estadisticasVentas, setEstadisticasVentas] = useState<EstadisticasVentas[]>([]); // Datos de ventas
  const [estadisticasProductos, setEstadisticasProductos] = useState<EstadisticasProductos[]>([]); // Datos de produtcos
  const [estadisticasFrecVentas, setEstadisticasFrecVenta]=useState<EstadisticasFrecVentas[]>([]); //Datos de frecuencia de venta
  const [estadisticasPromVentas, setEstadisticasPromVentas]=useState<EstadisticasPromVentas[]>([]); //Datos de frecuencia de venta
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

 // GET ESTADISTICAS VENTAS
const fetchVentas = async (fechaDesde: string, fechaHasta: string, frecuencia: string) => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await getEstadisticasVentas(fechaDesde, fechaHasta, frecuencia);
      
      // Verificamos la respuesta que se recibe del backend
      //console.log("Datos recibidos del back:", response); // Muestra la respuesta completa
      // Si la respuesta tiene 'data' y dentro de 'data' hay un array
    if (response && response.data && Array.isArray(response.data)) {
        // Asignamos los datos al estado
        setEstadisticasVentas(response.data);
        //console.log("Ventas Data después de actualizar estado:", response.data);
      } else {
        // Si la respuesta no tiene la estructura esperada, asignamos un array vacío
        setEstadisticasVentas([]);
        //console.log("La respuesta no tiene la estructura esperada.");
      }
    } catch (err: any) {
      // Manejo de errores
      setError("Hubo un problema al cargar las estadísticas.");
    } finally {
      // Finaliza el estado de carga
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("Ventas data actualizadas:", estadisticasVentas);
    // Aquí puedes hacer más cosas, como llamar a otra función si los datos cambian
  }, [estadisticasVentas]); // Este useEffect se ejecuta cada vez que 'estadisticasVentas' cambie

  //GET ESTADÍSTICAS PRODUCTOS

  const fetchProductos = async (fechaDesde: string, fechaHasta: string) => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await getEstadisticasProductos(fechaDesde, fechaHasta);
      
      // Verificamos la respuesta que se recibe del backend
      console.log("Datos recibidos del back producto:", response); // Muestra la respuesta completa
      // Si la respuesta tiene 'data' y dentro de 'data' hay un array
    if (response && response.data && Array.isArray(response.data)) {
        // Asignamos los datos al estado
        setEstadisticasProductos(response.data);
        //console.log("Productos Data después de actualizar estado:", response.data);
      } else {
        // Si la respuesta no tiene la estructura esperada, asignamos un array vacío
        setEstadisticasProductos([]);
        console.log("La respuesta no tiene la estructura esperada.");
      }
    } catch (err: any) {
      // Manejo de errores
      setError("Hubo un problema al cargar las estadísticas.");
    } finally {
      // Finaliza el estado de carga
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("Productos data actualizadas:", estadisticasProductos);
    // Aquí puedes hacer más cosas, como llamar a otra función si los datos cambian
  }, [estadisticasProductos]); // Este useEffect se ejecuta cada vez que 'estadisticasVentas' cambie

  //GET ESTADISTICAS FRECUENCIA DE VENTA
  const fetchFrecVentas = async() => {
    console.log("entra por dos")
    setLoading(true);
    setError(null);
  
    try {
      const response = await getEstadisticasFrecVenta();
      
      // Verificamos la respuesta que se recibe del backend
      console.log("Datos recibidos del back frec ventas:", response); // Muestra la respuesta completa
      // Si la respuesta tiene 'data' y dentro de 'data' hay un array
      if (response && response.data) {
        // Asignamos los datos al estado
        setEstadisticasFrecVenta(response.data);
        console.log("Frec data después de actualizar estado:", response.data);
      } else {
        // Si la respuesta no tiene la estructura esperada, asignamos un array vacío
        setEstadisticasFrecVenta([]);
        console.log("La respuesta no tiene la estructura esperada.");
      }
    } catch (err: any) {
      // Manejo de errores
      setError("Hubo un problema al cargar las estadísticas.");
    } finally {
      // Finaliza el estado de carga
      setLoading(false);
    }
  };

  //GET ESTADISTICAS CLIENTES PROM VENTAS
  const fetchPromVentas = async() => {
    
    setLoading(true);
    setError(null);
  
    try {
      const response = await getEstadisticasPromVentas();
      
      // Verificamos la respuesta que se recibe del backend
      console.log("Datos recibidos del back frec ventas:", response); // Muestra la respuesta completa
      // Si la respuesta tiene 'data' y dentro de 'data' hay un array
      if (response && response.data) {
        // Asignamos los datos al estado
        setEstadisticasPromVentas(response.data);
        console.log("Frec data después de actualizar estado:", response.data);
      } else {
        // Si la respuesta no tiene la estructura esperada, asignamos un array vacío
        setEstadisticasPromVentas([]);
        console.log("La respuesta no tiene la estructura esperada.");
      }
    } catch (err: any) {
      // Manejo de errores
      setError("Hubo un problema al cargar las estadísticas.");
    } finally {
      // Finaliza el estado de carga
      setLoading(false);
    }
  };


  return (
    <EstadisticasContext.Provider value={{ ventasData: estadisticasVentas, loading, error, fetchVentas, productosData: estadisticasProductos, fetchProductos, fetchFrecVentas, frecuenciaData: estadisticasFrecVentas, promedioData: estadisticasPromVentas, fetchPromVentas}}>
      {children}
    </EstadisticasContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useEstadisticas = () => {
  const context = useContext(EstadisticasContext);
  if (!context) {
    throw new Error("useEstadisticas debe usarse dentro de un EstadisticasProvider");
  }
  return context;
};