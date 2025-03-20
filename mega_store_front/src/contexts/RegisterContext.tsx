import React, { createContext, useContext, useState, ReactNode } from "react";
import { Register, Verificar, registrarUser, verificarUser, reenviarCodigo, Reenviar } from "../service/RegisterService";
import { useNotification } from "./NotificacionContext";
import { useNavigate } from "react-router-dom";
import { AxiosError } from 'axios';

import Notificaciones from "../components/notificaciones";

// Define el tipo para el contexto
interface RegisterContextType {
  Registrar : (user: Register)=>void;
  VerificarUsuario: (user: Verificar) => void;
  loading:boolean;
  loadingVerificacion:boolean;
    email: string;
    setearEmail: (email:string)=>void;
    reenviarCodi: (email:Reenviar)=>void;
    cerrarModal: ()=>void;
}

// Crea el contexto con un valor inicial vacío
const RegisterContext = createContext<RegisterContextType | undefined>(undefined);


// Define el provider
interface RegisterProviderProps {
  children: ReactNode;
}

export const RegisterProvider: React.FC<RegisterProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const {mostrarMensaje } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingVerificacion, setLoadingVerificacion]= useState<boolean>(false);
  const[email, setEmail]= useState('')

  const Registrar = async (user: Register) => {
    
    try{
        setLoading(true)
        const response = await registrarUser(user)
         //le paso los datos del usuario al service
        console.log(response)
        console.log('email',response.data.email)
        setEmail(response.data.email)
        Notificaciones.exito(`Codigo enviado, verifique su correo.`);
        
    }catch(error: unknown){
        if (error instanceof AxiosError) {
            mostrarMensaje(error.response?.data.errors)
            console.log(error.response?.data.errors);  // Accediendo a 'errors'
          } else {
            console.error("Error desconocido", error);
          }
    }finally{
        setLoading(false)
        setLoadingVerificacion(true)
    }
    
  };

  const VerificarUsuario = async (user: Verificar) => {
    try{
        setLoading(true)
        const response = await verificarUser(user)
         //le paso los datos del usuario al service
        console.log(response)
        Notificaciones.exito(`Usuario verificado`);
        setLoadingVerificacion(false)
        navigate('/home')
        
    }catch(error: unknown){
        if (error instanceof AxiosError) {
            mostrarMensaje(error.response?.data.errors)
            console.log(error.response?.data.errors);  // Accediendo a 'errors'
          } else {
            console.error("Error desconocido", error);
          }
    }finally{
        setLoading(false) 
    }
    
  };

const setearEmail=async(email:string)=>{
        setEmail(email)
  }

  const reenviarCodi = async (user: Reenviar) => {
    
    try{
        setLoading(true) 
        const response = await reenviarCodigo(user)
         //le paso los datos del usuario al service
         Notificaciones.exito(`Codigo reenviado`);
        console.log(response)
        
    }catch(error: unknown){
        if (error instanceof AxiosError) {
            mostrarMensaje(error.response?.data.errors)
            console.log(error.response?.data.errors);  // Accediendo a 'errors'
          } else {
            console.error("Error desconocido", error);
          }
    }finally{
        setLoading(false) 
    }
    
  };
  const cerrarModal = ()=>{
    setLoadingVerificacion(false)
  }



  return (
    <RegisterContext.Provider value={{ loading, Registrar , VerificarUsuario , loadingVerificacion, email, setearEmail, reenviarCodi, cerrarModal}}>
      {children}
    </RegisterContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useRegister = (): RegisterContextType => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error("useRegister debe usarse dentro de un RegisterProvider");
  }
  return context;
};