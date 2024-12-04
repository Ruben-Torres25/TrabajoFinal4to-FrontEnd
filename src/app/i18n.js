import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: "pt",
        resources: {
            pt: {
                        translation: {
                            tituloIndicePresentacion: "Índices de ações",
                            textoIndicePresentacion: "Os índices de ações são indicadores que refletem o comportamento de um conjunto de ações no mercado. Estes índices permitem aos investidores medir o desempenho do mercado e compará-lo com os seus próprios investimentos.",                            
                            tituloEmpresaPresentacion: "Cotação comercial",
                            textoEmpresaPresentacion: "O preço de uma empresa é o preço pelo qual suas ações são negociadas na bolsa de valores. Este valor reflete a perceção dos investidores sobre o seu valor atual e potencial, influenciado por fatores como o seu desempenho financeiro, expectativas de crescimento e condições de mercado.",
                            
                            graficoDia: "Gráfico por dia",
                            graficoHora: "Gráfico horário",
                            graficoMes: "Gráfico por mês",
                            
                            primeroFooter: "Indústrias Bovespa.",
                            segundoFooter: "Oferecendo tecnologia confiável desde 1992",
                            terceroFooter: "Todos os direitos reservados",

                            buttons: {
                                
                                spanish: "Espanhol",
                                Portugues: "Portugues",
                                
                               
                            },
                    },
                },
                    es: {
                        translation: {
                            tituloIndicePresentacion: "Índices Bursátiles",
                            textoIndicePresentacion: "Los índices bursátiles son indicadores que reflejan el comportamiento de un conjunto de acciones en el mercado. Estos índices permiten a los inversores medir el rendimiento del mercado y compararlo con sus propias inversiones.",                           
                            tituloEmpresaPresentacion: "Cotizacion De Empresas",
                            textoEmpresaPresentacion: "La cotización de una empresa es el precio al que se negocian sus acciones en el mercado de valores. Este valor refleja la percepción de los inversores sobre su valor actual y potencial, influenciado por factores como su desempeño financiero, expectativas de crecimiento y condiciones del mercado.",
                           
                            graficoDia: "Gráfico por dia",
                            graficoHora: "Gráfico por hora",
                            graficoMes: "Gráfico por mes",
                                                                   
                            primeroFooter: "Bovespa Industries.",
                            segundoFooter: "Ofreciendo tecnologia confiable desde 1992",
                            terceroFooter: "Todos los derechos reservados",

                            buttons: {
                                
                                spanish: "español",
                                portugues: "Portugues",
                                
                               
                            },
                        }
                    }
        }
    });