import React from 'react';
import './cards.css'; 

const Cards: React.FC = () => {
  return (
    <div>
      <div className="container-card">
        <div className="card">
          <figure>
            <img src="https://www.estrategiasdeinversion.com/uploads/noticias_redaccion/native/native-ibex-35-3.jpg" alt="Diseño Gráfico" />
          </figure>
          <div className="contenido-card">
            <h3>Indices Bursatiles</h3>
            <p>
              Observe los ultimos acontecimientos ocurridos en las bolsas de todos los paises del mundo
            </p>
            <a href="/bolsas">Ver Mas</a> 
          </div>
        </div>
        
        <div className="card">
          <figure>
            <img src="https://s03.s3c.es/imag/_v0/1200x655/1/e/0/inversion.jpg" alt="Desarrollo Web" />
          </figure>
          <div className="contenido-card">
            <h3>Cotizaciones de empresas</h3>
            <p>
              Observe las ultimas cotizaciones de las empresas que desee, en nuestro innovador sistema grafico
            </p>
            <a href="/empresas">Ver Mas</a> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;