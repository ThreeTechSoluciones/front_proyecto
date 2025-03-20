
import { useProductos } from "../../contexts/ProductoContext"
import { useEffect } from "react"
import { useParams } from "react-router-dom";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import style from './ProductoEspecifico.module.css'
import { useCarrito } from "../../contexts/CarritoContext";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import CardSugerenciaUser from "../../components/cardSugerenciauser/CardSugerenciaUser";
import { useNavigate} from 'react-router-dom';


const ProductoEspecifico = () => {
    const { id } = useParams();
    const { agregarAlCarrito } = useCarrito();
    const {fetchProductoEspe, producto, loading, fetchProductos, productos, cambioProducto}= useProductos()
    const navigate = useNavigate();
   
   
    useEffect(()=>{
        fetchProductoEspe(String(id))
        fetchProductos(0,4,"id,asc")
        window.scrollTo(0, 0);
    },[cambioProducto])

    const formatearPrecio = (precio: number): string => {
      return precio.toLocaleString('es-ES');
  };

  
  // Función para manejar el click en el carrito
  const handleAgregarAlCarrito = () => {
    if (producto) {
      agregarAlCarrito({
          id: producto.id, 
          nombre: producto.nombre,
          precio: producto.precio || 0,
          cantidad: 1,
          imagen: producto.foto || '',
          stockActual: producto.stockActual,
      });
  }
}; 

  const handleHome=()=>{
    navigate('/home')
  }

  return (
    <div className={style.contGeneral}>

      <div className={style.contSuperior}>

      <div className={style.contIzq}>

          <div className={style.contImg}>
            {!loading ?<Zoom>
            <img className={style.contImg} src={producto?.foto} alt="foto"  />
          </Zoom> 
                :
                <Stack spacing={2} direction="row" alignItems="center">
                  <CircularProgress size="3rem" />
                </Stack>
            }
          </div>
        </div>

        <div className={style.contDer}>
          <h1 className={style.title}>{producto?.nombre}</h1>
          <h2 className={style.precio}>${formatearPrecio(producto?.precio || 0)}</h2>

            <div className={style.contDerSecundario}>
              <h2> {producto?.marca}</h2>
              <div className={style.contInfo}>
                <p className={style.probando} >Stock : {producto?.stockActual === 0 ? <strong>SIN STOCK</strong> : producto?.stockActual}</p>
                <p className={style.probando}>Talle : {producto?.talle} </p>
                <p className={style.probando}>Color : {producto?.color}</p>
              </div>
              

              <div className={style.contAcordeon}> 
                <Accordion sx={{ width: '60%' }}>
                  <AccordionSummary sx={{ width: '100%' }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography component="span">Descripción del producto</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ width: '100%' }}>
                    
                  <p className={style.probando}> {producto?.descripcion} </p>
                  </AccordionDetails>
                </Accordion>
                <Accordion sx={{ width: '60%' }}>
                  <AccordionSummary sx={{ width: '100%' }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography component="span">Medios de pago</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ width: '80%' }}>
                    Se acepta transferencia y efectivo con un 10% de descuento en el monto total
                  
                  </AccordionDetails>
                </Accordion>
            
              </div>
              {producto?.stockActual === 0 ?
                <button className={style.button} onClick={handleAgregarAlCarrito} disabled >AGREGAR A CARRITO </button>
                :
                <button className={style.button} onClick={handleAgregarAlCarrito} >AGREGAR A CARRITO</button>
              }
              

            </div>  
          </div>
      </div>
      
      
      <div className={style.contInferior}>
              <h1>Otros Productos</h1>
              <div className={style.contProductos}>
                  {(productos || []).map((producto) => (
                                    <CardSugerenciaUser key={producto.id}  {...producto}/>    
                ))}
              </div>
              <button className={style.botonMas} onClick={() => handleHome()}>Ver más</button>
           
      </div>

    </div>
  )
}

export default ProductoEspecifico

