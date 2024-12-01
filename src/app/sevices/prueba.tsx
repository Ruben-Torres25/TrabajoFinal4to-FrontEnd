"use client";

import React from 'react';


const CotizacionButton: React.FC<{ codigoEmpresa: string }> = ({ codigoEmpresa }) => {
  const handleClick = async () => {
    try {
      const data = await obtenerCotizacionesPorEmpresa(codigoEmpresa);
      console.log(data); // Verifica que los datos se estén obteniendo correctamente
    } catch (error) {
      console.error("Error al obtener cotizaciones:", error);
    }
  };

  return <button onClick={handleClick}>Obtener Cotizaciones</button>;
};

export default CotizacionButton;

function obtenerCotizacionesPorEmpresa(codigoEmpresa: string) {
  throw new Error('Function not implemented.');
}
