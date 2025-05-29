import React from "react";
import {
  screen,
  render,
  fireEvent,
  } from "@testing-library/react";
import RegistrarCategoria from "../pages/categoria/registrarCategoria";
import {CategoriaProvider} from "../contexts/CategoriaContext";
import "@testing-library/jest-dom";
import {ToastContainer } from 'react-toastify';
import { 
  newCategoria ,
  getCategorias
  } from "../service/CategoriaService";


jest.mock('../service/CategoriaService', () => ({
  newCategoria: jest.fn(),
  getCategorias:jest.fn(),
}));



describe("Categoría component", () => {

  beforeEach(()=>render(
      <CategoriaProvider>
          <RegistrarCategoria />
        <ToastContainer />
      </CategoriaProvider>
    ))


  test ("U2F-001: Validar caracteres no permitidos", async()=>{
    const input= screen.getByPlaceholderText("Categoría")
    const button = screen.getByRole ("button", {name:"Registrar"})
    fireEvent.change (input, {target:{value:"! # $ % & / ( ) = ? ¡ ¿ * + , ; : . _ - @ ^ ~ [ ] { } < > \ | )"}})
    fireEvent.click(button);
    const alert = await screen.findByTestId("CategoryAlerts");
    expect(alert).toHaveTextContent("Categoría contiene caracteres no permitidos.");
 })


  test("U2F-002: Verificar rechazo si la categoría ya está registrada", async () => {
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
    const input = screen.getByPlaceholderText("Categoría");
    const button = screen.getByRole("button", { name: "Registrar" });
    fireEvent.change(input, { target: { value: "L" } });
    fireEvent.click(button);
    expect(await screen.findByText(/Ya existe una categoría con ese nombre/i)).toBeInTheDocument();
  });


  test("U2F-003: Registrar categoría con éxito", async () => {
    newCategoria.mockResolvedValue({
          status: 200,
          message: "Categoria guardada",
          errors: null,
          data:{ nombre: 'Remeras' } ,   
    });
    getCategorias.mockResolvedValue({
          status: 200,
          message: "OK",
          errors: null,
          data: [{nombre: 'Categoría Remeras registrada'}]  ,    
    });
    const input = screen.getByPlaceholderText("Categoría");
    const button = screen.getByRole("button", { name: "Registrar" });
    fireEvent.change(input, { target: { value: "Remeras" } });
    fireEvent.click(button);
    const nameCategory = await screen.findByTestId("CategoryName");
    expect(await nameCategory).toHaveTextContent("Remeras");
    expect(await screen.findByText("Categoría Remeras registrada")).toBeInTheDocument();
  });


  test("U2F-006: Validar longitud de campo.", async () => {
    const input = screen.getByPlaceholderText("Categoría");
    const button = screen.getByRole("button", { name: "Registrar" });
    fireEvent.change(input, { target: { value: "a".repeat(101) } });
    fireEvent.click(button);
    const alert = await screen.findByTestId("CategoryAlerts");
    expect(alert).toHaveTextContent("Categoría no puede superar los 100 caracteres");
  });

  test ("U2F-007: Validar campo como obligatorio", async()=>{
    const input = screen.getByPlaceholderText("Categoría")
    const button = screen.getByRole("button", {name:"Registrar"})
    fireEvent.change(input,{target:{value:""}});
    fireEvent.click(button);
    const alert = await screen.findByTestId("CategoryAlerts");
    expect(alert).toHaveTextContent("Categoría no puede estar vacío");
  })
});
