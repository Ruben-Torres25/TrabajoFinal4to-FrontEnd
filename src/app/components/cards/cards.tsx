import React from 'react';
import './cards.css'; // Asegúrate de que el archivo CSS esté en la misma carpeta
import { useTranslation } from 'next-i18next';

const Cards: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="container-card">
        <div className="card">
          <figure>
            <img src="https://www.estrategiasdeinversion.com/uploads/noticias_redaccion/native/native-ibex-35-3.jpg" alt="Diseño Gráfico" />
          </figure>
          <div className="contenido-card">
            <h3>{t('tituloCardIndice')}</h3>
            <p>{t('descripcionCardIndice')}</p>
            <a href="#">Ver Mas</a>
          </div>
        </div>
        
        <div className="card">
          <figure>
            <img src="https://s03.s3c.es/imag/_v0/1200x655/1/e/0/inversion.jpg" alt="Desarrollo Web" />
          </figure>
          <div className="contenido-card">
            <h3>{t('tituloCardEmpresas')}</h3>
            <p>{t('descripcionCardEmpresas')}</p>
            <a href="#">{t('verMas')}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;