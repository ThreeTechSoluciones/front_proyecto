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

    test("U8F-002: Validación de campo email", async()=>{
        render(
            <NotificationProvider>
            <MemoryRouter>
                <RegisterProvider>
                    <Register /> 
                </RegisterProvider>    
            </MemoryRouter>
            </NotificationProvider>
        )
        const input= screen.getByLabelText("Email")
        const button = screen.getByRole("button", {name:"Registrar"})
        fireEvent.change(input, {target:{value:"abril@gmail."}})
        fireEvent.click(button)
        expect(
            await screen.findByText("Formato inválido de email")
        ).toBeInTheDocument()

    })

    test ("U8F-003: Validación de campos obligatorios", async()=>{
         render(
            <NotificationProvider>
            <MemoryRouter>
                <RegisterProvider>
                    <Register /> 
                </RegisterProvider>    
            </MemoryRouter>
            </NotificationProvider>
        )
        const inputName = screen.getByLabelText('Nombre');
    const inputEmail = screen.getByLabelText("Email");
    const inputPassword= screen.getByLabelText("Contraseña")
    const inputConfirmation = screen.getByLabelText("Confirmar contraseña")
    const button = screen.getByRole("button", {name: "Registrar"})
        fireEvent.change(inputEmail, {target:{value:""}})
        fireEvent.change(inputPassword, {target:{value:""}})
        fireEvent.change(inputConfirmation, {target:{value:""}})
        fireEvent.click(button)
        expect(await screen.findByText("Email no puede estar vacío.")).toBeInTheDocument()
        expect(await screen.findByText("Nombre no puede estar vacío.")).toBeInTheDocument()
        expect(await screen.findByText("Contraseña no puede estar vacío.")).toBeInTheDocument()
        expect(await screen.findByText("Confirmación no puede estar vacío.")).toBeInTheDocument()

})
test("U8F-004: Funcionalidad de mostrar/ocultar contraseña", () => {
    render(
   <NotificationProvider>
            <MemoryRouter>
                <RegisterProvider>
                    <Register /> 
                </RegisterProvider>    
            </MemoryRouter>
            </NotificationProvider>
    )
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
    render(
   <NotificationProvider>
            <MemoryRouter>
                <RegisterProvider>
                    <Register /> 
                </RegisterProvider>    
            </MemoryRouter>
            </NotificationProvider>
    )
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
    render(
   <NotificationProvider>
            <MemoryRouter>
                <RegisterProvider>
                    <Register /> 
                </RegisterProvider>    
            </MemoryRouter>
            </NotificationProvider>
    )
    const input = screen.getByLabelText("Contraseña");
    const button = screen.getByRole("button", {name: "Registrar"})
    fireEvent.change(input,{target:{value:"1234567"}})
    fireEvent.click(button)
    expect (
        await screen.findByText ("Contraseña debe tener al menos 8 caracteres.")
    ).toBeInTheDocument();

})
});
