import {z} from 'zod'
//usamos esto para comparar lo que nos ingresen en cada campo del form
export const validationsPerfil=z.object({
    nombre:z
        .string()
        .min(1, { message: 'Nombre no puede estar vacío.' })
        .max(100,{message: 'Nombre no puede superar los 100 caracteres.'})
        .regex(/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/,{ message: 'Nombre debe ser una cadena de letras.' })
        .regex(/^(?!.*\s{2,}).*$/, { message: "Nombre no puede contener espacios consecutivos"})
        .refine((val) => !(val.length === 1 && val === ' '), { message: 'Nombre no puede estar vacío.' }) ,
    email:z
        .string()
        .email({message:"Formato inválido de email"})
        .regex(/^(?!.*\s{2,}).*$/, { message: "Email no puede contener espacios consecutivos."})
        .refine((val) => !(val.length === 1 && val === ' '), { message: 'Email no puede estar vacío.' }) ,
    direccionEnvio:z
        .string()
        .max(100, { message: 'No debe superar los 100 caracteres.' }),
    numeroTelefono:z
       .string()
       .regex(/^\+?[0-9]+$/, { message: 'Teléfono debe ser un número.' })
       .min(8, { message: 'Debe tener al menos 8 dígitos.' })
       .max(15,{message: 'No debe superar los 15 dígitos.'}),
       

});