import clienteAxios from "./axios";

// Función para obtener cotizaciones por empresa
export const obtenerCotizacionesPorEmpresa = async (codigoEmpresa: string) => {
    try {
        // Asegúrate de que esta ruta sea correcta
        const response = await clienteAxios.get(`/empresas/${codigoEmpresa}/cotizaciones`); // Cambiado para reflejar la ruta correcta
        return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error al obtener las cotizaciones:', error);
        throw error; // Lanza el error para manejarlo en otro lugar si es necesario
    }
};

export default obtenerCotizacionesPorEmpresa;