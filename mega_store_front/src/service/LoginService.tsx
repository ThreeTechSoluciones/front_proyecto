import axios from "axios";
import { API_ROUTES } from "../Routes";

const api = axios.create({
    baseURL: API_ROUTES.BASE,
})

export interface LoginData {
    email: string; // El correo del usuario
    password: string; // La contraseña del usuario
}
export async function LogionService (user: LoginData){
        const {data : respuesta} = await api.post(API_ROUTES.LOGIN, user); 
        return respuesta;
}