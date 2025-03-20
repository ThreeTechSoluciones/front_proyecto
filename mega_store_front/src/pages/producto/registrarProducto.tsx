import style from './registrarProducto.module.css';
import React, { useEffect, useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { validarAlfanumerico, validarDecimalPositivo, validarEnteroPositivo, validarStockMedio, validarCampoRequerido, 
    validarCampoSeleccionado, validarImagenProducto, formatearPrecio, validarLongitudCaracteres, validarPrecio } from './validationsProducto';
//import { Producto } from './interfazProducto';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import { useCategoria } from '../../contexts/CategoriaContext';
import { useMarca } from '../../contexts/MarcaContext';
import { useSucursales } from '../../contexts/SucursalContext';
import { useTalle } from '../../contexts/TalleContext';
import { useColor } from '../../contexts/ColorContext';
import { useProductos } from '../../contexts/ProductoContext';



interface Sucursal {
    id?:number,
    nombre: string;
}

const RegistrarProducto = () => {
    //CONJUNTO EXTRAIDOS DE LOS CONTEXT
    const{fetchProductos,postProducto}=useProductos()
    const {categorias, fetchCategorias} = useCategoria()
    const {sucursales, fetchSucursales} = useSucursales()
    const {marcas, fetchMarcas}=useMarca()
    const {talles, fetchTalles} = useTalle()
    const {colores, fetchColores} = useColor()

    useEffect(()=>{
        fetchCategorias()
        fetchSucursales()
        fetchColores()
        fetchMarcas()
        fetchTalles()
    },[])
    // Estados para almacenar las selecciones del formulario
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [peso, setPeso] = useState('');
    const [categoria, setCategoria] = useState('');
    const [marca, setMarca] = useState('');
    const [talle, setTalle] = useState('');
    const [color, setColor] = useState('');
    const [stockActual, setStockActual] = useState('');
    const [stockMedio, setStockMedio] = useState('');
    const [stockMinimo, setStockMinimo] = useState('');
    const [foto, setFoto] = useState<File | null>(null);  // Estado para almacenar la imagen
    const [preview, setPreview] = useState<string | null>(null);  // Estado para la previsualización 
    const [fileName, setFileName] = useState('');  // Para mostrar el nombre del archivo seleccionado
    const [selectedSucursal, setSelectedSucursal] = useState<Sucursal[] | null>(null);
    const [errores, setErrores] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        peso: '',
        stockActual: '',
        stockMedio: '',
        stockMinimo: '',
        categoria: '',
        foto: '',
    });

    

    // Función para el envío del formulario
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Validaciones
        const errores = {
            nombre: validarCampoRequerido(nombre) || validarAlfanumerico(nombre) || validarLongitudCaracteres(nombre),
            descripcion: validarAlfanumerico(descripcion) || validarLongitudCaracteres(descripcion),
            precio: validarCampoRequerido(precio) || validarDecimalPositivo(precio) || validarPrecio(precio),
            peso: validarCampoRequerido(peso) || validarDecimalPositivo(peso),
            stockActual: validarEnteroPositivo(stockActual),
            stockMedio: validarCampoRequerido(stockMedio) || validarEnteroPositivo(stockMedio) || validarStockMedio(stockMedio, stockMinimo),
            stockMinimo: validarCampoRequerido(stockMinimo) || validarEnteroPositivo(stockMinimo) || validarStockMedio(stockMedio, stockMinimo),
            categoria: validarCampoSeleccionado(categoria),
            foto: validarImagenProducto(foto), // Valida la imagen del producto
        };
        setErrores(errores);
        // Chequear si hay errores
        const sinErrores = Object.values(errores).every(error => error === '');

        if (sinErrores) {
            //HACEMOS EL POST
           
            armarFormData();
            // Limpiar los campos del formulario
            setNombre('');
            setDescripcion('');
            setPrecio('');
            setPeso('');
            setCategoria('');
            setSelectedSucursal([]);
            setMarca('');
            setTalle('');
            setColor('');
            setStockActual('');
            setStockMedio('');
            setStockMinimo('');
            setFoto(null);
            setPreview(null);
            setFileName('');
            

        } else {
            console.log('Errores en el formulario');
        }
        // Lógica para enviar los datos al backend y si no hay errores sigue.
    };

    const armarFormData = ()=>{
    const formData = new FormData();

    // Agregar los valores de cada campo al FormData
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("peso", peso);
    formData.append("stockMedio", stockMedio);
    formData.append("stockMinimo", stockMinimo);
    formData.append("categoriaId", categoria);
    formData.append("sucursales", selectedSucursal?.map(s =>s.id).join(',') || ''); // Para múltiples sucursales
    formData.append("marcaId", marca);
    formData.append("talleId", talle);
    formData.append("colorId", color);
    
    // Verificar si se seleccionó una imagen y agregarla
    if (foto && foto instanceof File) {
        formData.append('imagen', foto);
    }

    // Llamar a la función postProducto con el formData
    console.log('Contenido de FormData:');
    for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
        }
    
    postProducto(formData);
    fetchProductos(0,12,"id,asc")
    }

    // Función para manejar la carga de imagen y la previsualización
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];  // Obtenemos el primer archivo seleccionado
        if (file) {
            setFoto(file);  //Se guarda el archivo en el estado
            setFileName(file.name); //Se guarda el nombre del archivo

            // FileReader: para mostrar la previsualización de la imagen
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);  //Se guarda el resultado de la lectura como previsualización
            };
            reader.readAsDataURL(file);  // Lee el archivo como una URL de datos
        }
    };

    const handlePrecioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;

        // Eliminar cualquier cosa que no sea números o comas
        const soloNumeros = valor.replace(/[^\d,]/g, '');

        setPrecio(soloNumeros); // Actualizar el precio sin formato
    };

    const handleInputChange = (setState: React.Dispatch<React.SetStateAction<string>>) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const valor = e.target.value;
    
            // Eliminar cualquier cosa que no sea números enteros
            const soloEnteros = valor.replace(/\D/g, '');  // \D reemplaza todo lo que no sea un número
    
            setState(soloEnteros); // Actualizar el estado con el valor filtrado
        };
    };


    return (
        <div className={style.container}>
            <h1>Registrar Producto</h1>
            <form className={style.form} onSubmit={handleSubmit}>
                {/* Campo para ingresar el nombre del producto */}
                <TextField
                    className={style.input}
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    error={!!errores.nombre}
                    helperText={errores.nombre}
                    margin="normal"
                />
                {/* Campo para ingresar la descripción del producto */}
                <TextField
                    className={style.input}
                    label="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    error={!!errores.descripcion}
                    helperText={errores.descripcion}
                    margin="normal"
                />

                <TextField 
                    className={style.input}
                    label="Precio"
                    value={formatearPrecio(precio)}
                    error={!!errores.precio}
                    helperText={errores.precio}
                    margin="normal"
                    variant="standard"
                    onChange={handlePrecioChange}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                $
                            </InputAdornment> // Muestra el símbolo $
                            )
                        }
                    }}
                />
                

                <TextField
                    className={style.input}
                    label="Peso en gramos"
                    value={peso}
                    onChange={handleInputChange(setPeso)}
                    error={!!errores.peso}
                    helperText={errores.peso}
                    margin="normal"
                
                />
                {/* Select para Categoría */}
                <FormControl fullWidth margin="normal">
                    <InputLabel className={style.input} id="categoria-label">Categoría</InputLabel>
                    <Select
                        labelId="categoria-label"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        label="Categoría"
                    >
                        {categorias.map((cat, index) => (
                            <MenuItem key={index} value={cat.id}>
                                {cat.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                    {errores.categoria && <p className={style.error}>{errores.categoria}</p>}
                </FormControl>

                {/* Select para Sucursal */}
                <FormControl fullWidth margin="normal">
                    <Autocomplete
                        className={style.input}
                        id="sucursal-label"
                        multiple
                        options={sucursales}
                        getOptionLabel={(option) => option.nombre}
                        value={selectedSucursal || []}
                        onChange={(_, newValue) => setSelectedSucursal(newValue)} 
                        // defaultValue={[opcionesSucursal[2], opcionesSucursal[1]]} // Asegúrate de que el índice sea válido
                        renderInput={(params) => (
                            <TextField {...params} label="Sucursal"/>
                        )}
                    />
                </FormControl>

                {/* Select para Marca */}
                <FormControl fullWidth margin="normal">
                    <InputLabel className={style.input} id="marca-label">Marca</InputLabel>
                    <Select
                        labelId="marca-label"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        label="Marca"
                    >
                        {marcas.map((m, index) => (
                            <MenuItem key={index} value={m.id}>
                                {m.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                {/* Select para Talle */}
                <FormControl fullWidth margin="normal">
                    <InputLabel className={style.input} id="talle-label">Talle</InputLabel>
                    <Select
                        labelId="talle-label"
                        value={talle}
                        onChange={(e) => setTalle(e.target.value)}
                        label="Talle"
                    >
                        {talles.map((t, index) => (
                            <MenuItem key={index} value={t.id}>
                                {t.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Select para Color */}
                <FormControl fullWidth margin="normal">
                    <InputLabel className={style.input} id="color-label">Color</InputLabel>
                    <Select
                        labelId="color-label"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        label="Color"
                    >
                        {colores.map((c, index) => (
                            <MenuItem key={index} value={c.id}>
                                {c.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/*campo para el stock actual*/}
                

                {/*campo para el stock medio*/}
                <TextField
                    className={style.input}
                    label="Stock Medio"
                    value={stockMedio}
                    onChange={handleInputChange(setStockMedio)}
                    error={!!errores.stockMedio}
                    helperText={errores.stockMedio}
                    margin="normal"
                />
                {/*campo para el stock mínimo*/}
                <TextField
                    className={style.input}
                    label="Stock Mínimo"
                    value={stockMinimo}
                    onChange={handleInputChange(setStockMinimo)}
                    error={!!errores.stockMinimo}
                    helperText={errores.stockMinimo}
                    margin="normal"
                />

                 {/* Campo personalizado para subir archivo */}
        <FormControl fullWidth error={!!errores.foto} margin="normal">
            <input
                type="file"
                accept="image/jpeg, image/png" // Solo .jpg o .jpeg y .png
                id="file-upload"
                style={{ display: 'none' }}  // Ocultamos el input original
                onChange={handleImageChange}
            />
            <label htmlFor="file-upload">
            <Button 
            sx={{
            alignItems:'center',
            backgroundColor: '#c49dd7', // Color lila
            color: 'white',
            '&:hover': {
            backgroundColor: '#b284c4', // Color lila más oscuro al pasar el mouse
            },
            }}
            variant="contained"
            component="span"  // Actúa como disparador del input
            >
            {fileName || 'Cargar imagen'}
                    </Button>
                    </label>
                    {errores.foto && <p className={style.error}>{errores.foto}</p>}
            </FormControl>

            {/* Previsualización de la imagen seleccionada */}
            {preview && (
                <div>
                    <img src={preview} alt="Previsualización" style={{ maxHeight: '200px', marginTop: '10px' }} />
                </div>
            )}
                <Button 
                type="submit" //envia el formulario automaticamente, no hace falta el onClick.
                variant="contained" 
                sx={{
                    backgroundColor: '#c49dd7',  // Color lila de fondo
                    color: 'white',  // Color del texto
                    fontWeight: 'bold',
                    padding: '10px',
                    borderRadius: '5px',
                    textTransform: 'uppercase',
                    '&:hover': {
                      backgroundColor: '#b284c4',  // Lila más oscuro al hacer hover
                    }
                }} 
                >
                Registrar Producto
                </Button >
            </form>
        </div>
    );
};

export default RegistrarProducto