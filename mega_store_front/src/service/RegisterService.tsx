import axios from "axios";
import { API_ROUTES } from "../Routes";

const api = axios.create({
    baseURL: API_ROUTES.BASE,
})

export interface Register {
    email: string; // El correo del usuario
    password: string; // La contraseña del usuario
    telefono: string;
    direccionEnvio:string;
    rol: number;
}
export interface Verificar {
    email: string; // El correo del usuario
    codigoVerificacion: string;
}
export interface Reenviar{
    email: string; // El correo del usuario
}


export async function registrarUser (user: Register){
        const {data : respuesta} = await api.post(API_ROUTES.POST_USUARIO, user); 
        return respuesta;
}
export async function verificarUser (user: Verificar){
    const {data : respuesta} = await api.post(API_ROUTES.VERIFICAR, user); 
    return respuesta;
}

export async function reenviarCodigo (user: Reenviar){
    const {data : respuesta} = await api.post(API_ROUTES.REENVIAR_CODIGO, user); 
    return respuesta;
}