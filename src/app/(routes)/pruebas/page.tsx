import GraficoLineaEmpresaDia from "@/app/components/graficos/graficoLinea/graficoLineaDia";
import GraficoLineaHora from "@/app/components/graficos/graficoLinea/graficoLineaHora";





export default function Pruebas() {
  return (
    <>
    <div>
      <h1>Gráfico de Cotizaciones por SELECT HORA</h1>
    </div>

    <div>
      <h1>Gráfico de Cotizaciones Por HORA</h1>
      <GraficoLineaHora codigoEmpresa={"GOOGL"}/>
    </div>
    </>
  );
}
