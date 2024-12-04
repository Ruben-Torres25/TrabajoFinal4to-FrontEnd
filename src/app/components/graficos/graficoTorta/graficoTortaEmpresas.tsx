import React, { useEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { obtenerPromedioTotalPorEmpresa } from "@/app/sevices/traerDatos"; // Asegúrate de importar la función

const GraficoTortaEmpresas = () => {
  useEffect(() => {
    // Crear el elemento raíz
    let root = am5.Root.new("chartdiv");

    // Establecer temas
    root.setThemes([am5themes_Animated.new(root)]);

    // Crear gráfico
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 270
      })
    );

    // Crear serie
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "promedioTotal",
        categoryField: "codempresa",
        endAngle: 270
      })
    );

    series.states.create("hidden", {
      endAngle: -90
    });

    // Función para cargar datos
    const cargarDatos = async () => {
      try {
        const datosBackend = await obtenerPromedioTotalPorEmpresa();
        
        // Establecer los datos en la serie
        series.data.setAll(datosBackend);
        
        series.appear(1000, 100);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    cargarDatos();

    // Cleanup al desmontar el componente
    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default GraficoTortaEmpresas;