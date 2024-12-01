import clienteAxios from "./axios";

export const obtenerCotizacionesPorDiaYEmpresa = async (codigoEmpresa: string) => {
    try {
        const response = await clienteAxios.get(`/cotizaciones/${codigoEmpresa}/promedio-cotizacion`); 
        return response.data; 
    } catch (error) {
        console.error('Error al obtener las cotizaciones:', error);
        throw error; 
    }
};

export const obtenerCotizacionesPorHoraYEmpresa = async (codigoEmpresa: string) => {
    try {
        const response = await clienteAxios.get(`/cotizaciones/${codigoEmpresa}/cotizaciones`); 
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

export const obtenerUltimosTresDiasCotizaciones= async (codigoEmpresa: string) => {
    try {
        const response = await clienteAxios.get(`/cotizaciones/${codigoEmpresa}/ultimos-tres-dias`); 
        return response.data; 
    } catch (error) {
        console.error('Error al obtener las cotizaciones:', error);
        throw error; 
    }
};


// Puedes elegir exportar una de las funciones como exportación predeterminada, pero no es necesario
// Si no necesitas una exportación predeterminada, simplemente elimina la siguiente línea
// export default obtenerCotizacionesPorDiaYEmpresa; // Esto es opcional

// Si decides no usar exportación predeterminada, simplemente no la declares.