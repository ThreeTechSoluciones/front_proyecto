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
import { toast } from 'react-toastify';

// MOCKS AL INICIO

// Mock de react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  },
  ToastContainer: () => <div />,
}));

// Mock de la función que hace el POST
jest.mock('../service/CategoriaService', () => ({
  newCategoria: jest.fn().mockResolvedValue({
    data: { nombre: 'L' },
  }),
}));



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
 

test("U2-003: Mostrar mensaje de éxito al registrar categoría nueva", async () => {
  render(
    <CategoriaProvider>
      <RegistrarCategoria />
    </CategoriaProvider>
  );

  const input = screen.getByPlaceholderText("Categoría");
  const button = screen.getByRole("button", { name: "Registrar" });

  fireEvent.change(input, { target: { value: "L" } });
  fireEvent.click(button);

  await waitFor(() =>
    expect(toast.success).toHaveBeenCalledWith(
      "Categoria L registrada",
      expect.any(Object)
    )
  );
});
});
