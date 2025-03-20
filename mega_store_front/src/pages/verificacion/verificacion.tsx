import styled from 'styled-components';
import style from './verificacion.module.css';
import { useRegister } from '../../contexts/RegisterContext';
import { Reenviar } from '../../service/RegisterService';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

// Definición del componente StyledWrapper
const StyledWrapper = styled.div`
    display: flex;
    gap: 8px;
`;
interface Props {
    onCerrar?: () => void;
}

const CodigoVerificacion: React.FC<Props> = ({ onCerrar }) => {

    const {VerificarUsuario, loading, email, reenviarCodi}=useRegister()
    //Función para que el cursor cambie al siguiente input cuando se ingresa un numero.
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentInput = e.target;
        const maxLength = currentInput.maxLength;
    
        if (currentInput.value.length === maxLength) {
            const nextInput = document.getElementById(
            `otp-input${parseInt(currentInput.id.split("otp-input")[1], 10) + 1}`
        ) as HTMLInputElement | null;
    
        if (nextInput) {
            nextInput.focus();
        }
        }
    };

    //Función para retroceder al input anterior al borrar
    const handleBorrar = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const currentInput = e.currentTarget;
    
        // Detectar si se presionó Backspace y el input está vacío
        if (e.key === "Backspace" && currentInput.value === "") {
            const prevInput = document.getElementById(
            `otp-input${parseInt(currentInput.id.split("otp-input")[1], 10) - 1}`
        ) as HTMLInputElement | null;
    
        if (prevInput) {
            prevInput.focus();
        }
        }
    };

    const obtenerCodigo = () => {

        const codigoVerificacion = Array.from({ length: 6 }, (_, i) => {
            const input = document.getElementById(`otp-input${i + 1}`) as HTMLInputElement | null;
            return input ? input.value : '';
        }).join('');

    
        const datosUsuario = {
            email: email,
            codigoVerificacion: codigoVerificacion
        };
    
        console.log('Datos a verificar:', datosUsuario);
        VerificarUsuario(datosUsuario);
    };

    const reenviar = ()=>{
        const datos: Reenviar = { email };  // Crear un objeto con la estructura de la interfaz
        reenviarCodi(datos);
    } 

    return (
        <StyledWrapper>
        <form className={style.verif} onSubmit={(e) => { e.preventDefault(); obtenerCodigo(); }}>
            <span className={style.mainHeading}>Código de verificación</span>
            <p className={style.otpSubheading}>Te enviamos un código de verificación al mail registrado.</p>
            <div className={style.inputContainer}>
                <input 
                required 
                maxLength={1} 
                type="text" 
                className={style.otpinput} 
                id="otp-input1" 
                onInput={handleInput} 
                onKeyDown={handleBorrar}
                pattern="[a-zA-Z0-9]" 
                title="Solo se permiten letras y números"
                />
                <input 
                required 
                maxLength={1} 
                type="text" 
                className={style.otpinput} 
                id="otp-input2" 
                onInput={handleInput} 
                onKeyDown={handleBorrar}
                pattern="[a-zA-Z0-9]" 
                title="Solo se permiten letras y números"
                />
                <input 
                required 
                maxLength={1} 
                type="text" 
                className={style.otpinput} 
                id="otp-input3" 
                onInput={handleInput} 
                onKeyDown={handleBorrar}
                pattern="[a-zA-Z0-9]" 
                title="Solo se permiten letras y números"
                />
                <input 
                required 
                maxLength={1} 
                type="text" 
                className={style.otpinput} 
                id="otp-input4" 
                onInput={handleInput} 
                onKeyDown={handleBorrar}
                pattern="[a-zA-Z0-9]" 
                title="Solo se permiten letras y números"
                /> 
                <input 
                required 
                maxLength={1} 
                type="text" 
                className={style.otpinput} 
                id="otp-input5" 
                onInput={handleInput} 
                onKeyDown={handleBorrar}
                pattern="[a-zA-Z0-9]" 
                title="Solo se permiten letras y números"
                /> 
                <input 
                required 
                maxLength={1} 
                type="text" 
                className={style.otpinput} 
                id="otp-input6" 
                onInput={handleInput} 
                onKeyDown={handleBorrar}
                pattern="[a-zA-Z0-9]" 
                title="Solo se permiten letras y números"
                /> 
            </div>
            <button className={style.verifyButton} type="submit">Verificar</button>
            
            <p className={style.resendNote}>¿No recibiste el código? <button className={style.resendBtn} onClick={()=>reenviar()}>Reenviar Código</button></p>
            {loading && 
                <Stack sx={{ width: '100%', color: 'grey.500', marginTop:'0px' }} spacing={2}>
                    <LinearProgress color="secondary" />
                </Stack>
            }
        </form>
        <button className={style.exitBtn} onClick={() =>  onCerrar?.()}>X</button>
        </StyledWrapper>
    );
}

export default CodigoVerificacion;


