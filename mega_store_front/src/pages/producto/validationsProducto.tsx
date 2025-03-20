
export const validarCampoRequerido = (valor: string): string => {
    return valor.trim() === '' ? 'Este campo es obligatorio*' : '';
};

export const validarAlfanumerico = (valor: string): string => {
    if (valor.trim() === '') return ''; // Permite valores vacíos
    const regex = /^[a-zA-Z0-9\s.,¡!áéíóúÁÉÍÓÚñÑ]+$/;
    return regex.test(valor) ? '': 'Contiene caracteres no permitidos';
};

export const validarLongitudCaracteres = (valor: string): string => {
     // Si el campo está vacío, no mostrar ningún mensaje de error
    if (valor.trim() === '') return '';
    const regex = /^[a-zA-Z0-9\s.,¡!áéíóúÁÉÍÓÚñÑ]{1,100}$/;
    return regex.test(valor) ? '' : 'Debe tener entre 1 y 100 caracteres'; 
};
 


export const desformatearPrecio = (valor: string): string => {
    // Elimina puntos (separadores de miles) y reemplaza comas decimales por puntos
    return valor.replace(/\./g, '').replace(',', '.');
};

// Función para validar si un número es positivo y tiene hasta dos decimales
export const validarDecimalPositivo = (valor: string): string => {
    // Desformatea el valor ingresado
    const valorSinFormato = desformatearPrecio(valor);
    const regex = /^[0-9]+(\.[0-9]{1,2})?$/; // Solo permite hasta dos decimales

    // Convierte el valor sin formato en un número
    const numberValue = parseFloat(valorSinFormato);

    // Verifica si el valor es mayor que 0 y si sigue el formato correcto
    return !regex.test(valorSinFormato) || numberValue <= 0
        ? 'Debe ser un número positivo entero o con hasta dos decimales'
        : ''; // Si pasa la validación, no muestra error
};


export const validarEnteroPositivo = (valor: string): string => {
     // Si el campo está vacío, no mostrar ningún mensaje de error
    if (valor.trim() === '') return '';
    
    const regex = /^[0-9]+$/; // Solo permite números enteros positivos o 0
    if (!regex.test(valor)) {
        return 'Debe ser un número positivo o cero';
    }

    return '';
};

export const validarStockMedio = (stockMedio: string, stockMinimo: string): string => {
        const stockMedioNum = parseInt(stockMedio, 10);
        const stockMinimoNum = parseInt(stockMinimo, 10);

        if (isNaN(stockMedioNum) || isNaN(stockMinimoNum)) {
            return 'Valores inválidos'; // Manejo de datos no numéricos
        }
    
        if (stockMedioNum <= stockMinimoNum) {
            console.log('Error porque el stock medio no es mayor que el mínimo');
            return 'El stock medio debe ser mayor que el stock mínimo';
        }
    
        return ''; // Sin errores
    };

//Validacion para las opciones a seleccionar (categoría)
export const validarCampoSeleccionado = (valor: string): string => {
    return valor === '' ? 'Debe seleccionar una categoría' : '';
};

//Validaciones para la carga de imagen
export const validarImagenProducto = (archivo: File | null): string => {
    if (!archivo) {
        return 'Debe seleccionar una imagen';
    }

    const validExtensions = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5 MB en bytes

    if (!validExtensions.includes(archivo.type)) {
        return 'Formato no permitido. Solo se aceptan archivos .jpg y .png';
    }

    if (archivo.size > maxSize) {
        return 'El archivo es demasiado grande. El tamaño máximo es de 5 MB';
    }
    return ''; // Si no hay errores
};

export const validarPrecio = (valor: string): string => {
    // Primero eliminamos los puntos (separadores de miles) para verificar el número limpio
    const valorSinPuntos = valor.replace(/\./g, '');

    // Expresión regular para validar precios con dos decimales
    const regex = /^\d+(?:,\d{1,2})?$/; // Acepta números enteros o con hasta dos decimales
    
    // Verificar que el precio es válido y que el valor es positivo
    if (!regex.test(valorSinPuntos)) {
        return 'Debe ser un precio válido';
    }

    // Convertir el valor en número (sin los separadores de miles) y verificar si es mayor que 0
    const precio = parseFloat(valorSinPuntos.replace(',', '.'));
    if (precio <= 0) {
        return 'El precio debe ser mayor que cero';
    }

    return ''; // Si pasa la validación, no muestra error
};

// Función para formatear el precio
export const formatearPrecio = (valor: string): string => {
    // Eliminar todo lo que no sean números o comas
    const soloNumeros = valor.replace(/[^\d,]/g, '');
    
    // Si no tiene coma, simplemente lo devolvemos tal cual
    if (!soloNumeros.includes(',')) {
        return soloNumeros.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Formato de miles
    }
    
    // Si tiene coma, aseguramos el formato de los decimales
    let [entero, decimal] = soloNumeros.split(',');
    entero = entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Formato de miles
    
    // Limitar a 2 decimales
    decimal = decimal.substring(0, 2);
    
    return `${entero},${decimal}`;
};

//ESPECIFICACIONES
//(!!) convierte cualquier valor en un booleano, por eso !!errores.nombre devuleve un booleano
//!!'' → false
//!!'error' → true
//FORMATEO DE PRECIO
