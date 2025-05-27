import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Perfil from "../pages/perfil/perfil";
import { MemoryRouter } from "react-router-dom";
import { PerfilProvider } from "../contexts/PerfilContext";
// Mock para el avatar para que no falle en test y lo considere como una imagen
jest.mock("../components/avatar/fotoPerfil.tsx", () => (props) => {
  return <img {...props} />;
});

describe("Actualización de información personal", () => {
  test("U9-001: Validar que nombre sea un campo obligatorio", async () => {
    render(
      <PerfilProvider>
        <Perfil />
      </PerfilProvider>
    );

    //Seleccionamos el campo de nombre por su etiqueta
    const inputNombre = screen.getByLabelText("Nombre");
    fireEvent.change(inputNombre, { target: { value: "" } });

    //Buscamos el botón que guarda los cambios
    const botonGuardar = screen.getByRole("button", { name: /guardar/i });
    fireEvent.click(botonGuardar);

    //Esperamos encontrar el mensaje de error
    expect(
      await screen.findByText("Nombre no puede estar vacío.")
    ).toBeInTheDocument();
  });

  test("U9-003: Mostrar mensaje de error cuando nombre contenga espacios consecutivos.", async () => {
    render(
      <PerfilProvider>
        <Perfil />
      </PerfilProvider>
    );

    const inputNombre = screen.getByLabelText(/nombre/i);
    const botonGuardar = screen.getByRole("button", { name: /guardar/i });

    // Simular ingreso de nombre con espacios consecutivos
    fireEvent.change(inputNombre, { target: { value: "Luciana  Martinez" } });
    fireEvent.click(botonGuardar);

    // Verificar que se muestre el mensaje de error correcto
    expect(
      await screen.findByText("Nombre no puede contener espacios consecutivos")
    ).toBeInTheDocument();
  });
});
