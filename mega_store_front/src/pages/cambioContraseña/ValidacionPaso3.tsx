import {z} from 'zod'
const validationsRegister=z.object({
  //definimos las validaciones para talle
    password:z
      .string()
      .min(1, { message: 'Contraseña no puede estar vacío.' })
      .min(8, { message: 'Contraseña debe tener al menos 8 caracteres.' })
      .max(100,{message: 'Contraseña no puede superar los 100 caracteres'})
      // .regex(/^[A-Za-z0-9áéíóúÁÉÍÓÚ\s]+$/,{ message: 'Contraseña contiene caracteres no permitidos.' })
      .regex(/^(?!.*\s{2,}).*$/, { message: "Contraseña no puede contener espacios consecutivos"})
      .refine((val) => !(val.length === 1 && val === ' '), { message: 'Contraseña no puede estar vacío.' })
      .refine((value) => /[A-Z]/.test(value), { message: "La contraseña debe contener al menos una letra mayúscula." }) 
      .refine((value) => /[a-z]/.test(value), { message: "La contraseña debe contener al menos una letra minúscula." }) 
      .refine((value) => /\d/.test(value), { message: "La contraseña debe contener al menos un número." }), 
    confirmacion:z
      .string()
      .min(1, { message: 'Confirmación no puede estar vacío.' })
      .max(100, { message: 'Contraseña no debe superar los 100 caracteres.' })
    }).superRefine((data, ctx) => {
      // Guardar el valor de la contraseña en una variable para mayor claridad
      const password = data.password;
      const confirmacion = data.confirmacion;
      // Validar si coinciden
      if (password !== confirmacion) {
        ctx.addIssue({
          code: 'custom',
          path: ['confirmacion'],
          message: 'No coincide con la contraseña.',
      });
    }
   
}); 
export default validationsRegister;