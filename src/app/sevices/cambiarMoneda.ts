export const tasaCambio = 5.25; 

export const convertirACambio = (valor: string, moneda: string) => {
  const valorNumerico = parseFloat(valor); 
  if (moneda === "BRL") {
    return (valorNumerico * tasaCambio).toFixed(2).toString(); 
  }
  return valor; 
};