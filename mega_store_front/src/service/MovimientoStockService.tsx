import axios from "axios";
import { API_ROUTES } from "../Routes";

const api = axios.create({
    baseURL: API_ROUTES.BASE,
})


export async function PostMovimientoStock(movimiento:any) {
    
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token no disponible. El usuario no está autenticado.');
    }

    const { data: respuesta } = await api.post(
        API_ROUTES.MOVIMIENTO_STOCK,
        movimiento,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );

    return respuesta;
}