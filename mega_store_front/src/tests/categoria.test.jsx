import React from "react";
import {
  screen,
  render,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import RegistrarCategoria from "../pages/categoria/registrarCategoria";
import {
  CategoriaProvider,
  useCategoriaContext,
} from "../contexts/CategoriaContext";
import "@testing-library/jest-dom";
import { ToastContainer } from "react-toastify";

describe("Categoría component", () => {
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

  test("U2-001: Validar campo de nombre como texto.", async () => {
    render(
      <CategoriaProvider>
        <RegistrarCategoria />
      </CategoriaProvider>
    );
    const input = screen.getByPlaceholderText("Categoría");
    const button = screen.getByRole("button", { name: "Registrar" });
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);
    expect(
      await screen.findByText("Categoría no puede estar vacío.")
    ).toBeInTheDocument();
  });
});
