import { render, screen } from '@testing-library/react';
import Login from '../pages/login/login'
import '@testing-library/jest-dom';
import React from "react";
import { AuthProvider } from "../contexts/LoginContext";
import { MemoryRouter } from "react-router-dom";
import { CarritoProvider } from "../contexts/CarritoContext";
describe ('RecupContraseña component', ()=>{

  beforeEach(()=>render(
         <MemoryRouter>
              <CarritoProvider>
                <AuthProvider>
                  <Login />
                </AuthProvider>
              </CarritoProvider>
            </MemoryRouter>
      ))
    test ('El enlace de recuperación se encuentra en el documento', ()=>{
        const linkRecuperacion = screen.getByRole('link', {name:'¿Olvidaste tu contraseña?'});
        expect (linkRecuperacion).toBeInTheDocument();
    });
});