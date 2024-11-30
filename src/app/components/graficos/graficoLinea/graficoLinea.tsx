"use client";

import React, { useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import obtenerCotizacionesPorEmpresa from "@/app/sevices/traerDatos";


interface ChartComponentProps {
  codigoEmpresa: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ codigoEmpresa }) => {
  const [datos, setDatos] = useState<{ date: number; value: number }[]>([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datosBackend = await obtenerCotizacionesPorEmpresa(codigoEmpresa);

        // Transformar datos
        const datosTransformados = datosBackend.map((item: any) => ({
          date: new Date(`${item.fecha}T${item.hora}`).getTime(),
          value: parseFloat(item.cotization),
        }));

        console.log("Datos transformados:", datosTransformados); // Verifica el formato
        setDatos(datosTransformados);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    cargarDatos();
  }, [codigoEmpresa]);

  useEffect(() => {
    if (datos.length === 0) return;

    let root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);

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

    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
      })
    );
    cursor.lineY.set("visible", false);

    // Ajustar el intervalo de tiempo para "día" en vez de "hora" (como en el ejemplo original)
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        baseInterval: {
          timeUnit: "day", // Ajuste aquí para mostrar datos por día
          count: 1,         // Mostrar por 1 día
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {}),
        dateFormats: {
          day: "yyyy-MM-dd", // Mostrar fecha en formato año-mes-día
        },
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          pan: "zoom",
        }),
      })
    );

    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Cotizaciones",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    series.data.setAll(datos);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [datos]);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default ChartComponent;
