import React from "react";
import {
  screen,
  render,
  fireEvent,
  getByPlaceholderText,
  getByRole,
} from "@testing-library/react";
import RegistrarCategoria from "../pages/categoria/registrarCategoria";
import {
  CategoriaProvider,
  useCategoriaContext,
} from "../contexts/CategoriaContext";
import "@testing-library/jest-dom";
import {ToastContainer } from 'react-toastify';
import { newCategoria } from "../service/CategoriaService";

jest.mock('../service/CategoriaService', () => ({
  newCategoria: jest.fn(),
}));



describe("Categoría component", () => {

 test ("U2-001: Validar caracteres no permitidos", async()=>{
    render(
      <CategoriaProvider>
        <RegistrarCategoria />
      </CategoriaProvider>
    );
    const input= screen.getByPlaceholderText("Categoría")
    const button = screen.getByRole ("button", {name:"Registrar"})
    fireEvent.change (input, {target:{value:"! # $ % & / ( ) = ? ¡ ¿ * + , ; : . _ - @ ^ ~ [ ] { } < > \ | )"}})
    fireEvent.click(button);
    expect(
      await screen.findByText("Categoría contiene caracteres no permitidos.")
    ).toBeInTheDocument();
 })


  test("U2-002: Verificar rechazo si la categoría ya está registrada", async () => {
    newCategoria.mockRejectedValueOnce({
      response: {
        status: 400,
        data: {
          message: "Error: Bad Request",
          data: null,
          errors: "Ya existe una categoría con ese nombre"
        }
      }
    });
  
    render(
      <CategoriaProvider>
        <RegistrarCategoria />
        <ToastContainer />
      </CategoriaProvider>
    );
  
    const input = screen.getByPlaceholderText("Categoría");
    const button = screen.getByRole("button", { name: "Registrar" });
    fireEvent.change(input, { target: { value: "L" } });
    fireEvent.click(button);
  
    expect(await screen.findByText(/Ya existe una categoría con ese nombre/i)).toBeInTheDocument();
  });

  test("U2-003: Registrar categoría con éxito", async () => {
    newCategoria.mockResolvedValue({
      
        response: {
          status: 200,
          data: { message: "OK",
            data:{ nombre: 'L' } ,
            errors: null}
        }
      
    });
    render(
      <CategoriaProvider>
        <RegistrarCategoria />
        <ToastContainer /> 
      </CategoriaProvider>
    );
    const input = screen.getByPlaceholderText("Categoría");
    const button = screen.getByRole("button", { name: "Registrar" });
    fireEvent.change(input, { target: { value: "L" } });
    fireEvent.click(button);
    expect(await screen.findByText("Categoria L registrada")).toBeInTheDocument();
  });


  test("U2-006: Validar longitud de campo.", async () => {
    render(
      <CategoriaProvider>
        <RegistrarCategoria />
      </CategoriaProvider>
    );
    const input = screen.getByPlaceholderText("Categoría");
    const button = screen.getByRole("button", { name: "Registrar" });
    fireEvent.change(input, { target: { value: "a".repeat(101) } });
    fireEvent.click(button);
    expect(
      await screen.findByText("Categoría no puede superar los 100 caracteres")
    ).toBeInTheDocument();
  });

  test ("U2F-007: Validar campo como obligatorio", async()=>{
    render(
      <CategoriaProvider>
        <RegistrarCategoria />
      </CategoriaProvider>
    );
    const input = screen.getByPlaceholderText("Categoría")
    const button = screen.getByRole("button", {name:"Registrar"})
    fireEvent.change(input,{target:{value:""}});
    fireEvent.click(button);
    expect(
      await screen.findByText("Categoría no puede estar vacío.")
    ).toBeInTheDocument();
  })
});
