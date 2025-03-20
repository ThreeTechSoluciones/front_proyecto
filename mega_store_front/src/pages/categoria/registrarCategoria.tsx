import React from 'react';
//Importación de estilos
import style from "./registrarCategoria.module.css";
//Importación de los iconos utilizados desde mui
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
//Importación de lo necesario para utilizar zod para validaciones
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
//Importación del esquema de validaciones de categoría
import { validationsCategoria } from './validationsCategoria';
import ListaCategoria from '../../components/categorias/getCategoria'
import { useCategoria } from '../../contexts/CategoriaContext';

// Definición de los tipos que se esperan en el formulario
type Inputs = {
  nombre: string;
};

const RegistrarCategoria: React.FC = () => {
  // Configuramos el hook useForm, integrando las validaciones de Zod
  const { 
    register,
    reset,
    handleSubmit, // Función que maneja el evento de envío del formulario
    formState: { errors } // Objeto que contiene el estado del formulario, incluyendo los errores de validación
} = useForm<Inputs>({ // Inicializamos useForm con un tipo genérico 'Inputs' para tipar los datos del formulario
    resolver: zodResolver(validationsCategoria), // Usamos zodResolver para integrar validaciones definidas en el esquema validationsCategoria
});

  const {postCategoria} = useCategoria()
  
  

  // Función que maneja la consulta al back me
  const onSubmit = async (data: Inputs) => {
    postCategoria(data)
    reset()
  };


  return (
    <div className={style.body}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={style.title}>Nueva Categoría</h3>
        <div className={style.container}>
          <input 
            className={style.category} 
            type="text" 
            placeholder="Categoría" 
            {...register('nombre')}  // Vinculamos el input a react-hook-form
          />
          {
            errors.nombre?.message && 
            <p className={style.alerts}>{errors.nombre.message}</p> // Mostramos el error si existe
          }
        </div>
        <button className={style.button} type="submit">
          <ArrowForwardIcon />Registrar
        </button>
      </form>
      <ListaCategoria/>
    </div>
  );
};

export default RegistrarCategoria;


