import axios from "axios";
import Notificaciones from "../components/notificaciones";
import { API_ROUTES } from "../Routes";
import { Sucursal } from "../contexts/SucursalContext";

const api = axios.create({
    baseURL: API_ROUTES.BASE,
})

export async function getSucursales (){
        const {data : respuesta} = await api.get(API_ROUTES.GET_SUCURSALES, ); 
        return respuesta;
}

export async function newSucursal(sucursal: Sucursal) {
    const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token no disponible. El usuario no está autenticado.');
        }
        const {data : respuesta} = await api.post(API_ROUTES.POST_SUCURSAL, sucursal,{
            headers: {
                Authorization: `Token ${token}`,
            },  
        }); 
        return respuesta;
    }
    
    

export async function putSucursal(sucursal: Sucursal) {
   
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token no disponible. El usuario no está autenticado.');
    }
    const {data : respuesta} = await api.put(API_ROUTES.PUT_SUCURSAL, sucursal,{ 
        headers: {
            Authorization: `Token ${token}`,
        },  
    }); 
    return respuesta;
}

export const deleteSucursal = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token no disponible. El usuario no está autenticado.");
    }

    try {
        // Realiza la solicitud DELETE para eliminar la sucursal
        const response = await api.delete(API_ROUTES.DELETE_SUCURSAL(id), {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        Notificaciones.exito('¡Sucursal eliminada con éxito!');
        return response.data;
    } catch (error) {
        console.error("Error al eliminar la sucursal:", error);

        Notificaciones.error('No fue posible eliminar esta Sucursal. Tiene un producto asociado')

        throw error;
    }
};
