"use client";

import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { obtenerCotizacionesUltimoMesPorIndices } from "@/app/sevices/traerDatos"; // Asegúrate de importar la función

// Tipos de datos
interface Cotizacion {
  fecha: string; // Fecha en formato 'yyyy-MM-dd'
  hora: string;  // Hora en formato 'HH:mm:ss'
  valorCotizacionIndice: string; // Cotización
}

interface DiaCotizacion {
  fecha: string; // Fecha
  cotizaciones: Cotizacion[]; // Array de cotizaciones
}

interface IndiceData {
  codigoIndice: string; // Código del índice
  cotizacionesPorDia: DiaCotizacion[]; // Array de cotizaciones por día
}

const GraficoLineaBolsaDia: React.FC<{ codigoIndice: string }> = ({ codigoIndice }) => {
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
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {}),
        // Aquí agregas el formateador de fechas
        dateFormatter: am5.DateFormatter.new(root, {
          dateFormat: "yyyy-MM-dd", // Formato solo de fecha
          // Puedes ajustar el formato según tus necesidades
        }),
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
        name: "Cotización",
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
        const datosBackend: IndiceData[] = await obtenerCotizacionesUltimoMesPorIndices();

        // Filtrar el índice correspondiente
        const indiceData = datosBackend.find(indice => indice.codigoIndice === codigoIndice);
        if (!indiceData) return;

        // Transformar los datos en el formato adecuado para el gráfico
        const datosTransformados = indiceData.cotizacionesPorDia.flatMap(dia => 
          dia.cotizaciones.map(cotizacion => ({
            date: new Date(`${dia.fecha}T${cotizacion.hora}`).getTime(),
            value: parseFloat(cotizacion.valorCotizacionIndice),
          }))
        );

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

export default GraficoLineaBolsaDia;