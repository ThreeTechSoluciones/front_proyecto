import {z} from 'zod'
export const validationsCategoria=z.object({ //creamos el objeto z 
    //definimos las validaciones para categoria
    nombre:z
        .string()
        .min(1, { message: 'Categoría no puede estar vacío.' })
        .max(100,{message: 'Categoría no puede superar los 100 caracteres'})
        .regex(/^[A-Za-z0-9áéíóúÁÉÍÓÚ\s]+$/,{ message: 'Categoría contiene caracteres no permitidos.' })
        .regex(/^(?!.*\s{2,}).*$/, { message: "Categoría no puede contener espacios consecutivos"})
        .refine((val) => !(val.length === 1 && val === ' '), { message: 'Categoría no puede estar vacío.' }) 
});

 

