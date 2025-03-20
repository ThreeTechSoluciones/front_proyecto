import style from './CambioContraseña.module.css'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import validationsLogin from "./ValidacionPaso1";
import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import VerificacionCodigo from './VerificacionCodigo';
import { useRestablecerContraseña } from '../../contexts/RestablecerContraseñaContext';
import validationsRegister from './ValidacionPaso3';



const CambioContraseña = () => {
    const {error1,error2,error3, emailUser, codigo, ObtenerCodigo, RestablecerContraseña, loading}=useRestablecerContraseña()

    const { register: registerLogin, handleSubmit, formState: { errors: errorsLogin } } = useForm({
        resolver: zodResolver(validationsLogin),
    });
  

//Paso 1
const onSubmit = (data:any) => {
    console.log("Email ingresado:", data);
    ObtenerCodigo(data.email)
}; 


        
const handleCerrarForm = () => {
            console.log('cerrar')
};

const [showPassword, setShowPassword] = React.useState(false);  
const [showConfirmation, setShowConfirmation] = React.useState(false);
const handleClickShowConfirmation = () => setShowConfirmation((show) => !show);
const handleClickShowPassword = () => setShowPassword((show) => !show);
const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {event.preventDefault();};         
const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {event.preventDefault();};

// Configurar el formulario de registro
const { register: registerRegister, handleSubmit: handleSubmitRegister, formState: { errors: errorsRegister } } = useForm({
                resolver: zodResolver(validationsRegister), // Usar el esquema de validación para el registro
});

// Función para manejar el envío del formulario de registro
const onSubmitRegister = (data: any) => {
    const dataToSubmit = {
      email:emailUser, 
      codigoRecuperacion: codigo, 
      password: data.password, // Obtienes el password del formulario
    };

    console.log('dataToSubmit', dataToSubmit);
    RestablecerContraseña(dataToSubmit)
    // Aquí podrías enviar los datos a tu API o realizar otra acción
};
       
return (
<div className={style.contGeneral}>
        {/* PASO 1 */}     
        {error3 && 
        <form className={style.loginForm}  onSubmit={handleSubmit(onSubmit)}>
            <div className={style.imagen}>
                <h2>Ingrese su Email</h2>
                </div>
                <div>
                {/* Campo de correo electrónico */}
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
                    <Input
                    id="email"
                    type="text"
                    color="secondary"
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton>
                            <AccountCircleIcon />
                        </IconButton>
                        </InputAdornment>
                    }
                    {...registerLogin('email')} // Registrar el campo email para hacer las validaciones
                    />
                    {/* Mensaje de error ante una validación que no pasa */}
                    <Stack sx={{ width: '100%', height: '5%' }} spacing={1}>
                    {/* Carteles de alerta */}
                    {errorsLogin.email &&
                        typeof errorsLogin.email.message === 'string' && (
                        <Alert
                            severity="error"
                            sx={{
                            '.MuiAlert-icon': { fontSize: '20px' },
                            '.MuiAlert-message': { fontSize: '10px' },
                            }}
                        >
                            {errorsLogin.email.message}
                        </Alert>
                        )}
                    </Stack>
                </FormControl>
                </div>

                {/* Opciones para registro y recuperación de contraseña */}
                <div className={style.container3}>
                    <button type="submit" className={style.button} >
                        {loading ? 'Cargando..' : 'Ingresar'}
                    </button>
                </div>
        </form>
        
        }      
        
            
    {/* PASO 2 */}
        {error1 &&
            <VerificacionCodigo onCerrar={handleCerrarForm} />
        }
            
        
          
            
    {/* PASO 3 */}            
    {/* CONTRASEÑA */}

    {error2 &&
        <form onSubmit={handleSubmitRegister(onSubmitRegister)} className={style.loginForm}>
            <div>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
                <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                color="secondary"
                endAdornment={
                    <InputAdornment position="end">
                    <IconButton
                        aria-label={showPassword ? 'hide the password' : 'display the password'}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                }
                {...registerRegister('password')}
                />
            </FormControl>
            {errorsRegister.password && typeof errorsRegister.password.message === 'string' && (
                <p className={style.alerts}>{errorsRegister.password.message}</p>
            )}

            {/* CONFIRMACIÓN CONTRASEÑA */}
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-confirmacion">Confirmar contraseña</InputLabel>
                <Input
                id="standard-adornment-confirmacion"
                type={showConfirmation ? 'text' : 'password'}
                color="secondary"
                endAdornment={
                    <InputAdornment position="end">
                    <IconButton
                        aria-label={showConfirmation ? 'hide the password' : 'display the password'}
                        onClick={handleClickShowConfirmation}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                    >
                        {showConfirmation ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                }
                {...registerRegister('confirmacion')}
                />
            </FormControl>
            {errorsRegister.confirmacion && typeof errorsRegister.confirmacion.message === 'string' && (<p className={style.alerts}>{errorsRegister.confirmacion.message}</p>)}
            <div className={style.container3}>
                <button type="submit" className={style.button}>
                Enviar
                </button>
            </div>
            </div>
        </form>
    }
        
    </div>
  );
};            
export default CambioContraseña;