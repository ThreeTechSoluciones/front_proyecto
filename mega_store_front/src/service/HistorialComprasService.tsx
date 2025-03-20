import axios from "axios";
import { API_ROUTES } from "../Routes";


const api = axios.create({
    baseURL: API_ROUTES.BASE,
})

//GET HISTORIAL DE COMPRAS

export async function getHistorialCompras(id: string) {
    const url = API_ROUTES.GET_DATOS_PERFIL(id);
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token no disponible. El usuario no está autenticado.");
    }

    const { data: respuesta } = await api.get(url, { 
        headers: { 
            Authorization: `Token ${token}` 
        }
    }); 
        return respuesta;
        
}


   

  