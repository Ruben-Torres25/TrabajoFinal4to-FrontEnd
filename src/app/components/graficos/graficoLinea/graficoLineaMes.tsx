"use client";

import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { obtenerPromedioMensualCotizacionesIndices } from "@/app/sevices/traerDatos"; // Asegúrate de importar la función

// Tipos de datos
interface PromedioMensual {
  mes: string; // Mes en formato 'yyyy-MM'
  promedioMensual: number; // Promedio mensual
}

interface IndiceData {
  codigoIndice: string; // Código del índice
  promedios: PromedioMensual[]; // Array de promedios mensuales
}

const GraficoLineaBolsaMes: React.FC<{ codigoIndice: string }> = ({ codigoIndice }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Crear la raíz de amCharts
    const root = am5.Root.new(chartRef.current);

    // Aplicar tema animado
    root.setThemes([am5themes_Animated.new(root)]);

    // Crear gráfico
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );


    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomX",
      })
    );
    cursor.lineY.set("visible", false);

    // Crear ejes con animaciones
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        baseInterval: {
          timeUnit: "month",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Crear serie de líneas con animación
    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Promedio Mensual",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    // Efecto de animación al cargar datos
    series.appear(1000);
    chart.appear(1000, 100);

    // Scroll horizontal con efectos
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );
    // Función para cargar datos del backend
    const cargarDatos = async () => {
      try {
        const datosBackend: IndiceData[] = await obtenerPromedioMensualCotizacionesIndices();
    
        // Filtrar el índice correspondiente
        const indiceData = datosBackend.find(indice => indice.codigoIndice === codigoIndice);
        if (!indiceData) return; // Si no se encuentra el índice, salimos
    
        // Obtener el año actual
        const añoActual = new Date().getFullYear();
    
        // Transformar los datos en el formato adecuado para el gráfico
        const datosTransformados = indiceData.promedios
          .filter(promedio => new Date(promedio.mes).getFullYear() === añoActual) // Filtrar por el año actual
          .map(promedio => ({
            date: new Date(`${promedio.mes}-01`).getTime(), // Convertir el mes a un timestamp
            value: promedio.promedioMensual,
          }));
    
        // Establecer los datos en la serie
        series.data.setAll(datosTransformados);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    cargarDatos();

    // Limpiar instancia al desmontar el componente
    return () => {
      chart.dispose(); // Asegúrate de destruir el gráfico
      root.dispose();  // Destruir la raíz también
    };
  }, [codigoIndice]);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default GraficoLineaBolsaMes;