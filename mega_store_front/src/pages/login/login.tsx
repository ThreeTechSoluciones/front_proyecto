//Importaciones
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import validationsLogin from "./validationsLogin";
import Style from "./login.module.css";
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
import { useAuth } from "../../contexts/LoginContext";


        
const Login: React.FC = () => {

    //Funciones para visualización de contraseña
    const { login, loading } = useAuth();

    const [showPassword, setShowPassword] = React.useState(false);
      
    const handleClickShowPassword = () => setShowPassword((show) => !show);
      
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {event.preventDefault();};
    
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {event.preventDefault();};
  
    // Configurar el formulario de inicio de sesión
    const { register: registerLogin, handleSubmit: handleSubmitLogin, formState: { errors: errorsLogin } } = useForm({
        resolver: zodResolver(validationsLogin), // Usar el esquema de validación para el inicio de sesión
    });

    // Función para manejar el envío del formulario de inicio de sesión
    const onSubmitLogin = (data: any) => {
        login(data)
    };
    
    return (
        <div className={Style.screen}>
            <div className={Style.container}>
                {/* Formulario de inicio de sesión */}
                <form className={Style.loginForm} onSubmit={handleSubmitLogin(onSubmitLogin)}>
                    <div className={Style.imagen}> <h2>¡Bienvenido!</h2> </div>
                    <div>
                    {/* Campo de correo electrónico*/}
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
                    <Input
                        id="email"
                        type="text"
                        color="secondary" 
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton> <AccountCircleIcon /></IconButton>  {/*agregamos el ícono */}
                        </InputAdornment>  }
                        {...registerLogin('email')} // Registrar el campo email para hacer las validaciones
                        />
                        {/*Mensaje de error ante una validación que no pasa*/}
                        <Stack sx={{ width: '100%', height:'5%' }} spacing={1}> {/*Carteles de alerta */}
                             {errorsLogin.email && typeof errorsLogin.email.message === 'string' && ( 
                            <Alert severity="error"  sx={{'.MuiAlert-icon': { fontSize: '20px' },'.MuiAlert-message': { fontSize: '10px' }}}
                            >{errorsLogin.email.message} </Alert>)}
                        </Stack>
                    </FormControl>
                    <div >
                    {/* Campo de contraseña */}
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        color="secondary" 
                        endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                            //Para poder ver la contraseña
                            aria-label={
                            showPassword ? 'hide the password' : 'display the password'}
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </InputAdornment>}
                        {...registerLogin('password')} // Registrar el campo contraseña para las validaciones
                    />
                        <Stack sx={{ width: '100%', height:'5%' }} spacing={3}>
                             {errorsLogin.password && typeof errorsLogin.password.message === 'string' && (
                            <Alert severity="error"  sx={{'.MuiAlert-icon': { fontSize: '20px' },'.MuiAlert-message': { fontSize: '10px' }}}
                            >{errorsLogin.password.message} </Alert>)}
                        </Stack>
                </FormControl>
                </div>
                </div>
            {/*Opciones para registro y recuperación de contraseña*/}
            <div className={Style.container3}>
                <a className={Style.text} href="/appsRami/cambioContraseña">¿Olvidaste tu contraseña?</a>

                <button type="submit" className={Style.button}>
                   {loading ? 'Cargando..': 'Ingresar'}
                </button>
            </div>
        </form>            
    </div>
</div>     
    );
};
export default Login;


