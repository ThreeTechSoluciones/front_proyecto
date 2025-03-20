import axios from "axios";
import Notificaciones from "../components/notificaciones";
import { API_ROUTES } from "../Routes";
import { Categoria } from "../contexts/CategoriaContext";

const api = axios.create({
    baseURL: API_ROUTES.BASE,
})

export async function getCategorias(){
        const {data : respuesta} = await api.get(API_ROUTES.GET_CATEGORIA); 
        return respuesta;
}

export async function newCategoria(data :Categoria) {
    
    const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token no disponible. El usuario no está autenticado.');
        }
        const {data : respuesta} = await api.post(API_ROUTES.POST_CATEGORIA, data ,{ 
            headers: {
                Authorization: `Token ${token}`,
            },  
        }); 
        return respuesta;
    }
    

export async function putCategoria(data : Categoria) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token no disponible. El usuario no está autenticado.');
    }
    const {data : respuesta} = await api.put(API_ROUTES.PUT_CATEGORIA, data,{ 
        headers: {
            Authorization: `Token ${token}`,
        },  
    }); 
    return respuesta;
}
    
export const deleteCategoria = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token no disponible. El usuario no está autenticado.");
    }

    try {
        // Realiza la solicitud DELETE para eliminar la categoría
        const response = await api.delete(API_ROUTES.DELETE_CATEGORIA(id), {
            headers: {
                Authorization: `Token ${token}`,
            },
        });

        // Llama a la notificación de éxito
        Notificaciones.exito("¡Categoría eliminada con éxito!");

        return response.data;
    } catch (error) {
        console.error("Error al eliminar la categoría:", error);
        // Notificación de error si algo falla

        Notificaciones.error("No fue posible eliminar esta Categoría. Tiene un producto asociado");

        throw error;
    }
};
