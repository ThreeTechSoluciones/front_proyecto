import {z} from 'zod'
//usamos esto para comparar lo que nos ingresen en cada campo del form
export const validationsSucursal=z.object({
nombre:z
    .string()
    .min(1, { message: 'Sucursal no puede estar vacío.' })
    .max(100,{message: 'Sucursal no puede superar los 100 caracteres'})
    .regex(/^[A-Za-z0-9áéíóúÁÉÍÓÚ\s]+$/,{ message: 'Sucursal contiene caracteres no permitidos.' })
    .regex(/^(?!.*\s{2,}).*$/, {message: "Sucursal no puede contener espacios consecutivos"})
    .refine((val) => !(val.length === 1 && val === ' '), { message: 'Sucursal no puede estar vacío.' }) ,
});