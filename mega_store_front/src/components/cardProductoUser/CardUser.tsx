import style from './CardUser.module.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCarrito } from '../../contexts/CarritoContext.tsx';
import { ProductoGet } from '../../pages/producto/interfazProducto.tsx';
import { useNavigate } from "react-router-dom";

const CardUser: React.FC<ProductoGet> = (props) => {
        const { agregarAlCarrito } = useCarrito(); // Obtén la función para agregar al carrito
        const navigate = useNavigate()
        
        // Función para manejar el click en el carrito
        const handleAgregarAlCarrito = () => {
            agregarAlCarrito({
                id: props.id, // Genera un ID único para el producto
                nombre: props.nombre,
                precio: props.precio || 0,
                cantidad: 1,
                imagen: props.foto ||'',
                stockActual:props.stockActual,
            });
        };

        const openProducto = (producto: ProductoGet) => {
            navigate(`/appsRami/productoEspecifico/${producto.id}`);
        };

        const formatearPrecio = (precio: number): string => {
            return precio.toLocaleString('es-ES');
        };

    return(
        <div className={style.contGeneral} onClick={() => openProducto(props)}>

            <p className={style.title}>{props.nombre}</p>

            <div className={style.contImg}>
                <img src={props.foto} alt="Remera Negra" className={style.imgProducto} />
            </div>
            
            <div className={style.contDescripcion}>
                <span className={style.descripcion}> {props.descripcion}</span>         
                <p className={style.precio}>${formatearPrecio(props.precio || 0)}</p>   
            </div>
            
            <div className={style.contCarrito}  
                    onClick={(e) => {
                    e.stopPropagation(); // Detiene la propagación del evento
                    handleAgregarAlCarrito();}}>
                        
                <ShoppingCartIcon className={style.carritoIcon} />
            </div>
        </div>
    ) 
};
export default CardUser 