"use client";

import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { obtenerCotizacionesPorHoraYEmpresa } from "@/app/sevices/traerDatos";

// Tipos de datos
interface DatoBackend {
  id: string;
  fecha: string; // Fecha en formato 'yyyy-MM-dd'
  hora: string;  // Hora en formato 'HH:mm:ss'
  dateUTC: string; // Fecha en formato ISO 8601 UTC
  cotization: string; // Cotización
}

interface DatoGrafico {
  date: number; // Timestamp combinado de fecha y hora
  value: number; // Cotización
}

const GraficoLineaEmpresaHora: React.FC<{ codigoEmpresa: string }> = ({ codigoEmpresa }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Crear la raíz de amCharts
    let root = am5.Root.new(chartRef.current);

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
        paddingLeft: 0,
      })
    );

    // Agregar cursor (solo para interactuar pero no línea punteada)
    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none", // No mostramos el cursor vertical
      })
    );
    cursor.lineY.set("visible", false);

    // Crear ejes con animaciones
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        baseInterval: {
          timeUnit: "hour", // Usamos "hour" en lugar de "day"
          count: 1,         // Cada intervalo es de 1 hora
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {}),
        dateFormats: {
          day: "yyyy-MM-dd HH:mm", // Formato de fecha: año-mes-día hora:minutos
        },
        // Limitar el rango visible en el eje X (9:00 a 15:00)
        min: new Date("2024-01-02T09:00:00").getTime(), // Hora de inicio
        max: new Date("2024-01-02T15:00:00").getTime(), // Hora de fin
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          pan: "zoom", // Habilitar zoom vertical
        }),
      })
    );

    // Crear serie de líneas con animación
    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Promedio",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
      })
    );

    // Habilitar el tooltip sobre la serie (siempre visible mientras el cursor esté sobre la línea)
    series.set("tooltip", am5.Tooltip.new(root, {
      labelText: "{valueY}", // Muestra la cotización (valueY)
      pointerOrientation: "horizontal", // Tooltip sigue al cursor
      autoTextColor: true, // Colores automáticos
    }));

    // Efecto de animación al cargar los datos
    series.appear(1000);
    chart.appear(1000, 100);

    // Barra de desplazamiento horizontal (similar al original)
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    // Función para cargar los datos desde el backend
    const cargarDatos = async () => {
      try {
        const datosBackend: DatoBackend[] = await obtenerCotizacionesPorHoraYEmpresa(codigoEmpresa);

        // Filtrar los datos para que solo estén entre las 9:00 y las 15:00
        const datosFiltrados = datosBackend.filter((dato) => {
          const hora = new Date(`${dato.fecha}T${dato.hora}`).getHours();
          return hora >= 9 && hora <= 15; // Solo horas entre las 9 y las 15
        });

        // Transformar los datos filtrados en el formato adecuado para el gráfico
        const datosTransformados: DatoGrafico[] = datosFiltrados.map((dato) => {
          const fechaHora = `${dato.fecha}T${dato.hora}`;
          const timestamp = new Date(fechaHora).getTime(); // Convertimos a timestamp
          
          return {
            date: timestamp,
            value: parseFloat(dato.cotization), // Convertimos la cotización a número
          };
        });

        // Establecemos los datos en la serie
        series.data.setAll(datosTransformados);

        // Definir el rango de las horas visibles en el gráfico (9:00 a 15:00)
        const primerDato = datosTransformados[0]?.date;
        const ultimoDato = datosTransformados[datosTransformados.length - 1]?.date;

        if (primerDato && ultimoDato) {
          xAxis.set("min", primerDato);  // Establece la hora de inicio (9:00)
          xAxis.set("max", ultimoDato);  // Establece la hora de fin (15:00)
        }

      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    cargarDatos();

    // Limpiar instancia al desmontar el componente
    return () => {
      root.dispose();
    };
  }, [codigoEmpresa]);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default GraficoLineaEmpresaHora;
