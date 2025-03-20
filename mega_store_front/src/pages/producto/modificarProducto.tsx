import style from './registrarProducto.module.css';
import React, { useEffect, useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { validarAlfanumerico, validarDecimalPositivo, validarEnteroPositivo, validarStockMedio, validarCampoRequerido, 
    validarCampoSeleccionado,  formatearPrecio, validarLongitudCaracteres, validarPrecio } from './validationsProducto';
//import { Producto } from './interfazProducto';
import InputAdornment from '@mui/material/InputAdornment';
//import OutlinedInput from '@mui/material/OutlinedInput';
import Autocomplete from '@mui/material/Autocomplete';
import { useCategoria } from '../../contexts/CategoriaContext';
import { useMarca } from '../../contexts/MarcaContext';
import { useSucursales } from '../../contexts/SucursalContext';
import { useTalle } from '../../contexts/TalleContext';
import { useColor } from '../../contexts/ColorContext';
import { useProductos } from '../../contexts/ProductoContext';
import { ProductoGet , Producto} from './interfazProducto';
import { Sucursal } from '../../contexts/SucursalContext';






interface ModificarProductoProps {
    producto: ProductoGet;
}

const ModificarProducto = ({ producto }: ModificarProductoProps) => {
    //CONJUNTO EXTRAIDOS DE LOS CONTEXT
    const{fetchProductos,modificarProducto}=useProductos()
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
    const [id, setId] = useState<number>(0);;
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
    const [, setFoto] = useState(null);  // Estado para almacenar la imagen
    const [preview, setPreview] = useState<string | null>(null);  // Estado para la previsualización 
    
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
        // foto: '',
    });

    //cargamos los datos del producto
    useEffect(() => {
        setId(producto.id);
        setNombre(producto.nombre);
        setDescripcion(producto.descripcion);
        setPrecio(producto.precio?.toString() || "0"); // Convertir a string si precio es numérico
        setPeso(producto.peso.toString()); // Convertir a string si peso es numérico
        setCategoria(producto.categoriaId.toString()); // Convertir a string si es necesario
        setMarca(producto.marcaId.toString()); // Convertir a string si es necesario
        setTalle(producto.talleId.toString()); // Convertir a string si es necesario
        setColor(producto.colorId.toString()); // Convertir a string si es necesario
        setStockActual(producto.stockActual.toString()); // Convertir a string si es necesario
        setStockMedio(producto.stockMedio.toString()); // Convertir a string si es necesario
        setStockMinimo(producto.stockMinimo.toString()); // Convertir a string si es necesario
        setFoto(null); // Iniciar con null para nueva carga de imagen
        setPreview(producto.foto || null); // Usar la URL de la foto si está disponible

        setSelectedSucursal(
            (producto.sucursales || []).map((sucursal) => ({
              idSucursal: sucursal.idSucursal, // Usa idSucursal como id
              nombre: sucursal.nombreSucursal, // Usa nombreSucursal como nombre
              idProducto: sucursal.idProducto,
              cantidad: sucursal.cantidad,
            })) || null
          );

    }, [producto]);
    
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
        };
        setErrores(errores);
        // Chequear si hay errores
        const sinErrores = Object.values(errores).every(error => error === '');

        if (sinErrores) {
            //HACEMOS EL POST
           
            armarJson();

        } else {
            console.log('Errores en el formulario');
        }
        // Lógica para enviar los datos al backend y si no hay errores sigue.
    };

    
    // const armarSucursales = (sucursales :any)=>{
    //     const sucursalIds = sucursales.map( sucursal => sucursal.idSucursal);
    //     return sucursalIds
    // }
    const armarJson = ()=>{
        if (id === undefined) {
            console.error("El ID del producto no puede ser undefined.");
            return; // Salir de la función si no hay un ID válido
        }
        
    // const sucursalesIDs = armarSucursales(selectedSucursal)

    const jsonData: Producto = {
            id, // Asegúrate de que `id` siempre esté presente (debe ser de tipo `number`)
            nombre: nombre,
            descripcion: descripcion,
            peso: parseFloat(peso),
            stockActual: parseInt(stockActual, 10),
            stockMedio: parseInt(stockMedio, 10),
            stockMinimo: parseInt(stockMinimo, 10),
            categoriaId: parseInt(categoria, 10),
            marcaId: parseInt(marca, 10),
            talleId: parseInt(talle, 10),
            colorId: parseInt(color, 10),
            // sucursales: sucursalesIDs,
           
        };
        
        // Verificar si el precio ha cambiado
        if (precio !== producto.precio?.toString() || precio === "0") {
            jsonData.precio = parseFloat(precio);
        }
    
    modificarProducto(jsonData);
    console.log(jsonData)
    fetchProductos(0,12,"id,asc")
    }

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
            <h1>Editar Producto</h1>
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
                        disabled 
                        className={style.input}
                        id="sucursal-label"
                        multiple
                        options={sucursales}
                        
                        getOptionLabel={(option) => option.nombre}

                        value={selectedSucursal || []}
                        onChange={(_, newValue) => setSelectedSucursal(newValue)} 
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
                <TextField
                    className={style.input}
                    label="Stock Actual"
                    value={stockActual}
                    onChange={handleInputChange(setStockActual)}
                    error={!!errores.stockActual}
                    helperText={errores.stockActual}
                    margin="normal"
                    disabled 
                />

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
        <FormControl fullWidth  margin="normal">
            <input
                type="file"
                accept="image/jpeg, image/png" // Solo .jpg o .jpeg y .png
                id="file-upload"
                style={{ display: 'none' }}  // Ocultamos el input original
                
            />
            <label htmlFor="file-upload">
            
            </label>
                    
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
                Editar Producto
                </Button >
            </form>
        </div>
    );
};

export default ModificarProducto