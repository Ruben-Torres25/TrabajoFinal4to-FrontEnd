// src/app/components/cardsGraficos/cardsGraficos.tsx
import React from 'react';
import './cardsGraficos.css'; 
import GraficoLineaEmpresaDia from '../graficos/graficoLinea/graficoLineaDia';
import GraficoLineaEmpresaHora from '../graficos/graficoLinea/graficoLineaHora';
import GraficoMultiLinea from '../graficos/graficoMultilinea/graficoMulti';
import GraficoTortaEmpresas from '../graficos/graficoTorta/graficoTortaEmpresas';

interface Props {
  codigoEmpresa: string; 
  nombreEmpresa: string; 
}

const CardsGraficosEmpresas: React.FC<Props> = ({ codigoEmpresa, nombreEmpresa }) => {
  return (
    <div className="mb-10 bg bg-gray-800">
      
      <div className="title-cards">
        <h2>{nombreEmpresa}</h2> 
      </div>
      
      {/* Contenedor de las tarjetas */}
      <div className="container-card">
        
        {/* Tarjeta 1 */}
        <div className="card">
          <div className="contenido-card">
            <h3>Gráfico por Hora</h3>
            {/* Pasar el código de la empresa a GraficoLineaEmpresaHora */}
            <GraficoLineaEmpresaHora codigoEmpresa={codigoEmpresa} />
          </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="card">
          <div className="contenido-card">
            <h3>Gráfico por Día</h3>
            {/* Pasar el código de la empresa a GraficoLineaEmpresaDia */}
            <GraficoLineaEmpresaDia codigoEmpresa={codigoEmpresa} />
          </div>
        </div>

        <div className="cardGrande full-width-card">
        <div className="contenido-card">
          <h3>Gráfico Completo de {nombreEmpresa}</h3>
          <GraficoMultiLinea />
        </div>
      </div>

      <div className="cardGrande full-width-card">
        <div className="contenido-card">
          <h3>Grafico de torta</h3>
          <GraficoTortaEmpresas />
        </div>
      </div>

      </div>
    </div>
  );
};

export default CardsGraficosEmpresas;