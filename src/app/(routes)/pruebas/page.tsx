import ChartComponent from "@/app/components/graficos/graficoLinea/graficoLinea";


export default function Pruebas() {
  return (
    <div>
      <h1>Gráfico de Cotizaciones</h1>
      <ChartComponent codigoEmpresa="GOOGL" />
    </div>
  );
}
