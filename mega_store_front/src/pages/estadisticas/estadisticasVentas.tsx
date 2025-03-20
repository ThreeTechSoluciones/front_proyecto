import React, { useState, useRef, useEffect } from "react";
import Grafico from "../../components/graficos/componenteGrafico";
import style from "./estadisticas.module.css";
import ExportarPdf from "../../components/pdf/exportarPdf";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import Notificaciones from "../../components/notificaciones";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { useEstadisticas } from '../../contexts/EstadisticasContext';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';



const EstadisticasVentas: React.FC = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [opcionEstadisticaSeleccionada, setOpcionEstadisticaSeleccionada] = useState<string>("");
  let [opcionVisualizacionSeleccionada, setOpcionVisualizacionSeleccionada] = useState<string>("");
  const [, setError] = useState<string | null>(null);
  const exportarRef = useRef<{ exportPdf: () => void } | null>(null);
  const { ventasData, fetchVentas, productosData, fetchProductos} = useEstadisticas();
  const [labels, setLabels] = useState<string[]>([]); // Para almacenar las fechas
  const [data, setData] = useState<number[]>([]); // Para almacenar las ventas
  const [totalMontoVentas, setTotalMontoVentas] = useState<number>(0);
  const [totalVentas, setTotalVentas]=useState<number>(0);


  // Manejar cambio de fecha de inicio
  const handleStartDateChange = (newDate: Dayjs | null) => {
    setStartDate(newDate);
  };

  // Manejar cambio de fecha de fin
  const handleEndDateChange = (newDate: Dayjs | null) => {
    setEndDate(newDate);
  };

  //Manejar exportación a pdf
  const handleExport = () => {
    if (exportarRef.current) {
      exportarRef.current.exportPdf();
    }
  };

  //Manejar el cambio del tipo de estadistica seleccionado
  const handleEstadisticaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpcionEstadisticaSeleccionada(event.target.value); // Actualiza el estado con el valor seleccionado
  };

  //Manejar el cambio del tipo de visualización seleccionado
  const handleVisualizacionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpcionVisualizacionSeleccionada(event.target.value); // Actualiza el estado con el valor seleccionado
  };

 
  //Manejar el envio del form (botón submit)
  const handleSubmitForm = (e: React.FormEvent) => {

    e.preventDefault(); // Evita que el formulario se envíe

    // Validación de fechas
    if (startDate && endDate && startDate.isAfter(endDate)) {
      Notificaciones.error("La fecha de inicio debe ser menor a la fecha de fin.");
      return;
    }
    if (!startDate || !endDate) {
      Notificaciones.error( "Ambos campos de fecha son obligatorios.");
      return; // Detener el envío
    }
    // Verificación de los días entre las fechas (deben ser busquedas menores a 40 dias)
    if (startDate && endDate && opcionVisualizacionSeleccionada === "D" && opcionEstadisticaSeleccionada === "Ventas totales") {
      const diffDays = endDate.diff(startDate, "day"); // Calcula la diferencia en días
      if (diffDays >= 40) {
        Notificaciones.error("El rango de fechas no puede ser mayor o igual a 40 días.");
        return; // Detener la ejecución si el rango es mayor o igual a 40 días
      }
    }

  //Verificación de los meses entre las fechas (deben ser búsquedas menores a 40 meses)
 
  if (startDate && endDate && opcionVisualizacionSeleccionada === "M" && opcionEstadisticaSeleccionada === "Ventas totales") {
    const diffMonths = endDate.diff(startDate, "month"); // Calcula la diferencia en meses
    if (diffMonths >= 40) {
      Notificaciones.error("El rango de fechas no puede ser mayor o igual a 40 meses.");
      return; // Detener la ejecución si el rango es mayor o igual a 40 meses
    }
  }
    //validación para que si o si se seleccione una opción
    if(opcionEstadisticaSeleccionada==("")){
      Notificaciones.error("Debe seleccionar un tipo de estadística")
      return
    }

    setError(null); // Reseteamos el error si todo está bien
    //console.log("Formulario enviado");

    //Comienzo de petición a backend
    
   //convertir las fechas al formato esperado por el backend
   const fechaDesde = startDate.format("YYYY-MM-DD");
   const fechaHasta = endDate.format("YYYY-MM-DD");
   const frecuencia=opcionVisualizacionSeleccionada;
  // Validamos qué opción de estadística fue seleccionada
if (opcionEstadisticaSeleccionada === "Ventas totales") {
  if (!opcionVisualizacionSeleccionada) {
    Notificaciones.error("Debe seleccionar una opción de visualización"); // Mostrar error
    return; // Evitar que continúe la ejecución
  }
  // Llamamos al backend solo si hay una opción de visualizacion seleccionada
  console.log(frecuencia)
  fetchVentas(fechaDesde, fechaHasta, frecuencia);
} else {
  // Si no es "Ventas totales", llamamos a fetchProductos
  fetchProductos(fechaDesde, fechaHasta);
}
}
  

  //extraemos los datos para visualizarlos en el gráfico
  useEffect(() => {
    if (ventasData.length > 0) { //validamos que existan datos
      const newLabels = ventasData.map((item) => item.fecha); // Extraemos las fechas
      const newData = ventasData.map((item) => item.total_ventas); // Extraemos las ventas
      const totalMontoVentas = ventasData.reduce((acc, item) => acc + item.total_monto, 0);
      const totalVentas = ventasData.reduce((acc, item) => acc + item.total_ventas, 0);
      setLabels(newLabels); // Actualizamos el estado con las fechas
      setData(newData); // Actualizamos el estado con las ventas
      setTotalMontoVentas(totalMontoVentas); // Guardamos el monto total de ventas
      setTotalVentas(totalVentas); // Guardamos el total de ventas
      
    } 
    //caso en que no haya datos en el rango de fechas seleccionadas
    if (ventasData.length === 0 && opcionEstadisticaSeleccionada==="Ventas totales") {
      //console.log("No se encontraron datos de ventas.");
      Notificaciones.advertencia("No hay datos disponibles. Ingrese otro rango de fecha")
      setLabels([]); //Reseteamos el gráfico
      setData([]);
    }
  }, [ventasData]); // Este useEffect solo se ejecutará cuando ventasData cambie

useEffect(() => {
  if (productosData.length > 0) { //validamos que existan datos
    const newLabels = productosData.map((item) => item.producto); // Extraemos las fechas
    const newData = productosData.map((item) => item.cantidad_vendida); // Extraemos las ventas
    setLabels(newLabels); // Actualizamos el estado con las fechas
    setData(newData); // Actualizamos el estado con las ventas 
  } 
  if (productosData.length === 0 && opcionEstadisticaSeleccionada==="Productos más vendidos") {
    Notificaciones.advertencia("No hay datos disponibles. Ingrese otro rango de fecha")
    setLabels([]);
    setData([]);
  }
}, [productosData]); // Este useEffect solo se ejecutará cuando ventasData cambie

  
//variables para exportación pdf
  const contenidoId = "graficoVentas";
  const tituloPdf = "ReporteVentas";

  return (
    <form className={style.container} onSubmit={handleSubmitForm}>

      {/* SELECCIÓN DE FECHAS */}
      <p className={style.message}>Por favor, seleccione un rango de fecha y la estadística que desea visualizar:</p>
      <div className={style.selectsFechas}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="Desde" onChange={handleStartDateChange} />
          </DemoContainer>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="Hasta" onChange={handleEndDateChange} />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className={style.selectsVisualizacion}>
      <FormControl>

      {/*SELECCION DE TIPO DE ESTADISTICA*/}
      <FormLabel id="tipoEstadistica"> </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={opcionEstadisticaSeleccionada} // El valor controlado del radio group
        onChange={handleEstadisticaChange} // Manejador de cambios
      >
        <FormControlLabel value="Productos más vendidos" control={<Radio />} label="Productos más vendidos" />
        <FormControlLabel value="Ventas totales" control={<Radio />} label="Ventas totales" />
      </RadioGroup>

      {/*SELECCION DE TIPO DE VISUALIZACION*/}
      <FormLabel id="visualizacion"> </FormLabel>
      <div className={style.radioContainer}>
      {opcionEstadisticaSeleccionada === "Ventas totales" && (
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={opcionVisualizacionSeleccionada} // El valor controlado del radio group
        onChange={handleVisualizacionChange} // Manejador de cambios
      >
        <FormControlLabel value="A" control={<Radio />} label="Anual" />
        <FormControlLabel value="M" control={<Radio />} label="Mensual" />
        <FormControlLabel value="D" control={<Radio />} label="Diario" />
      </RadioGroup>
      )}
      </div>
    </FormControl>
    </div>

      {/* BOTÓN DE BÚSQUEDA */}
      <button className={style.button} type="submit" >Buscar</button>

     {/* DATOS GRÁFICO */}
     <div className={style.containerEstadisticas}>
        <div id="graficoVentas">
          <p> 📅 Estadísticas de <strong> 
              {opcionEstadisticaSeleccionada} 
              {opcionEstadisticaSeleccionada === "ventastotales" && ` ${opcionVisualizacionSeleccionada}`}
            </strong> en el rango de fechas:{" "}
              <strong>{startDate ? startDate.format("DD/MM/YYYY") : "No seleccionada"} - </strong>
              <strong>{endDate ? endDate.format("DD/MM/YYYY") : "No seleccionada"}</strong>
          </p>
          {opcionEstadisticaSeleccionada === "Ventas totales" && (
          <div className={style.totales}>
            <div className={style.ventasTotales}>
              <div>
                <p className={style.text}>{totalVentas}</p>
                <p className={style.text2}>Ventas totales</p>
                < PointOfSaleIcon style={{ marginLeft: '140', marginTop:'-42', fontSize: '40px' }}/>
              </div>
            </div>
            <div className={style.ventasTotales}>
              <div className={style.probando}>
                <p className={style.text}>$ {totalMontoVentas}</p>
                <p className={style.text2}>Ganancias</p>
                <AttachMoneyIcon style={{ marginLeft: '140', marginTop:'-42', fontSize: '40px' }}/>
              </div>
            </div>
          </div>
        )}

         {/*GRÁFICO */}
        <Grafico
          labels={labels} // Etiquetas de fechas
          data={data} // Datos de ventas
          labelTitle={opcionEstadisticaSeleccionada === "Ventas totales" ? "Ventas" : "Unidades Vendidas"}
          xTitle={opcionEstadisticaSeleccionada === "Ventas totales" 
            ? "Tiempo" 
            : opcionEstadisticaSeleccionada === "Productos más vendidos"
            ?"Productos"
              :""}
          yTitle={opcionEstadisticaSeleccionada === "Ventas totales" 
            ? "Ventas" 
            : opcionEstadisticaSeleccionada === "Productos más vendidos" 
              ? "Unidades Vendidas" 
              : ""}
        />
        </div>
      </div>

      {/* EXPORTACIÓN A PDF */}
      <ExportarPdf ref={exportarRef} id={contenidoId} title={tituloPdf} />
        <button className={style.buttonPdf} onClick={handleExport}>
        Generar PDF <PictureAsPdfIcon style={{ fontSize: "20px", marginLeft:"4px", marginBottom:"4px" }}/>
        </button>
    </form>
  );
};

export default EstadisticasVentas;
