import React from 'react';
import img1 from '../../components/cardProductoAdmin/imagenes/localVM.png';
import img2 from '../../components/cardProductoAdmin/imagenes/localRC.png';
import GaleriaNosotros from '../../components/galeriaNosotros/galeriaNosotros';
//Importación de estilos
import style from "./nosotros.module.css";
const Nosotros: React.FC = () => {
    return (
    <div className={style.mainContainer}>
    <div className={style.container}>
        <h1>CONOCENOS</h1>
        <p className={ style.parrafo }>
        En MegaStore, nos apasiona el deporte y la moda. Desde nuestros inicios, nos hemos dedicado a ofrecer 
        ropa deportiva de la más alta calidad, diseñada para brindar comodidad, 
        estilo y rendimiento. Nos especializamos en crear prendas que se adapten a 
        todas las necesidades, desde entrenamientos intensos hasta actividades casuales.
        </p>
        <p className={style.parrafo}>
        Nuestro compromiso es combinar innovación y sostenibilidad, trabajando con materiales
        de última generación y procesos responsables con el medio ambiente. En MegaStore, 
        no solo vestimos atletas, sino a todos aquellos que buscan superar sus límites con 
        confianza y estilo. ¡Te invitamos a ser parte de nuestra comunidad y llevar tu pasión 
        al siguiente nivel!
        </p>
    </div>
    <div className={style.container2}>
        <h1>CONOCÉ NUESTROS LOCALES</h1>
        <div className={style.probando}>
        <GaleriaNosotros imagen={img2} ubicacion="Rio Cuarto" />
        <GaleriaNosotros imagen={img1} ubicacion="Villa María"/>
        <GaleriaNosotros imagen={img2} ubicacion="Rosario" />
        </div>
        
    </div>
</div>

    
    );
};

export default Nosotros;