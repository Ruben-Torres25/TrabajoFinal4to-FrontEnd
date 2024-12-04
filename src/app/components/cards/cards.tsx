import React from 'react';
import './cards.css'; // Asegúrate de que el archivo CSS esté en la misma carpeta

const Cards: React.FC = () => {
  return (
    <div>
      <div className="container-card">
        <div className="card">
          <figure>
            <img src="https://www.estrategiasdeinversion.com/uploads/noticias_redaccion/native/native-ibex-35-3.jpg" alt="Diseño Gráfico" />
          </figure>
          <div className="contenido-card">
            <h3>Indice Bursatil</h3>
            <p>
             Observe los ultimos acontecimientos ocurridos en las bolsas de todos los paises del mundo
            </p>
            <a href="#">Ver Mas</a>
          </div>
        </div>
        
        <div className="card">
          <figure>
            <img src="https://s03.s3c.es/imag/_v0/1200x655/1/e/0/inversion.jpg" alt="Desarrollo Web" />
          </figure>
          <div className="contenido-card">
            <h3>Cotizacion de empresas</h3>
            <p>
              Observe las ultimas cotizaciones de las empresas que desee, en nuestro innovador sistema grafico
            </p>
            <a href="#">Ver Mas</a>
          </div>
        </div>
      </div>
      {/* Fin Tarjetas */}
    </div>
  );
};

export default Cards;