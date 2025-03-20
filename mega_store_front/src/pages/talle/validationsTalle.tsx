import {z} from 'zod'
export const validationsTalle=z.object({
  //definimos las validaciones para talle
    nombre:z
      .string()
      .min(1, { message: 'Talle no puede estar vacío.' })
      .max(100,{message: 'Talle no puede superar los 100 caracteres'})
      .regex(/^[A-Za-z0-9áéíóúÁÉÍÓÚ\s]+$/,{ message: 'Talle contiene caracteres no permitidos.' })
      .regex(/^(?!.*\s{2,}).*$/, { message: "Talle no puede contener espacios consecutivos"})
      .refine((val) => !(val.length === 1 && val === ' '), { message: 'Talle no puede estar vacío.' }) ,
    }); 