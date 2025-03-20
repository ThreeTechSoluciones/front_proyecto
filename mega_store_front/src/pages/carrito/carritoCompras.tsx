import { useCarrito } from '../../contexts/CarritoContext.tsx';
import style from './carritoCompras.module.css';
import BasicSelect from './Cantidad.tsx';
import { useEffect, useState } from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import { useVenta } from '../../contexts/VentaContext.tsx';
import SeleccionFormaPago from '../../components/seleccionFormaPago/seleccionFormaPago.tsx';


const CarritoCompras = () => { // Usar el contexto para acceder al carrito

const { carrito, eliminarDeCarrito, total, productosTotales} = useCarrito();
const {registrarVenta} = useVenta()

const [carritoVacio, setCarritoVacio] = useState(false);

const navigate = useNavigate(); // Hook para navegar a otras rutas
    
const handleNavigation = () => {
    navigate('/home'); // Navegar a la ruta especificada
};

useEffect(() => {
    if (carrito.length === 0) {
        setCarritoVacio(true);
    } else {
        setCarritoVacio(false);
    }
}, [carrito]);

const eliminar = (id: number) => {
    eliminarDeCarrito(id);
};

const formatearPrecio = (precio: number): string => {
    return precio.toLocaleString('es-ES');
};

const [hovered, setHovered] = useState(false);

const venta = () => {
    // Crea el array de productos con idProducto y cantidad
    const productos = carrito.map(item => ({
        idProducto: item.id,
        cantidad: item.cantidad
    }));

    // Crea el objeto con la clave "detalles" que contiene el array de productos
    const ventaData = {
        detalles: productos
    };

    // Imprime para verificar la estructura
    console.log('ventaData', ventaData);

    // Llama a la función que registra la venta con el formato correcto
    registrarVenta(ventaData);

    // Redirige al pago
    navigate('/appsRami/mercadoPago');
}
return (
    <div className={style.contGeneral}>
        <h1 className={style.title}>TU CARRITO</h1>
        {/*Si el carrito no tiene productos*/}
        {carritoVacio ?(
            <div>
                <p className={style.vacio}>Actualmente no hay productos en tu carrito <SentimentVeryDissatisfiedIcon /></p>
                <p>¡Te invitamos a visitar nuestro <a className={style.link} onClick={handleNavigation}>catálogo</a>!</p>
            </div>
        ) : (

        carrito.map((producto) => (
            <div className={style.contProducto} key={producto.id}>
                <div className={style.contImg}>
                    <img src={producto.imagen} alt="foto producto" />
                </div>
                <BasicSelect cantidad={producto.cantidad} stockActual={producto.stockActual} idProducto={producto.id} />
                <p className={style.text}>{producto.nombre}</p>
                <p className={style.text}>${formatearPrecio(producto.precio)}</p>
                <button className={style.botonDelete} onClick={() => eliminar(producto.id)}> <DeleteForeverIcon /></button>
            </div>
            ))
        )}
        
        <div className={style.total}>
            <div className={style.resumen}>
                <p>TOTAL</p>
                <p>{productosTotales} Productos</p>
                <p>${formatearPrecio(total)}</p>
            </div>
        </div>

        {/*Si el carrito tiene productos*/}
        {!carritoVacio && (
            <>
            <div>
                <SeleccionFormaPago></SeleccionFormaPago>
            </div>
            <button className={style.button} onClick={()=>venta()} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} >
                {hovered ? "INICIAR COMPRA" : <AttachMoneyIcon />}
            </button>
            </>
            )}
    </div>
);
};

export default CarritoCompras;
