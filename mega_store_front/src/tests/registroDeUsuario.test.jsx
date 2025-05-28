import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "../pages/register/register";
import {RegisterProvider } from "../contexts/RegisterContext";
import { MemoryRouter } from "react-router-dom"; //
import { NotificationProvider } from '../contexts/NotificacionContext';

describe ('Register component', ()=>{
    test ('U8F-001: Existencia de campos de formulario', ()=>{
        render(
            <NotificationProvider>
            <MemoryRouter>
                <RegisterProvider>
                    <Register /> 
                </RegisterProvider>    
            </MemoryRouter>
            </NotificationProvider>
           
          );
    const inputName = screen.getByLabelText('Nombre');
    const inputEmail = screen.getByLabelText("Email");
    const inputPassword= screen.getByLabelText("Contraseña")
    const inputConfirmation = screen.getByLabelText("Confirmar contraseña")
    const inputAddress = screen.getByLabelText("Dir envío")
    const inputPhone = screen. getByLabelText("Teléfono")
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(inputConfirmation).toBeInTheDocument();
    expect(inputAddress).toBeInTheDocument();
    expect(inputPhone).toBeInTheDocument();
    });
});