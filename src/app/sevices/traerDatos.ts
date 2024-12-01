import clienteAxios from "./axios";

export const obtenerCotizacionesPorDiaYEmpresa = async (codigoEmpresa: string) => {
    try {
        const response = await clienteAxios.get(`/empresas/${codigoEmpresa}/promedio-cotizacion`); 
        return response.data; 
    } catch (error) {
        console.error('Error al obtener las cotizaciones:', error);
        throw error; 
    }
};

export const obtenerCotizacionesPorHoraYEmpresa = async (codigoEmpresa: string) => {
    try {
        const response = await clienteAxios.get(`/empresas/${codigoEmpresa}/cotizaciones`); 
        return response.data; 
    } catch (error) {
        console.error('Error al obtener las cotizaciones:', error);
        throw error; 
    }
};


export const obtenerCotizacionesPorRangoYEmpresa = async (codigoEmpresa: string, fechaDesde: string, fechaHasta: string) => {
    try {
        const response = await clienteAxios.get(`/empresas/${codigoEmpresa}/rango`, {
            params: {
                fechaDesde,
                fechaHasta
            }
        });
        return response.data; 
    } catch (error) {
        console.error('Error al obtener las cotizaciones:', error);
        throw error; 
    }
};

export const obtenerTodasEmpresas = async () => {
    try {
        const response = await clienteAxios.get(`/empresa`); 
        return response.data; 
    } catch (error) {
        console.error('Error al obtener las empresas:', error);
        throw error; 
    }
};



// Puedes elegir exportar una de las funciones como exportación predeterminada, pero no es necesario
// Si no necesitas una exportación predeterminada, simplemente elimina la siguiente línea
// export default obtenerCotizacionesPorDiaYEmpresa; // Esto es opcional

// Si decides no usar exportación predeterminada, simplemente no la declares.