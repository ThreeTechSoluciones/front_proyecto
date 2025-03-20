import axios from "axios";
import { API_ROUTES } from "../Routes";

import { Producto } from "../pages/producto/interfazProducto";


const api = axios.create({
    baseURL: API_ROUTES.BASE,
})



export async function getProductos() {
        const {data : respuesta} = await api.get(API_ROUTES.GET_PRODUCTO); 
        return respuesta;
}

export async function getProductosPaginacion(page = 0, size :number, sort = "id,asc") {
    const { data: respuesta } = await api.get(API_ROUTES.GET_PRODUCTO_PAGINACION(page, size, sort));
    return respuesta;
}

export async function getProductoEspecifico(id: string) {
    const {data : respuesta} = await api.get(API_ROUTES.GET_PRODUCTO_ESPECIFICO(id)); 
    return respuesta;
}

export async function newProducto(producto : FormData) {

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token no disponible. El usuario no está autenticado.');
    }
    console.log('tokenn',token)
    const { data: respuesta } = await api.post(API_ROUTES.POST_PRODUCTO, producto, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Token ${token}`,
        },
    });
    return respuesta;
    
}

export async function putProducto(producto: Producto) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token no disponible. El usuario no está autenticado.');
    }
    
    const {data : respuesta} = await api.put(API_ROUTES.PUT_PRODUCTO, producto,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },  
    }); 
    return respuesta;
}

export const deleteProducto = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token no disponible. El usuario no está autenticado.');
    }

    const {data: response} = await api.delete(API_ROUTES.DELETE_PRODUCTO(id),{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        }, 
    }); 
    return response;
}

export async function getHitorial(id: string) {
    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
        throw new Error('Token no disponible. El usuario no está autenticado.');
    }
    
    const {data : respuesta} = await api.get(API_ROUTES.HISTORIAL(id),{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },  
    }); 
    return respuesta;
}