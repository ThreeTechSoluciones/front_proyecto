import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement } from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale,  LineElement, BarElement, Title, Tooltip, Legend);

interface DatosGrafico {
  labels: string[];
  data: number[];
  labelTitle: string;
  yTitle: string;
  xTitle:string;

  
}

const Grafico: React.FC<DatosGrafico> = ({ labels, data, labelTitle,yTitle, xTitle}) => {
  // Estado para los datos del gráfico
  const [chartData, setChartData] = useState<any>(null);

  // Cuando los datos cambian, actualizamos el chartData
  
  useEffect(() => {
    const mockData: DatosGrafico = {
      labels: labels,
      data: data, // Aquí pasamos los datos reales
      labelTitle:labelTitle,
      yTitle:yTitle,
      xTitle:xTitle,
    
    };
    setChartData(mockData);
  }, [labels, data, labelTitle]); // El efecto depende de 'labels' y 'data' para actualizar el gráfico cuando cambian

  // Si chartData está vacío, no renderices el gráfico
  if (!chartData) {
    return <div>Cargando...</div>;
  }

  // Configuración de datos para Chart.js
  const datos = {
    labels: chartData.labels, // Etiquetas del eje X
    datasets: [
      {
        label: chartData.labelTitle, // Título del gráfico
        data: chartData.data, // Los datos del gráfico
        fill: true,
        borderColor: 'white',
        backgroundColor: "#b598ed",
        borderRadius: 5, 
        maxBarThickness: 200, // Limita el grosor máximo de las barras
        
       
      },
    ],
  };

  // Configuración de opciones para el gráfico
  const options = {
    scales: {
        y: {
          title: {
            display: true, // Activa el título del eje X
            text: chartData.yTitle, // Texto del título
            font: {
              size: 14, // Tamaño de la fuente
            },
          },
          min: 0
          
        },
        x: {
          title: {
            display: true, // Activa el título del eje X
            text: chartData.xTitle, // Texto del título
            font: {
              size: 14, // Tamaño de la fuente
            },
          },
          ticks: {
            color: 'black'
          }
        }
      },
      plugins: {
       
        legend: {
          display: false
        }
      }
    };
  
    return <Bar data={datos} options={options} width={650} height={450} />;
  
};

export default Grafico;





