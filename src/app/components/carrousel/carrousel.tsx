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
                                    <div className={styles.description}>
                                        <h4>{slideIndex === 1 ? 'Winter' : slideIndex === 2 ? 'Digital Technology' : slideIndex === 3 ? 'Globalization' : 'New technologies'}</h4>
                                        <p>{slideIndex === 1 ? 'Winter has so much to offer - creative activities' : slideIndex === 2 ? 'Gets better every day - stay tuned' : slideIndex === 3 ? 'Help people all over the world' : 'Space engineering becomes more and more advanced'}</p>
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