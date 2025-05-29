import React from "react";
import "@testing-library/jest-dom";
import { render, 
        screen, 
        fireEvent 
      } from "@testing-library/react";
import Perfil from "../pages/perfil/perfil";
import { PerfilProvider } from "../contexts/PerfilContext";



describe("Actualización de información personal", () => {
  
    beforeEach(()=>render(
      <PerfilProvider>
          <Perfil />
      </PerfilProvider>
    ))

    test("U9-001: Validar que nombre sea un campo obligatorio", async () => {
      const inputNombre = screen.getByLabelText("Nombre");
      const botonGuardar = screen.getByRole("button", { name: /guardar/i });
      fireEvent.change(inputNombre, { target: { value: "" } });
      fireEvent.click(botonGuardar);
      expect(
        await screen.findByText("Nombre no puede estar vacío.")
      ).toBeInTheDocument();
    });

    test("U9-003: Mostrar mensaje de error cuando nombre contenga espacios consecutivos.", async () => {
      const inputNombre = screen.getByLabelText(/nombre/i); //Arrange
      const botonGuardar = screen.getByRole("button", { name: /guardar/i });
      fireEvent.change(inputNombre, { target: { value: "Luciana  Martinez" } }); //act
      fireEvent.click(botonGuardar);
      expect( //assert
        await screen.findByText("Nombre no puede contener espacios consecutivos")
      ).toBeInTheDocument();
    });
  });
