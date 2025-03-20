import React, { createContext, useContext, useState, ReactNode } from "react";
import { getHistorialCompras } from "../service/HistorialComprasService";
import 'react-toastify/dist/ReactToastify.css';

import Notificaciones from "../components/notificaciones";

// Definimos la estructura del historial de compras
export interface HistorialCompras {
    id?: string;
    fechaVenta: string;
    totalVenta: number;
    ventas: Array<{
        id: string;
        fechaVenta: string;
        totalVenta: number;
    }>;
}


// Definimos la interfaz para el contexto
export interface HistorialComprasContextType {
    fetchHistorialCompras: () => void;
    historialData: HistorialCompras[];
    loading: boolean;
    error: string | null;
}

// Creamos el contexto
const HistorialComprasContext = createContext<HistorialComprasContextType | undefined>(undefined);

interface HistorialComprasProviderProps {
    children: ReactNode;
}

// Definimos el Provider para manejar el estado
export const HistorialComprasProvider: React.FC<HistorialComprasProviderProps> = ({ children }) => {
    
    const [loading, setLoading] = useState<boolean>(false); // Estado de carga
    const [error, setError] = useState<string | null>(null); // Estado de error
    const [historialCompras, setHistorialCompras] = useState<Array<HistorialCompras>>([]);


    // Función para obtener el historial de compras
    const fetchHistorialCompras = async () => {
    
        const id = localStorage.getItem("idUser");
    
        if (!id) {
            setError("No se encontró el ID del usuario en localStorage");
            return;
        }
    
        setLoading(true);
        setError(null);
    
        try {
            const response = await getHistorialCompras(id); // Convertimos a número
            // Verificamos que la propiedad 'ventas' exista y sea un array
            if (response.data && Array.isArray(response.data.ventas)) {
                const data = response.data.ventas.map((compra: any) => {
                    // Verificamos que las propiedades realmente existan
                    const id = compra.id || 'Sin ID';
                    const fechaVenta = compra.fechaVenta || 'Fecha no disponible';
                    const totalVenta = compra.totalVenta || 0;
                    return { id, fechaVenta, totalVenta };
                });
                    setHistorialCompras(data); // Actualiza el estado con los datos de compras
            } else {
                Notificaciones.error("La respuesta no contiene un array válido en la propiedad 'ventas'.");
                console.log("Ventas no válidas o vacías:", response.data.ventas); // Log si no hay ventas o si no es un array
            }
        } catch (err: any) {
            Notificaciones.error("Error al cargar los datos de compras del usuario");
            console.error("Error:", err.response ? err.response.data : err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <HistorialComprasContext.Provider value={{ historialData: historialCompras, loading, error, fetchHistorialCompras }}>
            {children}
        </HistorialComprasContext.Provider>
    );
};

// Hook personalizado para consumir el contexto
export const useHistorialCompras = () => {
    const context = useContext(HistorialComprasContext);
    if (!context) {
        throw new Error("useHistorialCompras debe usarse dentro de un HistorialComprasProvider");
    }
    return context;
};
