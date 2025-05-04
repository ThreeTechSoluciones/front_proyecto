import React from "react";
import {screen, render, fireEvent} from  '@testing-library/react';
import RegistrarCategoria from "../pages/categoria/registrarCategoria";
import { CategoriaProvider } from "../contexts/CategoriaContext";
import '@testing-library/jest-dom';

describe ('Categoría component',()=>{
    test ('Límite de 100 caracteres', async()=>{
        render (
        <CategoriaProvider>
            <RegistrarCategoria/>
        </CategoriaProvider>
        )
        const input = screen.getByPlaceholderText("Categoría");
        const button = screen.getByRole ('button', {name: "Registrar" })
        fireEvent.change(input, { target: { value: "a".repeat(101) } });
        fireEvent.click(button);
        expect(await screen.findByText('Categoría no puede superar los 100 caracteres')).toBeInTheDocument();

    })
})