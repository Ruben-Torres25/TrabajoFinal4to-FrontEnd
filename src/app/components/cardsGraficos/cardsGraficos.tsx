// src/app/components/cardsGraficos/cardsGraficos.tsx
import React from 'react';
import './cardsGraficos.css'; 
import GraficoLineaEmpresaDia from '../graficos/graficoLinea/graficoLineaDia';
import GraficoLineaEmpresaHora from '../graficos/graficoLinea/graficoLineaHora';
import GraficoMultiLinea from '../graficos/graficoMultilinea/graficoMulti';
import GraficoTortaEmpresas from '../graficos/graficoTorta/graficoTortaEmpresas';
import { useTranslation } from 'next-i18next';

interface Props {
  codigoEmpresa: string; 
  nombreEmpresa: string; 
}

const CardsGraficosEmpresas: React.FC<Props> = ({ codigoEmpresa, nombreEmpresa }) => {
  const { t } = useTranslation();
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
            <h3>{t('graficoHora')}</h3>
            {/* Pasar el código de la empresa a GraficoLineaEmpresaHora */}
            <GraficoLineaEmpresaHora codigoEmpresa={codigoEmpresa} />
          </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="card">
          <div className="contenido-card">
            <h3>{t('graficoDia')}</h3>
            {/* Pasar el código de la empresa a GraficoLineaEmpresaDia */}
            <GraficoLineaEmpresaDia codigoEmpresa={codigoEmpresa} />
          </div>
        </div>

        <div className="cardGrande full-width-card">
        <div className="contenido-card">
          <h3>{nombreEmpresa}</h3>
          <GraficoMultiLinea />
        </div>
      </div>

      <div className="cardGrande full-width-card">
        <div className="contenido-card">
          <GraficoTortaEmpresas />
        </div>
      </div>

      </div>
    </div>
  );
};

export default CardsGraficosEmpresas;