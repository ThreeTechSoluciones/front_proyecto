import React from 'react';
//importamos los estilos
import style from "./registrarTalle.module.css";
//importamos los iconos utilizados desde mui
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
//importamos lo necesario para usar zod para validaciones
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
//importamos el esquema de validaciones de talle
import { validationsTalle } from './validationsTalle'
//Componete Get talles
import ListaTalles from "./getTalles"
import { useTalle } from '../../contexts/TalleContext';

//definimos los tipos que va a recibir el formulario
type Inputs={
    nombre:string;
    
}
/**
 * Componente de React para registrar un nuevo talle.
 * 
 * Utiliza el hook `useForm` de React Hook Form para manejar la validación de formularios
 * con un esquema de validación definido mediante Zod. Además, permite enviar los datos 
 * al backend usando el custom hook `useTalle`.
 *
 * @component
 */

const RegistrarTalle: React.FC = () => {
    const { 
        register,
        reset,
        handleSubmit, // Función que maneja el evento de envío del formulario
        formState: { errors } // Objeto que contiene el estado del formulario, incluyendo los errores de validación
    } = useForm<Inputs>({ // Inicializamos useForm con un tipo genérico 'Inputs' para tipar los datos del formulario
        resolver: zodResolver(validationsTalle), // Usamos zodResolver para integrar validaciones definidas en el esquema validationsTalle
    });

    const {postTalle} = useTalle()


  // Función que maneja la consulta al back me
  const onSubmit = async (data: Inputs) => {
    postTalle(data)
    reset()
  };
    
    return (
        <div className={style.body}>
          <form className= {style.form} onSubmit={handleSubmit(onSubmit)}>
                <h3 className={style.title}>Nuevo Talle</h3> 
                <div className={style.container}>
                <input className={style.size} type="text" placeholder="Talle" {...register('nombre')} />
                {
                errors.nombre?.message &&<p className={style.alerts}>{errors.nombre?.message}</p> //si hay errores los muestra por pantalla
                }
                </div>
                <button className={style.button} type="submit" >< ArrowForwardIcon />Registrar</button>       
            </form>
            <ListaTalles />
        </div>
    );
};
export default RegistrarTalle;
