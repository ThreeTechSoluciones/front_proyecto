import {z} from 'zod'
//usamos esto para comparar lo que nos ingresen en cada campo del form
export const validationsMarca=z.object({
nombre:z
    
.string()
.min(1, { message: 'Marca no puede estar vacío.' })
.max(100,{message: 'Marca no puede superar los 100 caracteres'})
.regex(/^(?!.*\s{2,}).*$/, { message: "Marca no puede contener espacios consecutivos" })
.regex(/^[A-Za-z0-9áéíóúÁÉÍÓÚ\s]+$/,{ message: 'Marca contiene caracteres no permitidos.' })
.refine((val) => !(val.length === 1 && val === ' '), { message: 'Marca no puede estar vacío.' }) ,

});