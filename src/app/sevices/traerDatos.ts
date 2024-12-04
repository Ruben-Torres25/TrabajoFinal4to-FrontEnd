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

export const obtenerTodosIndices = async () => {
    try {
        const response = await clienteAxios.get(`/indices/obtenerIndices`); 
        return response.data; 
    } catch (error) {
        console.error('Error al obtener los indices:', error);
        throw error; 
    }
};

export const obtenerPromedioCotizacionesPorDiaDeTodasLasEmpresas = async () => {
    try {
        const response = await clienteAxios.get(`/cotizaciones/promedio-todas-las-empresas`); 
        return response.data; 
    } catch (error) {
        console.error('Error al obtener las cotizaciones por dia promediadas:', error);
        throw error; 
    }
};

export const obtenerPromedioCotizacionesPorDiaDeTodosLosIndices = async () => {
    try {
        const response = await clienteAxios.get(`/IndiceCotizaciones/promedio-por-dia`); 
        return response.data; 
    } catch (error) {
        console.error('Error al obtener los indices por dia promediados:', error);
        throw error; 
    }
};

export const obtenerUltimosTresDiasCotizaciones = async (codigoEmpresa: string) => {
    try {
        const response = await clienteAxios.get(`/cotizaciones/${codigoEmpresa}/ultimos-tres-dias`); 
        return response.data; 
    } catch (error) {
        console.error('Error al obtener las cotizaciones:', error);
        throw error; 
    }
};

export const obtenerCotizacionesUltimoMes = async () => {
    try {
        const response = await clienteAxios.get(`/IndiceCotizaciones/ultimo-mes`); 
        return response.data; 
    } catch (error) {
        console.error('Error al obtener los indices cotizaciones:', error);
        throw error; 
    }
};

export const obtenerPromedioTotalPorEmpresa = async () => {
    try {
        const response = await clienteAxios.get(`/cotizaciones/total-por-empresa`); 
        return response.data; 
    } catch (error) {
        console.error('Error al obtener promedio por empresa:', error);
        throw error; 
    }
};

export const calcularPromedioTotalPorIndiceSinTSE = async () => {
    try {
        const response = await clienteAxios.get(`/IndiceCotizaciones/promedio-total-sin-tse`); 
        return response.data; 
    } catch (error) {
        console.error('Error al obtener promedio por empresa:', error);
        throw error; 
    }
};

export const calcularPromedioTotalPorIndice = async () => {
    try {
        const response = await clienteAxios.get(`/IndiceCotizaciones/promedio-total-por-indice`); 
        return response.data; 
    } catch (error) {
        console.error('Error al obtener promedio por empresa:', error);
        throw error; 
    }
};

export const obtenerCotizacionesUltimoMesPorIndices = async () => {
    try {
        const response = await clienteAxios.get(`/IndiceCotizaciones/ultimo-mes`); 
        return response.data; 
    } catch (error) {
        console.error('Error al obtener promedio por empresa:', error);
        throw error; 
    }
};

export const obtenerPromedioMensualCotizacionesIndices = async () => {
    try {
        const response = await clienteAxios.get(`/IndiceCotizaciones/promedio-mensual`); 
        return response.data; 
    } catch (error) {
        console.error('Error al obtener promedio mensual de bolsas:', error);
        throw error; 
    }
};

export const obtenerPromedioCotizacionesUltimoMesAgrupadosPorEmpresa = async () => {
    try {
        const response = await clienteAxios.get(`/cotizaciones/promedio-ultimo-mes`); 
        return response.data; 
    } catch (error) {
        console.error('Error al obtener ultimo mes de empresas:', error);
        throw error; 
    }
};

// Puedes elegir exportar una de las funciones como exportación predeterminada, pero no es necesario
// Si no necesitas una exportación predeterminada, simplemente elimina la siguiente línea
// export default obtenerCotizacionesPorDiaYEmpresa; // Esto es opcional

// Si decides no usar exportación predeterminada, simplemente no la declares.