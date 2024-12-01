'use client'
// src/app/(routes)/empresas/page.tsx
import React, { useEffect, useState } from 'react';
import CardsGraficos from "@/app/components/cardsGraficos/cardsGraficos";
import Footer from "@/app/components/footer/footer";
import EmpresaList from "@/app/components/ListaEmpresas/ListaEmpresas";
import NavBar from "@/app/components/navBar/navBar";
import PresentacionEmpresas from "@/app/components/presentacionEmpresas/presentacionEmpresas";
import { obtenerTodasEmpresas } from '@/app/sevices/traerDatos';

export default function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const [codigoEmpresaSeleccionada, setCodigoEmpresaSeleccionada] = useState<string>(""); // Especificar el tipo
  const [nombreEmpresaSeleccionada, setNombreEmpresaSeleccionada] = useState<string>(""); // Estado para el nombre de la empresa

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const empresasData = await obtenerTodasEmpresas();
        setEmpresas(empresasData); // Almacena los datos en el estado
      } catch (error) {
        console.error("Error al obtener las empresas:", error);
      }
    };

    fetchEmpresas(); // Llamar a la función para obtener las empresas
  }, []);

  const manejarSeleccionEmpresa = (codigo: string, nombre: string) => {
    setCodigoEmpresaSeleccionada(codigo);
    setNombreEmpresaSeleccionada(nombre); // Almacena el nombre de la empresa seleccionada
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <NavBar />
      <div className="bg-gray-800 flex-grow flex flex-col items-center">
        <div className="h-0.5 w-[90%] bg-gray-500" />
        <PresentacionEmpresas />
      </div>
      <div className="bg-gray-800 flex-grow flex flex-col items-center">
        <div className="h-0.5 w-[90%] bg-gray-500" />
        </div>
      <EmpresaList empresas={empresas} onSelect={manejarSeleccionEmpresa} />

      
      <CardsGraficos 
        codigoEmpresa={codigoEmpresaSeleccionada} 
        nombreEmpresa={nombreEmpresaSeleccionada || "Seleccione la empresa que desee"}
      />
      <div className="bg-gray-800 flex-grow flex flex-col items-center">
        <div className="h-0.5 w-[90%] bg-gray-500" />
        </div>
      <Footer/>
    </div>
  );
}