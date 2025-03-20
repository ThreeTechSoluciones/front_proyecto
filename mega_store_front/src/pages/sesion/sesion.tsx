import { useEffect, useState } from "react";
import Login from '../login/login'; 
import Register from '../register/register'; 
import Style from "./sesion.module.css";

const Sesion: React.FC = () => {
   
        // Definir el tipo explícito para el estado 'formType' 
        const [formType, setFormType] = useState<'login' | 'register' | null>(null);
      
        // Función para cambiar el formulario a Login
        const handleLoginClick = () => {
          setFormType('login');
        };
      
        // Función para cambiar el formulario a Register
        const handleRegisterClick = () => {
          setFormType('register');
        };
        useEffect(() => {
          setFormType('login');
        }, []); 

    return (
      
    <div className={Style.screen}>
    <div className={Style.container}>
        {/* Botones para cambiar el formulario */}
        <button onClick={handleLoginClick} className={Style.text }>Iniciar sesión</button>
        <button onClick={handleRegisterClick} className={Style.text}>Registrarse</button>
    </div>
        {/* Renderizar el formulario correspondiente según el estado */}
        <div className={Style.container2}>
          {formType === 'login' && <Login />}
          {formType === 'register' && <Register />}
        </div>
      </div>
    );
  };
  
  export default Sesion;
  