import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import validationsRegister from "./validationsRegister";
import Style from "./register.module.css";
import React, { useState } from "react";
import {Box, FormControl, IconButton, Input, InputAdornment, InputLabel,TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CodigoVerificacion from "../verificacion/verificacion";
import Dialog from '@mui/material/Dialog'; // Dialog (se usa como un modal)
import DialogContent from '@mui/material/DialogContent'; // Contenido del modal de Material UI
import '../verificacion/verificacion.module.css';
import { useRegister} from "../../contexts/RegisterContext";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';


const Register: React.FC = () => {
    const {Registrar, loading, loadingVerificacion, setearEmail, cerrarModal}=useRegister()
    
    const [showPassword, setShowPassword] = React.useState(false);

    
    const [showConfirmation, setShowConfirmation] = React.useState(false);

    const handleClickShowConfirmation = () => setShowConfirmation((show) => !show);
      
    const [, setDialogOpen] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {event.preventDefault();};
    
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {event.preventDefault();};
    // Configurar el formulario de registro
    const { register: registerRegister, handleSubmit: handleSubmitRegister, formState: { errors: errorsRegister } } = useForm({
        resolver: zodResolver(validationsRegister), // Usar el esquema de validación para el registro
    });

    // Función para manejar el envío del formulario de registro
    const onSubmitRegister = (data: any) => {
        const dataWithRole = { ...data, rolId: 4 };  // Agrega el atributo rol con valor 4
        console.log('data', dataWithRole);
        const email = data.email; 
        Registrar(dataWithRole)
        setearEmail(email)
        console.log('email register', email)
    };
    
   

    const handleCerrarForm = () => {
        cerrarModal()
    };
    
    return (
    <div className={Style.screen}>

        <div className={Style.container}>
        {/* FORMULARIO DE REGISTRO */}
        <form className={Style.registerForm} onSubmit={handleSubmitRegister(onSubmitRegister)}>
            <h2>Registrarse</h2>
            {/* NOMBRE */}
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            ><TextField 
                id="standard-basic" 
                label="Nombre" 
                variant="standard"
                type="text" 
                {...registerRegister('nombre')} />
            </Box>
            {errorsRegister.nombre && typeof errorsRegister.nombre.message === 'string' && (<p className={Style.alerts}>{errorsRegister.nombre.message}</p>)}
            {/* EMAIL*/}
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            ><TextField 
                id="standard-basic" 
                variant="standard"
                label="Email"
                type="text" 
                {...registerRegister('email')} // Registrar el campo email
            />
            
            </Box>
            {errorsRegister.email && typeof errorsRegister.email.message === 'string' && (<p className={Style.alerts}>{errorsRegister.email.message}</p>)}
            {/* CONTRASEÑA */}
            <div >
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
        {...registerRegister('password')} // Registrar el campo contraseña
    />
</FormControl>
{errorsRegister.password && typeof errorsRegister.password.message === 'string' && (<p className={Style.alerts}>{errorsRegister.password.message}</p>)}
                
            {/*CONFIRMACIÓN CONTRASEÑA*/}
            <div className={Style.container2}>
                <div>
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
{errorsRegister.confirmacion && typeof errorsRegister.confirmacion.message === 'string' && (<p className={Style.alerts}>{errorsRegister.confirmacion.message}</p>)}
    </div>
            </div>
            {/*DIRECCIÓN DE ENVÍO*/} 
            <div className={Style.container2}>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '12ch' } }}
                noValidate
                autoComplete="off"
            ><TextField 
                id="standard-basic" 
                variant="standard"
                label="Dir envío"
                type="text" 
                {...registerRegister('direccionEnvio')} // Registrar el campo nombre
            />
            {errorsRegister.direccionEnvio && typeof errorsRegister.direccionEnvio.message === 'string' && (<p className={Style.alerts}>{errorsRegister.direccionEnvio.message}</p>)}

            </Box> 
                
            {/*TELÉFONO*/}
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '12ch' } }}
                noValidate
                autoComplete="off"
            ><TextField 
                id="standard-basic" 
                variant="standard"
                label="Teléfono"
                type="text" 
                {...registerRegister('telefono')} // Registrar el campo nombre
            />
            </Box> 
            
            </div>
            {errorsRegister.telefono && typeof errorsRegister.telefono.message === 'string' && (<p className={Style.alertsTel}>{errorsRegister.telefono.message}</p>)}
            
            </div>
        </div>
            <button type="submit" className={Style.button}>Registrar</button>
            
            {loading && 
                <Stack sx={{ width: '100%', color: 'grey.500', marginTop:'20px' }} spacing={2}>
                    <LinearProgress color="secondary" />
                </Stack>
            }
            

        </form>
    </div> 

    {/* Dialog para el formulario del codigo de verificacion */}

    <Dialog 
    open={loadingVerificacion}
    onClose={() => setDialogOpen(false)} 
    PaperProps={{
        className: 'verif', // se aplican los estilos CSS de .verif
    }}
    >
        <DialogContent>
        <CodigoVerificacion onCerrar={handleCerrarForm}/>{/* Es el formulario del codigo de verificacion */}
        </DialogContent>
    </Dialog>
</div>       
);
};

export default Register;