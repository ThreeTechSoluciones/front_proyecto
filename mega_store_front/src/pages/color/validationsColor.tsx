import {z} from 'zod'
export const validationsColor=z.object({
    //definimos las validaciones para color
    nombre:z
      .string()
      .min(1, { message: 'Color no puede estar vacío.' })
      .max(100,{message: 'Color no puede superar los 100 caracteres'})
      .regex(/^[A-Za-z0-9áéíóúÁÉÍÓÚ\s]+$/,{ message: 'Color contiene caracteres no permitidos.' })
      .regex(/^(?!.*\s{2,}).*$/, { message: "Color no puede contener espacios consecutivos"})
      .refine((val) => !(val.length === 1 && val === ' '), { message: 'Color no puede estar vacío.' }) ,
});