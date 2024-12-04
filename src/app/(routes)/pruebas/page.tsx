import GraficoLineaBolsaDia from "@/app/components/graficos/graficoLinea/graficoLineaDiaBolsa";
import GraficoLineaBolsaMes from "@/app/components/graficos/graficoLinea/graficoLineaMes";



export default function Pruebas() {
  
  return (
    <>
    <div>
      <h1>Gráfico de BOLSAAAAS</h1>
      <GraficoLineaBolsaMes codigoIndice={"IBOV"} />
    </div>

    
    </>
  );
}
