import axios from "axios";
import { API_ROUTES } from "../Routes";
import { Perfil } from "../contexts/PerfilContext";

const api = axios.create({
    baseURL: API_ROUTES.BASE,
})

export async function getDatosPerfil(id: string) {
    
    console.log("Entra en getDatosPerfil");
    
    const url = API_ROUTES.GET_DATOS_PERFIL(id);
    console.log("URL generada:", url); // Verifica que la URL sea la correcta

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

export async function updateDatosPerfil(datosPerfil: Perfil) {
     const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token no disponible. El usuario no está autenticado.');
        }
        const { data: respuesta } = await api.put(API_ROUTES.PUT_DATOS_PERFIL, datosPerfil,{ 
            headers: {
                Authorization: `Token ${token}`,
            },  
        }); 
        return respuesta;
    }
   

  