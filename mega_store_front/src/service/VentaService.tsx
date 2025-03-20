import axios from "axios";
import { API_ROUTES } from "../Routes";

const api = axios.create({
    baseURL: API_ROUTES.BASE,
})

export async function postVenta(productos: any){
        const token = localStorage.getItem('token');
        if (!token) {
                throw new Error('Token no disponible. El usuario no está autenticado.');
        }
        const {data : respuesta} = await api.post(API_ROUTES.POST_VENTA, productos,{ 
                headers: {
                    Authorization: `Token ${token}`,
                },  
        }); 
    return respuesta;
}