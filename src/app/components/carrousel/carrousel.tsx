'use client'
import React, { useEffect, useState } from 'react';
import styles from './carrousel.module.css';

const Carrousel: React.FC = () => {
    const [activeSlide, setActiveSlide] = useState(1);
    const totalSlides = 4; // Total de slides que tienes

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev === totalSlides ? 1 : prev + 1));
        }, 8000); // Cambia el slide cada 3 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, []);

    const handleSlideChange = (slideIndex: number) => {
        setActiveSlide(slideIndex);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {[...Array(totalSlides)].map((_, index) => {
                    const slideIndex = index + 1;
                    return (
                        <React.Fragment key={slideIndex}>
                            <input
                                type="radio"
                                name="slide"
                                id={`c${slideIndex}`}
                                checked={activeSlide === slideIndex}
                                className={`${styles.inputHidden} ${styles.input}`}
                                readOnly
                            />
                            <label
                                htmlFor={`c${slideIndex}`}
                                className={`${styles.card} ${styles.label}`}
                                onClick={() => handleSlideChange(slideIndex)} // Cambia el slide al hacer clic
                            >
                                <div className={styles.row}>
                                    <div className={styles.icon}>{slideIndex}</div>
                                    <div className={`${styles.description} fondoOpacado`}>
                                        <h4>{slideIndex === 1 ? 'Bovespa' : slideIndex === 2 ? 'Actualizaciones' : slideIndex === 3 ? 'Globalizacion' : 'Nuevas tecnologias'}</h4>
                                        <p>{slideIndex === 1 ? 'Bovespas - bolsa de finanzas Brasilera' : slideIndex === 2 ? 'Cotizaciones actualizadas por empresas' : slideIndex === 3 ? 'Ayuda a visualizar las bolsas de todo el mundo' : 'Constante mejora de codificacion, aumenta la experiencia al usuario'}</p>
                                    </div>
                                </div> 
                            </label>
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default Carrousel;