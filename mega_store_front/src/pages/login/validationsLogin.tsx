import {z} from 'zod'
const validationsLogin=z.object({
  //definimos las validaciones para talle
    email:z
      .string()
      .min(1, { message: 'Email no puede estar vacío.' })
      .max(100,{message: 'Email no puede superar los 100 caracteres'})
      .regex(/^(?!.*\s{2,}).*$/, { message: "Email no puede contener espacios consecutivos"})
      .email({message:'Formato inválido de email'})
      .refine((val) => !(val.length === 1 && val === ' '), { message: 'Email no puede estar vacío.' }),
      password: z
      .string()

      .min(1, { message: 'Contraseña no puede estar vacía.' })
      .max(100, { message: 'Contraseña no puede superar los 100 caracteres' })
      .regex(/^[A-Za-z0-9áéíóúÁÉÍÓÚ\s@$!%*?&#]+$/, { message: 'Contraseña contiene caracteres no permitidos.' })
      .regex(/^(?!.*\s{2,}).*$/, { message: 'Contraseña no puede contener espacios consecutivos' })
      .refine((val) => !(val.length === 1 && val === ' '), { message: 'Contraseña no puede estar vacía.' }),
}); 

export default validationsLogin