"use client";

import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { obtenerCotizacionesPorDiaYEmpresa } from "@/app/sevices/traerDatos";



// Tipos de datos
interface DatoBackend {
  fecha: string;
  promedio: number;
}

interface DatoGrafico {
  date: number;
  value: number;
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
        const datosBackend: DatoBackend[] = await obtenerCotizacionesPorDiaYEmpresa(codigoEmpresa);
        const datosTransformados: DatoGrafico[] = datosBackend.map((dato) => ({
          date: new Date(dato.fecha).getTime(),
          value: dato.promedio,
        }));
        series.data.setAll(datosTransformados);
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

export default GraficoLineaEmpresaDia;
