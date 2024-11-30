import React from 'react';
import './cardsGraficos.css'; 
import ChartComponent from '../graficos/graficoLinea/graficoLinea';



const CardsGraficos: React.FC = () => {
  return (
    <div>
      {/* Tarjetas */}
      <div className="title-cards">
        <h2>Graficos de empresas</h2>
      </div>
      <div className="container-card">
        <div className="card">
          
          <div className="contenido-card">
          
          </div>
        </div>
        


        <div className="card">
          
          <div className="contenido-card">
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsGraficos;