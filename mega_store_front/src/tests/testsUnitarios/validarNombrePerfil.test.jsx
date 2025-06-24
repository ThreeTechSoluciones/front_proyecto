import { validationsPerfil } from "../../pages/perfil/validationsPerfil";

describe("validationsPerfil - nombre", () => {
  const schema = validationsPerfil;

  const baseData = {
    email: "luciana@email.com",
    direccionEnvio: "calle 123",
    numeroTelefono: "12345678",
  };

  //test unitario para la validación de campo obligatorio
  test("rechaza nombre vacío", () => {
    const result = schema.safeParse({ nombre: "" });
    expect(result.success).toBe(false);
    expect(result.error?.format().nombre?._errors[0]).toBe(
      "Nombre no puede estar vacío."
    );
  });

  //test unitario para la validación del campo nombre en donde se rechazan los espacios dobles
  test("rechaza nombre con espacios dobles", () => {
    const result = schema.safeParse({ nombre: "Luciana  Martinez" });
    expect(result.success).toBe(false);
    expect(result.error?.format().nombre?._errors[0]).toBe(
      "Nombre no puede contener espacios consecutivos"
    );
  });
});
