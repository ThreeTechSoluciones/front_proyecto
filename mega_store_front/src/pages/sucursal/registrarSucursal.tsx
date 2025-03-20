import React from 'react';
//Importación de los estilos
import style from "./registrarSucursal.module.css";
//Importación de los íconos utilizados desde mui
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
//Importación de lo necesario para utilizar zod para validaciones
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
//Importación del esquema de validaciones de sucursal
import { validationsSucursal } from './validationsSucursal';
import { useSucursales } from '../../contexts/SucursalContext';

//Get de sucursales
import ListaSucursales from './getSucursal'

//Definición de los tipos de datos que va a recibir el formulario
type Inputs={
    nombre:string;
}

const RegistrarSucursal: React.FC = () => {
    const { 
        register,
        reset,
        handleSubmit, // Función que maneja el evento de envío del formulario
        formState: { errors } // Objeto que contiene el estado del formulario, incluyendo los errores de validación
    } = useForm<Inputs>({ // Inicializamos useForm con un tipo genérico 'Inputs' para tipar los datos del formulario
        resolver: zodResolver(validationsSucursal), // Usamos zodResolver para integrar validaciones definidas en el esquema validationsSucursal
    });

    const {postSucursal} =useSucursales()
    
    // Función que maneja la consulta al back me 
  const onSubmit = async (data: Inputs) => {
    postSucursal(data)
    reset()
  };
    
    return (
        <div className={style.body}>
           <form className= {style.form} onSubmit={handleSubmit(onSubmit)}>
                <h3 className={style.title}>Nueva Sucursal</h3>
                <div className={style.container}>
                    <input className={style.store} type="text" placeholder="Sucursal" {...register('nombre')} />
                    {
                    errors.nombre?.message &&<p className={style.alerts}>{errors.nombre?.message}</p> //si hay errores, los muestra por pantalla
                    }  
                </div> 
                <button className={style.button} type="submit" >< ArrowForwardIcon />Registrar</button>   
            </form>
            <ListaSucursales/>
        </div>
    );
};
export default RegistrarSucursal;
