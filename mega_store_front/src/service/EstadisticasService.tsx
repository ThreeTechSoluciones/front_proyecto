import axios from "axios";
import { API_ROUTES } from "../Routes";


const api = axios.create({
    baseURL: API_ROUTES.BASE,
})

//GET ESTADISTICAS VENTAS TOTALES
export async function getEstadisticasVentas(fechaDesde: string, fechaHasta: string, frecuencia: string) {
    console.log(localStorage.getItem('token'));

    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));

    if (!token) {
        throw new Error('Token no disponible. El usuario no está autenticado.');
    }
    const url = API_ROUTES.GET_VENTAS(fechaDesde, fechaHasta, frecuencia);

    const { data: respuesta } = await api.get(url, {  
        headers: {
            Authorization: `Token ${token}`,
        },  
    });

    return respuesta;
}

//GET ESTADISTICAS PRODUCTOS

export async function getEstadisticasProductos(fechaDesde: string, fechaHasta: string) {
    console.log(localStorage.getItem('token'));

    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));

    if (!token) {
        throw new Error('Token no disponible. El usuario no está autenticado.');
    }
    const url = API_ROUTES.GET_PRODUCTOS(fechaDesde, fechaHasta);

    const { data: respuesta } = await api.get(url, {  
        headers: {
            Authorization: `Token ${token}`,
        },  
    });

    return respuesta;
}

//GET ESTADISTICAS CLIENTES (FRECUENCIA VENTA)
 export async function getEstadisticasFrecVenta(){
    const token=localStorage.getItem('token');
    if (!token){
        throw new Error ("Token no disponible. El usuario no está autenticado")
    }
    const url= API_ROUTES.GET_FREC_VENTAS
    const {data:respuesta}=await api.get(url,{
        headers:{
            Authorization: `Token ${token}`,
        }
    });
    return respuesta
 }

 //GET ESTADISTICAS CLIENTES (MONTO PROMEDIO DE VENTAS)

 export async function getEstadisticasPromVentas(){
    const token=localStorage.getItem('token');
    if (!token){
        throw new Error ("Token no disponible. El usuario no está autenticado")
    }
    const url= API_ROUTES.GET_PROM_VENTAS
    const {data:respuesta}=await api.get(url,{
        headers:{
            Authorization: `Token ${token}`,
        }
    });
    return respuesta
 }