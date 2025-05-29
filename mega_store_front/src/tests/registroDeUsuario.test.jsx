import '@testing-library/jest-dom';
import React from "react";
import { render,
        screen, 
        fireEvent} 
        from "@testing-library/react";
import Register from "../pages/register/register";
import {RegisterProvider } from "../contexts/RegisterContext";
import { MemoryRouter } from "react-router-dom"; //
import { NotificationProvider } from '../contexts/NotificacionContext';

describe ('Register component', ()=>{

    beforeEach(()=>render(
       <NotificationProvider>
            <MemoryRouter>
                <RegisterProvider>
                    <Register /> 
                </RegisterProvider>    
            </MemoryRouter>
        </NotificationProvider>
    ))

    test ('U8F-001: Existencia de campos de formulario', ()=>{
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

    test("U8F-002: Validación de campo email", async()=>{
        const input= screen.getByLabelText("Email")
        const button = screen.getByRole("button", {name:"Registrar"})
        fireEvent.change(input, {target:{value:"abril@gmail."}})
        fireEvent.click(button)
        const alert = await screen.findByTestId("EmailAlerts");
        expect(alert).toHaveTextContent("Formato inválido de email");
        
    })

    test ("U8F-003: Validación de campos obligatorios", async()=>{
        const inputName = screen.getByLabelText('Nombre');
        const inputEmail = screen.getByLabelText("Email");
        const inputPassword= screen.getByLabelText("Contraseña")
        const inputConfirmation = screen.getByLabelText("Confirmar contraseña")
        const button = screen.getByRole("button", {name: "Registrar"})
        fireEvent.change(inputName, {target:{value:""}})
        fireEvent.change(inputEmail, {target:{value:""}})
        fireEvent.change(inputPassword, {target:{value:""}})
        fireEvent.change(inputConfirmation, {target:{value:""}})
        fireEvent.click(button)
        const alertEmail = await screen.findByTestId("EmailAlerts");
        const alertName = await screen.findByTestId("NameAlerts");
        const alertPassword = await screen.findByTestId("PasswordAlerts");
        const alertConfirmation = await screen.findByTestId("ConfirmationAlerts");
        expect(alertEmail).toHaveTextContent("Email no puede estar vacío");
        expect(alertName).toHaveTextContent("Nombre no puede estar vacío");
        expect(alertPassword).toHaveTextContent("Contraseña no puede estar vacío");
        expect(alertConfirmation).toHaveTextContent("Confirmación no puede estar vacío");
       
    })

    test("U8F-004: Funcionalidad de mostrar/ocultar contraseña", () => {
        const input= screen.getByLabelText("Contraseña")
        const button = screen.getByLabelText('display the password');
        expect(input).toHaveAttribute('type', 'password');
        fireEvent.click(button);
        expect(input).toHaveAttribute('type', 'text');
        const buttonHide = screen.getByLabelText('hide the password');
        fireEvent.click(buttonHide);
        expect(input).toHaveAttribute('type', 'password');
    });

    test("U8F-005: Funcionalidad de mostrar/ocultar confirmación de contraseña", () => {
        const input= screen.getByLabelText("Confirmar contraseña")
        const button = screen.getByLabelText('display the confirmation');
        expect(input).toHaveAttribute('type', 'password');
        fireEvent.click(button);
        expect(input).toHaveAttribute('type', 'text');
        const buttonHide = screen.getByLabelText('hide the confirmation');
        fireEvent.click(buttonHide);
        expect(input).toHaveAttribute('type', 'password');
    });

    test ("U8F-006: Validar longitud mínima de contraseña.", async()=>{
        const input = screen.getByLabelText("Contraseña");
        const button = screen.getByRole("button", {name: "Registrar"})
        fireEvent.change(input,{target:{value:"1234567"}})
        fireEvent.click(button)
        const alertPassword = await screen.findByTestId("PasswordAlerts");
        expect(alertPassword).toHaveTextContent(("Contraseña debe tener al menos 8 caracteres."));
      
    })

    test ("U8F-007: Validar existencia de mayúscula en contraseña.", async()=>{
        const input = screen.getByLabelText("Contraseña");
        const button = screen.getByRole("button", {name: "Registrar"})
        fireEvent.change(input,{target:{value:"hola1234"}})
        fireEvent.click(button)
        const alertPassword = await screen.findByTestId("PasswordAlerts");
        expect(alertPassword).toHaveTextContent(("La contraseña debe contener al menos una letra mayúscula."));
      
    })

    test ("U8F-008: Validar existencia de minúscula en contraseña.", async()=>{
        const input = screen.getByLabelText("Contraseña");
        const button = screen.getByRole("button", {name: "Registrar"})
        fireEvent.change(input,{target:{value:"HOLA1234"}})
        fireEvent.click(button)
        const alertPassword = await screen.findByTestId("PasswordAlerts");
        expect(alertPassword).toHaveTextContent(("La contraseña debe contener al menos una letra minúscula."));
    })
    
    test ("U8F-009: Validar existencia de número en contraseña.", async()=>{
        const input = screen.getByLabelText("Contraseña");
        const button = screen.getByRole("button", {name: "Registrar"})
        fireEvent.change(input,{target:{value:"holaHOLA"}})
        fireEvent.click(button)
        const alertPassword = await screen.findByTestId("PasswordAlerts");
        expect(alertPassword).toHaveTextContent(("La contraseña debe contener al menos un número."));
    })
});
