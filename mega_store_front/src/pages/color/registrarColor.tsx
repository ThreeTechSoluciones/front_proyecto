import React from 'react';
//Importación de estilos
import style from "./registrarColor.module.css";
//importación de iconos desde mui
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Importación del hook useForm de React Hook Form, que permite manejar formularios
import { useForm } from 'react-hook-form';

// Importación de zodResolver, que conecta Zod con React Hook Form para validar los datos del formulario
import { zodResolver } from '@hookform/resolvers/zod';

// Importación del esquema de validación para color
import {validationsColor} from './validationsColor';

//Componente del Get de colores
import ListaColores from "./getColores"

import { useColor } from '../../contexts/ColorContext';


//Definición de los tipos de datos que recibirá el formulario
type Inputs={  
    nombre:string;
}

const RegistrarColor: React.FC = () => {
    const { 
        register,
        reset, // Función para registrar los campos del formulario y sus validaciones
        handleSubmit,
        formState: { errors } // Objeto que contiene el estado del formulario, incluyendo los errores de validación
    } = useForm<Inputs>({ // Inicializamos useForm con un tipo genérico 'Inputs' para tipar los datos del formulario
        resolver: zodResolver(validationsColor), // Usamos zodResolver para integrar validaciones definidas en el esquema validationsColor
    });
    
    const{postColor} = useColor()


    //POST
    const onSubmit = async (data: Inputs) => {
        postColor(data)
        reset()
      };
    return (
        <div className={style.body}> 
           <form className= {style.form} onSubmit={handleSubmit(onSubmit)}>
                <h3 className={style.title}>Nuevo Color</h3> 
                <div className={style.container}>
                    <input className={style.color} type="text" placeholder="Color" {...register('nombre')} /> {/** Usamos la función 'register' para vincular este campo al formulario y habilitar su validación*/} 
                    {
                    errors.nombre?.message && <p className={style.alerts}>{errors.nombre?.message}</p> /*// Verificamos si hay un mensaje de error asociado al campo 'color', si lo hay mostramos el mensaje */
                    } 
                </div>
                <button className={style.button} type="submit" >< ArrowForwardIcon />Registrar</button>       
            </form>
            <ListaColores />
        </div>
    
    );   

}
export default RegistrarColor;

 
