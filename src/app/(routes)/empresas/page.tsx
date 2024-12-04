'use client'
import React, { useEffect, useState } from 'react';
import CardsGraficosEmpresas from "@/app/components/cardsGraficos/cardsGraficos";
import Footer from "@/app/components/footer/footer";
import EmpresaList from "@/app/components/ListaEmpresas/ListaEmpresas";
import NavBar from "@/app/components/navBar/navBar";
import PresentacionEmpresas from "@/app/components/presentacionEmpresas/presentacionEmpresas";
import { obtenerTodasEmpresas } from '@/app/sevices/traerDatos';

export default function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const [codigoEmpresaSeleccionada, setCodigoEmpresaSeleccionada] = useState<string>("GOOGL"); // Código de Google
  const [nombreEmpresaSeleccionada, setNombreEmpresaSeleccionada] = useState<string>("Google"); // Nombre de Google

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const empresasData = await obtenerTodasEmpresas();
        setEmpresas(empresasData);

        // Verificar si Google está en la lista y establecerlo como seleccionado
        const google = empresasData.find((empresa: { codempresa: string; }) => empresa.codempresa === "GOOGL");
        if (google) {
          setCodigoEmpresaSeleccionada(google.codempresa);
          setNombreEmpresaSeleccionada(google.empresaNombre);
        }
      } catch (error) {
        console.error("Error al obtener las empresas:", error);
      }
    };

    fetchEmpresas(); // Llamar a la función para obtener las empresas
  }, []);

  const manejarSeleccionEmpresa = (codigo: string, nombre: string) => {
    setCodigoEmpresaSeleccionada(codigo);
    setNombreEmpresaSeleccionada(nombre);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <div className="bg-gray-800 flex-grow flex flex-col items-center">
        <div className="h-0.5 w-[90%] bg-gray-500" />
        <PresentacionEmpresas />
      </div>

      <div className="bg-gray-800 flex-grow flex flex-col items-center">
        <div className="h-0.5 w-[90%] bg-gray-500" />
      </div>

      <div className='bg-gray-800'>
        <EmpresaList empresas={empresas} onSelect={manejarSeleccionEmpresa} />
      </div>

      <div className='bg-gray-800'>
        <CardsGraficosEmpresas 
          codigoEmpresa={codigoEmpresaSeleccionada} 
          nombreEmpresa={nombreEmpresaSeleccionada || "Seleccione la empresa que desee"}
        />
      </div>

      <div className="bg-gray-800 flex-grow flex flex-col items-center">
        <div className="h-0.5 w-[90%] bg-gray-500" />
      </div>
      
      <Footer />
    </div>
  );
}