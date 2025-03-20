import { useState,  useEffect } from "react";
import style from './BuscadorPorFiltro.module.css'
import { useProductos } from "../../contexts/ProductoContext";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Divider, Checkbox, FormGroup, FormControlLabel, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useSucursales } from "../../contexts/SucursalContext";
import { useColor } from "../../contexts/ColorContext";
import { useMarca } from "../../contexts/MarcaContext";
import { useTalle } from "../../contexts/TalleContext";


const FiltroProductos = () => {
    const { productosAll, fetchProductosAll, setProductosFiltradosAdmin } = useProductos();
    const {talles, fetchTalles}= useTalle()
    const {colores,fetchColores}= useColor()
    const {marcas, fetchMarcas}= useMarca()
    const {sucursales, fetchSucursales}= useSucursales()
    const [mensajeCarga, setMensajeCarga]= useState(false)
    const [, setMensaje]= useState('')
    

    useEffect(()=>{
        fetchProductosAll()
        fetchColores()
        fetchMarcas()
        fetchSucursales()
        fetchTalles()
        },[])

    const opciones = {
        sucursal: sucursales, // Usamos los valores de sucursales
        marca: marcas, // Usamos los valores de marcas
        color: colores, // Usamos los valores de colores
        talle: talles, // Usamos los valores de talles
      };

    const [seleccionados, setSeleccionados] = useState<{ [key: string]: string[] }>({
        sucursal: [],
        marca: [],
        color: [],
        talle: []
    });

  const handleChange = (categoria: string, valor: string) => {
    setSeleccionados((prev) => ({
      ...prev,
      [categoria]: prev[categoria].includes(valor)
        ? prev[categoria].filter((item) => item !== valor)
        : [...prev[categoria], valor]
    }));
  };

  const aplicarFiltros = () => {
    const productosFiltrados = productosAll.filter((producto) => {
      // Filtrar por color
      const colorSeleccionado = seleccionados.color.length === 0 || seleccionados.color.includes(producto.color);
  
      // Filtrar por talle
      const talleSeleccionado = seleccionados.talle.length === 0 || seleccionados.talle.includes(producto.talle);
  
      // Filtrar por marca
      const marcaSeleccionada = seleccionados.marca.length === 0 || seleccionados.marca.includes(producto.marca);
  
      // Filtrar por sucursal
    const sucursalSeleccionada = seleccionados.sucursal.length === 0 || producto.sucursales.some(sucursal =>
        seleccionados.sucursal.includes(sucursal.nombreSucursal)
      );
  
      // Devuelve true solo si el producto cumple con todos los filtros seleccionados
      return colorSeleccionado && talleSeleccionado && marcaSeleccionada && sucursalSeleccionada;
  
    });
    
  
    setProductosFiltradosAdmin(productosFiltrados);
    setMensaje('Filtros Aplicados')
        setMensajeCarga(true)
        // Después de 3 segundos, oculta el mensaje
        setTimeout(() => {
            setMensaje('');
            setMensajeCarga(false);
        }, 2000);
  };
 
  // Función para limpiar los filtros
    const limpiarFiltros = () => {
        // Resetea las opciones seleccionadas
        setSeleccionados({
        sucursal: [],
        marca: [],
        color: [],
        talle: [],
        });
        // Limpia los productos filtrados
        setProductosFiltradosAdmin([]);

        setMensaje('Filtros Limpios')
        setMensajeCarga(true)
        // Después de 3 segundos, oculta el mensaje
        setTimeout(() => {
            setMensaje('');
            setMensajeCarga(false);
        }, 2000);
    };

    
  return (
    <div className={style.contGeneral}>
          {Object.entries(opciones).map(([categoria, valores]) => (
            <Accordion key={categoria} style={{ marginBottom: 20 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${categoria}-content`}
                id={`${categoria}-header`}
              >
                <Typography variant="subtitle1" fontWeight="bold" textTransform="uppercase">
                  {categoria}
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <Divider style={{ marginBottom: 10 }} />
                <FormGroup>
                  {valores.map((valor, idx) => (
                    <FormControlLabel
                      key={idx}
                      control={
                        <Checkbox
                          checked={seleccionados[categoria].includes(valor.nombre)}
                          onChange={() => handleChange(categoria, valor.nombre)}
                        />
                      }
                      label={valor.nombre}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          ))}
          <Button variant="contained" className={style.botonFiltro} onClick={aplicarFiltros}>
            Aplicar Filtros
          </Button>
          {/* Botón para limpiar filtros */}
            <Button variant="outlined" color="secondary" className={style.botonFiltroLimp} onClick={limpiarFiltros} style={{ marginLeft: 10 }}>
                Limpiar Filtros
            </Button>

            {mensajeCarga && 
            <p className={style.mensaje}>filtros aplicados</p>}

        </div>
      );
}
export default FiltroProductos;