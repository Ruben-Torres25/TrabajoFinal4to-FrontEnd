import React from 'react';
import './cards.css'; // Asegúrate de que el archivo CSS esté en la misma carpeta

const Cards: React.FC = () => {
  return (
    <div>
      {/* Tarjetas */}
      <div className="title-cards">
        <h2>Servicios que Ofrecemos</h2>
      </div>
      <div className="container-card">
        <div className="card">
          <figure>
            <img src="https://cdn.pixabay.com/photo/2015/06/24/16/36/office-820390_1280.jpg" alt="Diseño Gráfico" />
          </figure>
          <div className="contenido-card">
            <h3>Indice Bursatil</h3>
            <p>
              Podemos crear la identidad corporativa de tu empresa. Diseño, Maquetación de folletos, Catálogos, Papelería y mucho más.
            </p>
            <a href="#">Ver Mas</a>
          </div>
        </div>
        
        <div className="card">
          <figure>
            <img src="https://cdn.pixabay.com/photo/2021/08/05/12/36/software-development-6523979_1280.jpg" alt="Desarrollo Web" />
          </figure>
          <div className="contenido-card">
            <h3>Cotizacion de empresas</h3>
            <p>
              Creamos tu página web utilizando las últimas tecnologías disponibles. Una Web adaptativa a tu móvil o Tablet y con un gestor de contenido fácil.
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