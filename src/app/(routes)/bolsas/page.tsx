'use client'
import React, { useEffect, useState } from "react";
import CardsGraficosBolsas from "@/app/components/cardsGraficos/cardsGraficosBolsas";
import Footer from "@/app/components/footer/footer";
import BolsasList from "@/app/components/listaBolsas/listaBolsas";
import NavBar from "@/app/components/navBar/navBar";
import PresentacionIndices from "@/app/components/presentacionIndices/presentacionIndices";
import { obtenerTodosIndices } from "@/app/sevices/traerDatos";

export default function Bolsas() {
  const [indices, setIndices] = useState([]);
  const [codigoIndiceSeleccionado, setCodigoIndiceSeleccionado] = useState<string>("IBOV"); // Código de Bovespa
  const [nombreIndiceSeleccionado, setNombreIndiceSeleccionado] = useState<string>("Bovespa"); // Nombre de Bovespa

  useEffect(() => {
    const fetchIndices = async () => {
      try {
        const indicesData = await obtenerTodosIndices();
        setIndices(indicesData);

        // Verificar si Bovespa está en la lista y establecerlo como seleccionado
        const bovespa = indicesData.find((indice: { codIndice: string; }) => indice.codIndice === "IBOV");
        if (bovespa) {
          setCodigoIndiceSeleccionado(bovespa.codIndice);
          setNombreIndiceSeleccionado(bovespa.nombreIndice);
        }
      } catch (error) {
        console.error("Error al obtener los índices:", error);
      }
    };

    fetchIndices();
  }, []);

  const manejarSeleccionIndice = (codigo: string, nombre: string) => {
    setCodigoIndiceSeleccionado(codigo);
    setNombreIndiceSeleccionado(nombre);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <div className="bg-gray-800 flex-grow flex flex-col items-center">
        <div className="h-0.5 w-[90%] bg-gray-500" />
        <PresentacionIndices />
      </div>

      <div className="bg-gray-800 flex-grow flex flex-col items-center">
        <div className="h-0.5 w-[90%] bg-gray-500" />
      </div>

      <div className='bg-gray-800'>
        <BolsasList indices={indices} onSelect={manejarSeleccionIndice} />
      </div>
      <div className='bg-gray-800'>
        <CardsGraficosBolsas 
          codigoIndice={codigoIndiceSeleccionado} 
          nombreIndice={nombreIndiceSeleccionado} 
        />
      </div>

      <div className="bg-gray-800 flex-grow flex flex-col items-center">
        <div className="h-0.5 w-[90%] bg-gray-500" />
      </div>

      <Footer />
    </div>
  );
}