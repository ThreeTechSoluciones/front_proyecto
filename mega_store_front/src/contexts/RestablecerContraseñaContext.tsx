import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Codigo, VerificarCodigo, Restablecer } from '../service/RestablecerContraseñaService';
import Notificaciones from '../components/notificaciones';
import {useNavigate } from 'react-router-dom';



interface RestablecerContraseñaContextType {
    ObtenerCodigo: (email:any) => void;
    Verificar: (data:any) =>void;
    RestablecerContraseña: (data:any)=> void;
    loading: boolean;
    error1: boolean;
    error2: boolean;
    error3: boolean;
    emailUser:string
    codigo: string;
    
}


const RestablecerContraseñaContext = createContext<RestablecerContraseñaContextType | undefined>(undefined);
interface RestablecerContraseñaProviderProps {
    children: ReactNode;
  }

// El Provider para manejar el estado de las sucursales
export const RestablecerContraseñaProvider: React.FC<RestablecerContraseñaProviderProps> = ({ children }) => {

  const [loading, setLoading] = useState<boolean>(false); 
  const [error1,setError1] = useState(false)
  const [error2,setError2] = useState(false)
  const [error3,setError3] = useState(true)
  const [emailUser, setEmailUser]= useState('')
  const [codigo, setCodigo] = useState('')
  const navigate = useNavigate();
  

    //RESTABLECER VARIABLES
    const restablecer = ()=>{
        setError1(false)
        setError2(false)
        setError3(true)
        setEmailUser('')
        setCodigo('')
    }

  //POST PARA OBETENER EL CODIGO, SE DEBE ENVIAR EL MAIL DEL USUARIO
  const ObtenerCodigo= async(email: string)=>{
    try{
        setLoading(true)
        const json={email:email}
        console.log(json)
        await Codigo(json) //post
        setEmailUser(email)
        setError1(true)
        setError3(false)
        Notificaciones.exito(`Codigo enviado con exito`) //mensaje
    }catch(error:any){
        if (error) {
            Notificaciones.error(error.response?.data.errors)
            console.log(error.response?.data.errors);  // Accediendo a 'errors'
            setError2(false)
          } else {
            console.error("Error desconocido", error);
          }
    }finally{
        setLoading(false)
    }
  }
  //POST PARA ENVIAR EL CODIGO JUNTO AL EMAIL
  const Verificar= async(data: any)=>{
    try{
        setLoading(true)
        await VerificarCodigo(data) //post
        Notificaciones.exito(`Verificado correctamente`) //mensaje
        setError2(true)
        setError1(false)
        setCodigo(data.codigoRecuperacion)
    }catch(error:any){
        if (error) {
            Notificaciones.error(error.response?.data.errors)
            console.log(error.response?.data.errors);  // Accediendo a 'errors'
            setError2(false)
          } else {
            console.error("Error desconocido", error);
          }
    }finally{
        setLoading(false)
    }
  }
  //POST PARA ENVIAR EL CODIGO JUNTO AL EMAIL
  const RestablecerContraseña= async(data: any)=>{
    try{
        setLoading(true)
        console.log(data)
        await Restablecer(data) //post
        Notificaciones.exito(`Contraseña Restablecida`) //mensaje
        restablecer()
        navigate('/home')


    }catch(error:any){
        if (error) {
            Notificaciones.error(error.response?.data.errors)
            console.log(error.response?.data.errors);  // Accediendo a 'errors'
            restablecer()
          } else {
            console.error("Error desconocido", error);
          }
    }finally{
        setLoading(false)
    }
  }

  return (
    <RestablecerContraseñaContext.Provider value={{RestablecerContraseña,ObtenerCodigo,Verificar,error1,error2,error3,loading ,emailUser,codigo}}>
      {children}
    </RestablecerContraseñaContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useRestablecerContraseña = () => {
  const context = useContext(RestablecerContraseñaContext);
  if (!context) {
    throw new Error("useSRestablecerContraseña debe usarse dentro de un RestablecerContraseñaProvider");
  }
  return context;
};