// src/app/components/cardsGraficos/cardsGraficosBolsas.tsx
import React from 'react';
import GraficoLineaBolsaDia from '../graficos/graficoLinea/graficoLineaDiaBolsa';
import GraficoLineaBolsaMes from '../graficos/graficoLinea/graficoLineaMes';
import GraficoMultiBolsa from '../graficos/graficoMultilinea/graficoMultiBolsa';
import './cardsGraficos.css'; 
import GraficoTortaBolsas from '../graficos/graficoTorta/graficoTortaBolsas';

interface Props {
  codigoIndice: string;
  nombreIndice: string;
}

const CardsGraficosBolsas: React.FC<Props> = ({ codigoIndice, nombreIndice }) => {
  return (
    <div className="mb-10 bg bg-gray-800">
      <div className="title-cards">
        <h2>{nombreIndice}</h2> 
      </div>
      
      <div className="container-card">
        <div className="card">
          <div className="contenido-card">
            <h3>Gráfico por Día</h3>
            <GraficoLineaBolsaDia codigoIndice={codigoIndice} />
          </div>
        </div>

        <div className="card">
          <div className="contenido-card">
            <h3>Gráfico por Mes</h3>
            <GraficoLineaBolsaMes codigoIndice={codigoIndice} />
          </div>
        </div>

        <div className="cardGrande full-width-card">
          <div className="contenido-card">
            <h3>Gráfico Completo de {nombreIndice}</h3>
            <GraficoMultiBolsa />
          </div>
        </div>

        <div className="cardGrande full-width-card">
          <div className="contenido-card">
            <h3>Gráfico De Torta</h3>
            <GraficoTortaBolsas />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsGraficosBolsas;