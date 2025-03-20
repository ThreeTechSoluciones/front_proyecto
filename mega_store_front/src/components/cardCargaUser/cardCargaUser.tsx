import style from './cardCargaUser.module.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const CardCarga = () => {
        

    return(
        <div className={style.contGeneral}>

            <p className={style.title}>nombreee</p>

            <div className={style.contImg}>
            {/* <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <CircularProgress color="secondary" />
            </Stack> */}
            </div>
            
            <div className={style.contDescripcion}>
                <span className={style.descripcion}> descripcion</span>         
                <p className={style.precio}>$prrecio</p>   
            </div>
            
            <div className={style.contCarrito}>                
                <ShoppingCartIcon className={style.carritoIcon} />
            </div>
        </div>
    ) 
};
export default CardCarga