import IconButton from '@mui/material/IconButton';
import style from './listaProductos.module.css';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useState } from 'react';
import ZoomBoton from '../transitions/buttomzoom';
import ModificarProducto from '../../pages/producto/modificarProducto';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProductoGet } from '../../pages/producto/interfazProducto';
import { useProductos } from '../../contexts/ProductoContext';
import HistoryIcon from '@mui/icons-material/History';
import { styled } from "@mui/material/styles";
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import InfoProducto from './infoProducto';
import Zoom from 'react-medium-image-zoom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModalMovimientoStock from '../modalMovimientoStock/modalMovimientoStock';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


interface Props extends ProductoGet {
   // Añadir aquí cualquier otra propiedad necesaria
}

const CardProducto: React.FC<Props> = (props) => {
  const { eliminarProducto, obtenerHistorial, loading, historial } = useProductos();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openHistorial, setOpenHistorial] = useState(false);
  const [openMovimiento, setOpenMovimiento] = useState(false);
  const [infoProductoOpen, setInfoProductoOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<ProductoGet | null>(null);
  const [atributos] = useState<('categoria' | 'marca' | 'talle')[]>(['categoria', 'marca', 'talle']);
  const [confEliminar, setEliminar] = useState(false)



  const modalProducto = () => {
    setDialogOpen(!isDialogOpen);
  };

  const modalMovimiento = () => {
    setOpenMovimiento(!openMovimiento);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleHistorial =(id:any)=>{
    id= String(id)
    obtenerHistorial(id)
    setOpenHistorial(true)
}
const confirmarElminacion= (producto: ProductoGet) =>{
  eliminarProducto(producto);
}
  const eliminar = (conf:boolean ) => {
    setEliminar(conf)
    
  };

  const formatearPrecio = (precio: number): string => {
    return precio.toLocaleString('es-ES');
  };

  const formatearFecha = (fechaISO: any) => {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  const fecha = formatearFecha(props.fechaCreacion);

  const closeHistorial=()=>{
    setOpenHistorial(false)
}



  const abrirInfoProducto = (producto: ProductoGet) => {
    setProductoSeleccionado(producto);
    setInfoProductoOpen(true);
  };

  const cerrarInfoProducto = () => {
    setInfoProductoOpen(false);
    setProductoSeleccionado(null);
  };

  const SmallIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.grey[600],
    "& svg": {
      fontSize: "1.3rem",
      padding: "0px",
      margin: "0px",
    },
  }));

  return (
    <>
      <List className={style.list}>
        <div className={style.contImg}>
        <Zoom>
          <img src={props.foto} alt="foto producto" className={style.img} />
        </Zoom>
        </div>
        <ListItem key={props.id}>
          <ListItemText
            className={style.item}
            primary={props.nombre}
            secondary={
              <>
                {fecha}<br />
                ${formatearPrecio(props.precio ?? 0)}
              </>
            }
          />
          <div className={style.contAtributos}>
            {atributos.map((item,idx)=>(
              <div className={style.contAtributoPart} key={idx}>
                  <div  className={style.atributos}>{props[item]}</div>
              </div>
              
            ))}
            
          </div>
          
          {/*CONDICION PARA QUE EL STOCK DE ALERTAS*/}
          <div className={`${style.stock} ${props.stockActual < props.stockMinimo ? style.redBorder : 
              props.stockActual < props.stockMedio ? style.yellowBorder : 
              style.greenBorder}`}>
            {props.stockActual}
        </div>

        {/*ICONOS*/}
        <ListItemIcon>
          <SmallIconButton onClick={() => abrirInfoProducto(props)}>
            <InfoIcon />
          </SmallIconButton>
        </ListItemIcon>

        <ListItemIcon>
          <SmallIconButton onClick={() => modalProducto()}>
            <EditIcon />
          </SmallIconButton>
        </ListItemIcon>

        <ListItemIcon>
        {!confEliminar ? 
          <SmallIconButton onClick={() => eliminar(true)}>
            <DeleteIcon />            
          </SmallIconButton>
          :
          <>
            <SmallIconButton onClick={() => confirmarElminacion(props)}>
              <CheckIcon style={{color: 'green'}}></CheckIcon>
            </SmallIconButton>
            
            <SmallIconButton onClick={()=> eliminar(false)} >
              <CloseIcon style={{color: 'red'}}></CloseIcon>
            </SmallIconButton>
            
          </>
          }
        </ListItemIcon>

        <ListItemIcon>
          <SmallIconButton onClick={() =>handleHistorial(props.id) }>
            <HistoryIcon /> 
          </SmallIconButton>
        </ListItemIcon>
          
        <ListItemIcon>
          <SmallIconButton onClick={()=> modalMovimiento()}>
            <AddCircleIcon /> 
          </SmallIconButton>
        </ListItemIcon>

        </ListItem>
      </List>

      {/* MODAL PARA EDITAR PRODUCTO */}
      <Dialog open={isDialogOpen} onClose={toggleMenu} fullWidth maxWidth="sm">
        <DialogContent>
          <ModificarProducto producto={props} />
        </DialogContent>
        <DialogActions>
          <Button onClick={modalProducto}>
            <ZoomBoton />
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal que muestra la información extra */}
      {productoSeleccionado && (
        <InfoProducto
          open={infoProductoOpen}
          producto={productoSeleccionado}
          onClose={cerrarInfoProducto}
        />
      )}


    {/* MODAL STOCK */}
    <Dialog open={openMovimiento} onClose={modalMovimiento} fullWidth maxWidth="sm">
        <DialogContent>
          <ModalMovimientoStock idProducto={props.id} img={props.foto}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={modalMovimiento}>
            <ZoomBoton />
          </Button>
        </DialogActions>
      </Dialog>
    
    


{/*MODAL HISTORIAL */}

{openHistorial && !loading ? (
  <Dialog open={openHistorial} onClose={() => closeHistorial()} fullWidth maxWidth="sm">
    <DialogContent>
      <div className={style.historial}>
        {/* Encabezado con el botón */}
        <div className={style.historialHeader}>
          <h1>HISTORIAL DE PRECIOS</h1>
        
        </div>

        {/* Contenido desplazable */}
        <div className={style.historialContent}>
          {(historial || []).map((item) => (
            <p className={style.renglon} key={item.id}>
              <strong className={style.probando} >{formatearFecha(item.fecha)}</strong>  -  ${formatearPrecio(item.precio)}
            </p>
          ))}
        </div>
      </div>
    </DialogContent>
    <DialogActions>
      <Button className={style.close} onClick={() => closeHistorial()}>Cerrar</Button>
    </DialogActions>
  </Dialog>
) : (
  ''
)}
</>
);
};

export default CardProducto;



