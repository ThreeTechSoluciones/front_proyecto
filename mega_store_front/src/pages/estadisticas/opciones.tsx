import style from "./opciones.module.css";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FaceIcon from '@mui/icons-material/Face';
import { useNavigate } from 'react-router-dom';

const OpcionesEstadisticas: React.FC = () => {
const navigate = useNavigate(); // Hook para la navegación

const handleNavigate = (ruta: string) => {
    navigate(ruta); // Navegar a la ruta proporcionada
};

    return (
        <div className={style.container}>
            <button className={style.buttons} onClick={() => handleNavigate('/appsAbril/estadisticasVentas')} >VENTAS <AttachMoneyIcon style={{ marginTop: '8px' }} /></button>
            <button className={style.buttons} onClick={()=>handleNavigate('/appsAbril/estadisticasClientes')}> CLIENTES <FaceIcon style={{ marginTop: '8px' }}/></button>

        </div>

    );

};
export default OpcionesEstadisticas;