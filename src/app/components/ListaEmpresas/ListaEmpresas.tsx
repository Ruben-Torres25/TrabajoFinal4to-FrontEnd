// src/app/components/ListaEmpresas/ListaEmpresas.tsx
import React from 'react';

// Definir la interfaz para la empresa
interface Empresa {
  id: number;
  codempresa: string;
  empresaNombre: string;
  cotizacionInicial: string;
  cantidadAcciones: string;
}

interface Props {
  empresas: Empresa[];
  onSelect: (codigo: string, nombre: string) => void; // Cambiar la firma de la función
}

const EmpresaList: React.FC<Props> = ({ empresas, onSelect }) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: '16px', 
      padding: '20px', 
      justifyContent: 'center', // Centrar el contenido
      marginTop: '64px' // Mantener el margen superior
    }}>
      {empresas.map(empresa => (
        <div
          key={empresa.id}
          onClick={() => onSelect(empresa.codempresa, empresa.empresaNombre)}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            width: '150px',
            cursor: 'pointer',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            background: '#eee'
          }}
        >
          <h3>{empresa.empresaNombre}</h3>
        </div>
      ))}
    </div>
  );
};

export default EmpresaList;