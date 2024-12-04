"use client";

import React from 'react';
import { obtenerCotizacionesUltimoMes, obtenerPromedioCotizacionesUltimoMesAgrupadosPorEmpresa, obtenerPromedioMensualCotizacionesIndices, obtenerTodosIndices } from './traerDatos';



const CotizacionButton: React.FC<{}> = () => {
  const handleClick = async () => {
    try {
      const data = await obtenerPromedioCotizacionesUltimoMesAgrupadosPorEmpresa();
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
