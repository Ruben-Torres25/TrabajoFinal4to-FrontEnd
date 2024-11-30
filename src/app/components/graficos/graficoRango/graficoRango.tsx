'use client'
import React, { useEffect, useState } from 'react';
import obtenerCotizacionesPorEmpresa from '@/app/sevices/traerDatos';

const CotizacionesComponent: React.FC = () => {
    const [cotizaciones, setCotizaciones] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCotizaciones = async () => {
            try {
                const data = await obtenerCotizacionesPorEmpresa('GOOGL'); // Cambia 'GOOGL' por el código de la empresa que desees
                setCotizaciones(data);
            } catch (err) {
                setError('Error al obtener cotizaciones');
                console.error(err); // Opcional: log para más detalles sobre el error
            }
        };

        fetchCotizaciones(); // Llama a la función para obtener las cotizaciones
    }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

    if (error) {
        return <div>{error}</div>; // Muestra el error si ocurre
    }
    
    return (
        
        <div>
            <h1>Cotizaciones de GOOGL</h1>
            <ul>
                {cotizaciones.map((cotizacion) => (
                    <li key={cotizacion.id}>{cotizacion.valor}</li> // Asegúrate de ajustar esto según la estructura de tus datos
                ))}
            </ul>
        </div>
    );
};

export default CotizacionesComponent;