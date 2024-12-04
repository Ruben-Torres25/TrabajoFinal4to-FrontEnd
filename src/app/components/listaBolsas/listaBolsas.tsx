// src/app/components/ListaBolsas/BolsasList.tsx
import React from 'react';

// Definir la interfaz para el índice
interface Indice {
  _id: string;
  codIndice: string;
  nombreIndice: string;
}

interface Props {
  indices: Indice[];
  onSelect: (codigo: string, nombre: string) => void; // Cambiar la firma de la función
}

const BolsasList: React.FC<Props> = ({ indices, onSelect }) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: '16px', 
      padding: '20px', 
      justifyContent: 'center', // Centrar el contenido
      marginTop: '64px' // Mantener el margen superior
    }}>
      {indices.map(indice => (
        <div
          key={indice._id}
          onClick={() => onSelect(indice.codIndice, indice.nombreIndice)}
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
          <h3>{indice.nombreIndice}</h3>
        </div>
      ))}
    </div>
  );
};

export default BolsasList;