import axios from "axios";
import Notificaciones from "../components/notificaciones";
import { API_ROUTES } from "../Routes";
import { Talle } from "../contexts/TalleContext";

const api = axios.create({
    baseURL: API_ROUTES.BASE,
})

export async function getTalles(){
        const {data : respuesta} = await api.get(API_ROUTES.GET_TALLE); 
        return respuesta;
}

export async function newTalle(data :Talle) {
    
      const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token no disponible. El usuario no está autenticado.');
        }
        const {data : respuesta} = await api.post(API_ROUTES.POST_TALLE, data,{ 
            headers: {
                Authorization: `Token ${token}`,
            },  
        }); 
        return respuesta;
    } 

export async function putTalle(data : Talle) {
   
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token no disponible. El usuario no está autenticado.');
    }
    const {data : respuesta} = await api.put(API_ROUTES.PUT_TALLE, data,{
        headers: {
            Authorization: `Token ${token}`,
        },  
    }); 
    return respuesta;
} 

export const deleteTalle = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token no disponible. El usuario no está autenticado.");
    }

    try {
        // Realiza la solicitud DELETE para eliminar el talle
        const response = await api.delete(API_ROUTES.DELETE_TALLE(id), {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        Notificaciones.exito('¡Talle eliminado con éxito!')
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el talle:", error);

        Notificaciones.error('No fue posible eliminar este Talle. Tiene un producto asociado')

        throw error;
    }
};
