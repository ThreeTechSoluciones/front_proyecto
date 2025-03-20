import React, { useState, useRef, useEffect } from "react";
import Grafico from "../../components/graficos/componenteGrafico";
import style from "./estadisticas.module.css";
import ExportarPdf from "../../components/pdf/exportarPdf";
import Notificaciones from "../../components/notificaciones";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { useEstadisticas } from '../../contexts/EstadisticasContext';

const EstadisticasClientes: React.FC = () => {

  const [opcionEstadisticaSeleccionada, setOpcionEstadisticaSeleccionada] = useState<string>("");
  const [, setError] = useState<string | null>(null);
  const exportarRef = useRef<{ exportPdf: () => void } | null>(null);
  //const { frecuenciaData, fetchFrecVentas} = useEstadisticas();
  const [labels, setLabels] = useState<string[]>([]); // Para almacenar las fechas
  const [data, setData] = useState<number[]>([]); // Para almacenar las ventas
  const { frecuenciaData, fetchFrecVentas, promedioData, fetchPromVentas} = useEstadisticas();
  


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

//variables para exportación pdf
const contenidoId = "graficoClientes";
const tituloPdf = "ReporteClientes";

   //Manejar el envio del form (botón submit)
   const handleSubmitForm = (e: React.FormEvent) => {

    e.preventDefault(); // Evita que el formulario se envíe

  
    //validación para que si o si se seleccione una opción
    if(opcionEstadisticaSeleccionada==("")){
      Notificaciones.error("Debe seleccionar un tipo de estadística")
      return
    }

    setError(null); // Reseteamos el error si todo está bien
    console.log("Formulario enviado");

    if (opcionEstadisticaSeleccionada === "Frecuencia de compras") {
      console.log("entra")
    
      fetchFrecVentas();
    } else {
      // Si no es "Ventas totales", llamamos a fetchProductos
    fetchPromVentas();
    }
   };
   // Validamos qué opción de estadística fue seleccionada


useEffect(() => {
  if (frecuenciaData && Object.keys(frecuenciaData).length > 0) { 
    // Transformamos los datos en labels y data
    const newLabels = Object.keys(frecuenciaData); // Extrae los rangos de días
    const newData = Object.values(frecuenciaData).map(Number); // Extrae las frecuencias
    setLabels(newLabels); // Actualiza el estado de labels
    setData(newData); // Actualiza el estado de data
  } else if
  (promedioData.length === 0 && opcionEstadisticaSeleccionada==="Frecuencia de compras") {
  Notificaciones.advertencia("No hay datos disponibles.")
  setLabels([]);
  setData([]);
}

}, [frecuenciaData]);


useEffect(() => {
  if (promedioData && Object.keys(promedioData).length > 0) { 
    // Transformamos los datos en labels y data
    const newLabels = Object.keys(promedioData); // Extrae los rangos de días
    const newData = Object.values(promedioData).map(Number); // Extrae las frecuencias
    setLabels(newLabels); // Actualiza el estado de labels
    setData(newData); // Actualiza el estado de data
  } else if
    (promedioData.length === 0 && opcionEstadisticaSeleccionada==="Promedio de compras") {
    Notificaciones.advertencia("No hay datos disponibles.")
    setLabels([]);
    setData([]);
  }

}, [promedioData]);


   return (
    <form className={style.container} onSubmit={handleSubmitForm}>
      {/* SELECCIÓN DE TIPO DE ESTADÍSTICA */}
      <div className={style.selectClientes}>
      <FormControl component="fieldset">
      <p className={style.message}>Por favor, seleccione la estadística que desea visualizar:</p>
        <FormLabel id="tipoEstadistica"></FormLabel>
        <div className={style.radioContainer}>
        <RadioGroup
          row
          aria-labelledby="tipoEstadistica"
          name="tipoEstadistica"
          value={opcionEstadisticaSeleccionada}
          onChange={handleEstadisticaChange}
        >
          <FormControlLabel value="Frecuencia de compras" control={<Radio />} label="Frecuencia de compras" />
          <FormControlLabel value="Promedio de compras" control={<Radio />} label="Promedio de compras" />
        </RadioGroup>
        </div>
      </FormControl>
      </div>
       {/* BOTÓN DE BÚSQUEDA */}
       <button className={style.button} type="submit" >Buscar</button>
       
       {/* DATOS GRÁFICO */}
     <div className={style.containerEstadisticas}>
        <div id="graficoClientes">
          <p> 📅 Estadísticas de <strong> 
              {opcionEstadisticaSeleccionada} </strong>
          </p>
       
         {/*GRÁFICO */}
         <Grafico
          labels={labels} // Etiquetas de fechas
          data={data} // Datos de ventas
          labelTitle="Clientes"
          yTitle={opcionEstadisticaSeleccionada ===""? "": "Clientes"}
          xTitle={opcionEstadisticaSeleccionada === "Frecuencia de compras" 
            ? "Rango de días entre ventas" 
            : opcionEstadisticaSeleccionada === "Promedio de compras" 
              ? "Montos promedios de compras" 
              : ""}
        />
        </div>
      </div>

      {/* EXPORTACIÓN A PDF */}
      <ExportarPdf ref={exportarRef} id={contenidoId} title={tituloPdf} />
        <button className={style.buttonPdf} onClick={handleExport}>
          Generar PDF <PictureAsPdfIcon style={{ fontSize: "20px", marginLeft:"4px", marginBottom:"4px" }} />
        </button>
    </form>
  );
};

export default EstadisticasClientes;
