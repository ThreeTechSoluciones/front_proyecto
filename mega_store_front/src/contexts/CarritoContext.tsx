import React, { createContext, useContext, useEffect, useState } from 'react';

import Notificaciones from '../components/notificaciones';

//producto que se va a añadir en el carrito
type Producto = {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
    imagen:string;
    stockActual:number;
};

const CarritoContext = createContext<{
    carrito: Producto[];
    agregarAlCarrito: (producto: Producto) => void;
    eliminarDeCarrito: (id: number) => void;
    cambioDeCantidad: (id: number, cantidad:number) => void;
    total: number;
    productosTotales: number;
    LimpiarCarrito: ()=>void;
} | null>(null);

//Proveedor del contexto
export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [carrito, setCarrito] = useState<Producto[]>([]);
    const [total, setTotal]= useState(0)
    const [productosTotales, setProductosTotales]= useState(0)
    
    //limpiar Carrito
    const LimpiarCarrito = () =>{
        setCarrito([])
        setTotal(0);     // Si también necesitas reiniciar el total
        setProductosTotales(0); 
    }
    //Función para agregar un producto al carrito
    const agregarAlCarrito = (producto: Producto) => {
        setCarrito((prev) => {
            const existe = prev.find((item) => item.id === producto.id);
            if (existe) {
                //Si ya está en el carrito, incrementa la cantidad
                Notificaciones.info(`Se añadió una unidad más de ${producto.nombre} al carrito.`);
                return prev.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
                
            }
            // Si no está, agrégalo
            Notificaciones.info(`${producto.nombre} ha sido agregado al carrito.`);
            
            return [...prev, { ...producto, cantidad: 1 }];
        });
    };
    const eliminarDeCarrito = (id:number)=>{

        setCarrito((prev) => {
            
            // Filtra los productos para excluir el producto con el ID dado
            return prev.filter((item) => item.id !== id);
        });

    }
    const cambioDeCantidad = (id:number, cantidad:number)=>{
        const productoIndex = carrito.findIndex((producto) => producto.id === id);
        if (productoIndex !== -1) {
            // Producto encontrado, se actualiza la cantidad
            carrito[productoIndex].cantidad = cantidad;
            console.log(carrito);
            calcularTotal(carrito);
            calcularProductos(carrito);
          } else {
            console.log(`Producto con ID ${id} no encontrado`);
          }
    }

    const calcularTotal = (carrito: { cantidad: number, precio: number }[]): void => {
        const totalFinal = carrito.reduce((total, producto) => total + (producto.cantidad * producto.precio), 0);
        setTotal(totalFinal)
    };

    const calcularProductos = (carrito: { cantidad: number }[]): void => {
        const productosT = carrito.reduce((productosTotales, producto) => productosTotales+ (producto.cantidad), 0);
        setProductosTotales(productosT)
    };

    useEffect(()=>{
        calcularTotal(carrito);
        calcularProductos(carrito);
    },[carrito])
    
    

    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDeCarrito,cambioDeCantidad, total, productosTotales ,LimpiarCarrito}}>
            {children}
        </CarritoContext.Provider>
    );
};

// Hook para usar el carrito desde cualquier componente
export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
    }
    return context;
};