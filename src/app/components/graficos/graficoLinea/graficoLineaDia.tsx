"use client";

import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { obtenerPromedioCotizacionesUltimoMesAgrupadosPorEmpresa } from "@/app/sevices/traerDatos";

// Tipos de datos
interface Promedio {
  fecha: string; // Fecha en formato 'yyyy-MM-dd'
  promedio: number; // Promedio
}

interface EmpresaData {
  codempresa: string; // Código de la empresa
  promedios: Promedio[]; // Array de promedios
}

interface DatoGrafico {
  date: number; // Timestamp
  value: number; // Promedio
}

const GraficoLineaEmpresaDia: React.FC<{ codigoEmpresa: string }> = ({ codigoEmpresa }) => {
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
      })
    );

    // Cursor con animación
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
        name: "Promedio",
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
        const datosBackend: EmpresaData[] = await obtenerPromedioCotizacionesUltimoMesAgrupadosPorEmpresa();
        
        // Filtrar el índice correspondiente
        const empresaData = datosBackend.find(empresa => empresa.codempresa === codigoEmpresa);
        if (!empresaData) return; // Si no se encuentra la empresa, salimos

        // Transformar los datos en el formato adecuado para el gráfico
        const datosTransformados: DatoGrafico[] = empresaData.promedios.map((promedio) => ({
          date: new Date(promedio.fecha).getTime(), // Convertir la fecha a timestamp
          value: promedio.promedio, // Asignar el promedio
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
      root.dispose(); // // Limpiar la instancia de amCharts al desmontar el componente
      root.dispose();
    };
  }, [codigoEmpresa]);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default GraficoLineaEmpresaDia;