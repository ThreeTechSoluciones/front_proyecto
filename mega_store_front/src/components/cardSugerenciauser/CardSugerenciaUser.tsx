import style from './CardSugerenciaUser.module.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCarrito } from '../../contexts/CarritoContext.tsx';
import { ProductoGet } from '../../pages/producto/interfazProducto.tsx';
import { useNavigate } from "react-router-dom";
import { useProductos } from '../../contexts/ProductoContext.tsx';

const CardSugerenciaUser: React.FC<ProductoGet> = (props) => {
        const { agregarAlCarrito } = useCarrito(); // Obtén la función para agregar al carrito
        const navigate = useNavigate()
        const {actualizarProducEspecifico} = useProductos()
        
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

        const openProducto = (id:number) => {
            navigate(`/appsRami/productoEspecifico/${id}`);
            actualizarProducEspecifico()
        };

        const formatearPrecio = (precio: number): string => {
            return precio.toLocaleString('es-ES');
        };

    return(
        <div className={style.contGeneral} onClick={() => openProducto(props.id)}>

            <p className={style.title}>{props.nombre} <br /> ${formatearPrecio(props.precio || 0)}</p>  
                        
            <div className={style.contCarrito}  
                    onClick={(e) => {
                    e.stopPropagation(); // Detiene la propagación del evento
                    handleAgregarAlCarrito();}}>
                        
                <ShoppingCartIcon className={style.carritoIcon} />
            </div>

            <div className={style.contImg}>
                <img src={props.foto} alt="Remera Negra" className={style.imgProducto} />
            </div>
        </div>
    ) 
};
export default CardSugerenciaUser