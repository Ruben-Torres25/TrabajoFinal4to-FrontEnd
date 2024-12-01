'use client';
import React, { useEffect, useRef } from "react";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const GraficoMultiLinea: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null); // Referencia al div del gráfico

  useEffect(() => {
    if (!chartRef.current) return; // Asegurarse de que el contenedor no sea null

    // Crear el elemento raíz
    let root = am5.Root.new(chartRef.current); // Asegúrate de que no sea null

    const myTheme = am5.Theme.new(root);
    myTheme.rule("AxisLabel", ["minor"]).setAll({
      dy: 1
    });
    myTheme.rule("Grid", ["x"]).setAll({
      strokeOpacity: 0.05
    });
    myTheme.rule("Grid", ["x", "minor"]).setAll({
      strokeOpacity: 0.05
    });

    // Establecer temas
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // Crear gráfico
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      maxTooltipDistance: 0,
      pinchZoomX: true
    }));

    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;

    function generateData() {
      value = Math.round((Math.random() * 10 - 4.2) + value);
      am5.time.add(date, "day", 1);
      return {
        date: date.getTime(),
        value: value
      };
    }

    function generateDatas(count: number) {
      let data = [];
      for (let i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }

    // Crear ejes
    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.2,
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    // Añadir series
    const seriesArray: am5xy.LineSeries[] = []; // Guardar las series para la leyenda
    for (let i = 0; i < 10; i++) {
      const series = chart.series.push(am5xy.LineSeries.new(root, {
        name: "Series " + i,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        legendValueText: "{valueY}",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{valueY}"
        })
      }));

      date = new Date();
      date.setHours(0, 0, 0, 0);
      value = 0;

      let data = generateDatas(100);
      series.data.setAll(data);

      // Animación al cargar
      series.appear();

      seriesArray.push(series); // Guardar la serie para la leyenda
    }

    // Añadir cursor
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);

    // Añadir scrollbar
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));

    chart.set("scrollbarY", am5.Scrollbar.new(root, {
      orientation: "vertical"
    }));

    // Añadir leyenda
    let legend = chart.rightAxesContainer.children.push(am5.Legend.new(root, {
      width: 200,
      paddingLeft: 15,
      height: am5.percent(100)
    }));

    // Añadir las series a la leyenda correctamente
    legend.data.setAll(seriesArray);

    // Manejo de eventos de leyenda
    legend.itemContainers.template.events.on("pointerover", function (e) {
      let itemContainer = e.target;

      if (itemContainer.dataItem) {
        let series = itemContainer.dataItem.dataContext as am5xy.LineSeries; // Asegúrate de que sea del tipo correcto
        series.set("visible", false); // Ocultar la serie
      }
    });

    legend.itemContainers.template.events.on("pointerout", function (e) {
      let itemContainer = e.target;

      if (itemContainer.dataItem) {
        let series = itemContainer.dataItem.dataContext as am5xy.LineSeries; // Asegúrate de que sea del tipo correcto
        series.set("visible", true); // Mostrar la serie
      }
    });

    // Limpiar al desmontar
    return () => {
      root.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default GraficoMultiLinea;
