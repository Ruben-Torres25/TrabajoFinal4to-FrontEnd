'use client';
import React, { useEffect, useRef } from "react";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { obtenerPromedioCotizacionesPorDiaDeTodosLosIndices } from "@/app/sevices/traerDatos"; // Asegúrate de importar la función

interface DatoPromedio {
  codigoIndice: string;
  fecha: string; // 'yyyy-MM-dd'
  promedio: number;
}

const GraficoMultiLineaBolsa: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    let root = am5.Root.new(chartRef.current);

    const myTheme = am5.Theme.new(root);
    myTheme.rule("AxisLabel", ["minor"]).setAll({
      dy: 1,
    });

    myTheme.rule("Grid", ["x"]).setAll({
      strokeOpacity: 0.05,
    });

    myTheme.rule("Grid", ["x", "minor"]).setAll({
      strokeOpacity: 0.05,
    });

    root.setThemes([am5themes_Animated.new(root), myTheme]);

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      maxTooltipDistance: 0,
      pinchZoomX: true,
    }));
    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.2,
      baseInterval: {
        timeUnit: "day",
        count: 1,
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true,
      }),
      tooltip: am5.Tooltip.new(root, {}),
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    }));

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none",
      snapTooltip: false,
    }));
    cursor.lineY.set("visible", false);

    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal",
    }));
    chart.set("scrollbarY", am5.Scrollbar.new(root, {
      orientation: "vertical",
    }));


    const cargarDatos = async () => {
      try {
        const datosBackend: DatoPromedio[] = await obtenerPromedioCotizacionesPorDiaDeTodosLosIndices();

        // Agrupar datos por código de índice, ignorando el índice TSE
        const groupedData: Record<string, { date: number; value: number }[]> = {};
        datosBackend.forEach(dato => {
          const { codigoIndice, fecha, promedio } = dato;

          // Ignorar el índice TSE por las cotizaciones gigantes que da, rompe el grafico
          if (codigoIndice === "TSE") return;

          const date = new Date(fecha).getTime();
          if (!groupedData[codigoIndice]) {
            groupedData[codigoIndice] = [];
          }
          groupedData[codigoIndice].push({ date, value: promedio });
        });

        // Crear series para cada índice
        Object.entries(groupedData).forEach(([codigoIndice, data]) => {
          const series = chart.series.push(am5xy.LineSeries.new(root, {
            name: codigoIndice,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "date",
            legendValueText: "{valueY}",
            tooltip: am5.Tooltip.new(root, {
              pointerOrientation: "horizontal",
              labelText: "{name}: {valueY}",
            }),
          }));

          series.data.setAll(data);
          series.appear();
        });
        
        

        const legend = chart.rightAxesContainer.children.push(am5.Legend.new(root, {
          width: 220, // Incrementamos el ancho de la leyenda
          paddingLeft: 10,
          height: am5.percent(100),
          layout: root.verticalLayout, // Organizar verticalmente
        }));

        legend.labels.template.setAll({
          maxWidth: 140, // Limitamos el ancho del texto de los nombres
          oversizedBehavior: "truncate", // Truncar si el nombre excede
          tooltipText: "", // Mostrar nombre completo en el tooltip
        });

        legend.itemContainers.template.setAll({
          width: am5.p100,
          paddingTop: 5,
          paddingBottom: 5,
          tooltipText: "",
        });

        legend.valueLabels.template.setAll({
          width: am5.p100,
          textAlign: "right", // Mantener los valores a la derecha
          maxWidth: 60, // Limitar el ancho de los valores
        });

        legend.data.setAll(chart.series.values);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    cargarDatos();

    return () => {
      root.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default GraficoMultiLineaBolsa;