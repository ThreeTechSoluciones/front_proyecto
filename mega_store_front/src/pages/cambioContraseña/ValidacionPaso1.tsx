import {z} from 'zod'
const validationsLogin = z.object({
    email: z
      .string()
      .min(1, { message: 'Email no puede estar vacío.' })
      .max(100, { message: 'Email no puede superar los 100 caracteres' })
      .regex(/^(?!.*\s{2,}).*$/, { message: "Email no puede contener espacios consecutivos" })
      .email({ message: 'Formato inválido de email' })
      .refine((val) => !(val.length === 1 && val === ' '), { message: 'Email no puede estar vacío.' }),
  });
  
  export default validationsLogin;