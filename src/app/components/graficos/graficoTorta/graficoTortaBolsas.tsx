'use client'
import React, { useEffect, useRef } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { calcularPromedioTotalPorIndice, calcularPromedioTotalPorIndiceSinTSE } from "@/app/sevices/traerDatos"; // Asegúrate de importar la función

interface IndiceData {
    codigoIndice: string;
    promedioTotal: number | null; // Aceptar null para el promedio total
}

const GraficoTortaBolsas: React.FC = () => {
    const chartRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        let root = am5.Root.new(chartRef.current);

        // Aplicar tema animado
        root.setThemes([am5themes_Animated.new(root)]);

        // Crear gráfico de torta
        let chart = root.container.children.push(am5percent.PieChart.new(root, {}));

        // Crear serie de torta
        let series = chart.series.push(am5percent.PieSeries.new(root, {
            valueField: "promedioTotal",
            categoryField: "codigoIndice"
        }));

        // Función para cargar datos
        const cargarDatos = async () => {
            try {
                const datosBackend: IndiceData[] = await calcularPromedioTotalPorIndiceSinTSE();//SIN TSE PROQUE HAY UNA BOLSA QUE COTIZA MUY GRANDE Y ROMPE EL GRAFICO

                // Filtrar datos para eliminar los índices con promedioTotal nulo
                const filteredData = datosBackend.filter(indice => indice.promedioTotal !== null);

                // Establecer los datos en la serie
                series.data.setAll(filteredData);
                
                series.appear(1000, 100);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };

        cargarDatos();

        // Limpiar la instancia al desmontar el componente
        return () => {
            root.dispose();
        };
    }, []);

    return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default GraficoTortaBolsas;