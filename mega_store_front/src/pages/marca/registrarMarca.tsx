import React from 'react';
//Importación de estilos
import style from "./registrarMarca.module.css";
//Importación de iconos utilizados desde mui
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// Importacón del hook useForm de React Hook Form, que permite manejar formularios
import {useForm} from 'react-hook-form';
// Importación de zodResolver, que conecta Zod con React Hook Form para validar los datos del formulario
import {zodResolver} from '@hookform/resolvers/zod';
// Importación del esquema de validaciones de marca
import { validationsMarca} from './validationsMarca';
import { useMarca } from '../../contexts/MarcaContext';
//Componente del Get de colores
import ListaMarcas from "./getMarca"



//Definición los tipos de datos que recibirá el formulario
type Inputs={
    nombre:string; //definimos que marca es un string
}

const RegistrarMarca: React.FC = () => {
    const { 
        register, // Función para registrar los campos del formulario y sus validaciones
        handleSubmit, // Función que maneja el evento de envío del formulario
        reset,
        formState: { errors } // Objeto que contiene el estado del formulario, incluyendo los errores de validación
    } = useForm<Inputs>({ // Inicializamos useForm con un tipo genérico 'Inputs' para tipar los datos del formulario
        resolver: zodResolver(validationsMarca), // Usamos zodResolver para integrar validaciones definidas en el esquema 'userSchema'
    });
    const {postMarca}=useMarca()
 
    // Función que maneja la consulta al back me
  const onSubmit = async (data: Inputs) => {
    postMarca(data)
    reset()
  };

    // Función para manejar el envío del formulario
    return (
        <div className={style.body}>
           <form className= {style.form} onSubmit={handleSubmit(onSubmit)}>
                <h3 className={style.title}>Nueva Marca</h3> 
                <div className={style.container}>
                    <input className={style.brand} type="text" placeholder="Marca" {...register('nombre')} />
                    {
                    errors.nombre?.message &&<p className={style.alerts}>{errors.nombre?.message}</p> /*// Verificamos si hay un mensaje de error asociado al campo 'marca', si lo hay mostramos el mensaje */
                    }
                </div>
                <button className={style.button} type="submit" >< ArrowForwardIcon />Registrar</button>       
            </form>
            <ListaMarcas  />
        </div>
    );
};
export default RegistrarMarca;

 
