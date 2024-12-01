"use client";

import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { obtenerUltimosTresDiasCotizaciones } from "@/app/sevices/traerDatos";

// Tipos de datos
interface DatoBackend {
  id: string;
  fecha: string; // Fecha en formato 'yyyy-MM-dd'
  hora: string;  // Hora en formato 'HH:mm:ss'
  dateUTC: string; // Fecha en formato ISO 8601 UTC
  cotization: string; // Cotización
}

interface DatoGrafico {
  timeString: string; // Cadena combinada de fecha y hora
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
      am5xy.CategoryAxis.new(root, {
        categoryField: "timeString", // Campo que contiene las cadenas
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30, // Ajustar la distancia mínima entre etiquetas
          minorGridEnabled: true, // Mostrar grillas menores si es necesario
        }),
        tooltip: am5.Tooltip.new(root, {
          labelText: "{category}", // Mostrar el valor de la categoría en el tooltip
        }),
      })
    );
    
    xAxis.get("renderer").labels.template.adapters.add("text", (text, target, key) => {
      let index = target.dataItem?.index; // Obtener el índice del elemento
      return index && index % 2 === 0 ? text : ""; // Mostrar solo etiquetas pares
    });
    
    

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
        categoryXField: "timeString",
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

    // Barra de desplazamiento horizontal
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    // Función para cargar los datos desde el backend
    const cargarDatos = async () => {
      try {
        const datosBackend: DatoBackend[] = await obtenerUltimosTresDiasCotizaciones(codigoEmpresa);

        // Filtrar los datos para que solo estén entre las 9:00 y las 15:00
        const datosFiltrados = datosBackend.filter((dato) => {
          const hora = new Date(`${dato.fecha}T${dato.hora}`).getHours();
          return hora >= 9 && hora <= 15; // Solo horas entre las 9 y las 15
        });

        // Transformar los datos filtrados en el formato adecuado para el gráfico
        const datosTransformados: DatoGrafico[] = datosFiltrados.map((dato) => ({
          timeString: `${dato.fecha} ${dato.hora}`, // Usamos la combinación de fecha y hora como string
          value: parseFloat(dato.cotization),      // Convertimos la cotización a número
        }));

        // Establecemos los datos en la serie
        series.data.setAll(datosTransformados);

        // Establecer las categorías en el eje X
        xAxis.data.setAll(datosTransformados);

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
