import style from './Home.module.css'
import CatalogoProducto from '../producto/catalogoProductos';
import { useEffect, useState } from 'react';
import { Link } from 'react-scroll'; 
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import video from './imagenes/istockphoto-1331404383-640_adpp_is.webm'
import img1 from './imagenes/chicoweb.png'
import img3 from './imagenes/fotochicaweb.png'
import img2 from './imagenes/fotochicolisto.png'

const Home = () =>{
    const [isVisible, setIsVisible] = useState(false);

    const fotos = [
        {img:img3 , descripcion: 'CONOCE'},
        {img:img1 , descripcion: 'NUESTROS'},
        {img:img2 , descripcion: 'PRODUCTOS'}
    ] 

  // Controlar la visibilidad del botón de "subir" según el scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Mostrar el botón después de desplazarse 100px
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  
    return(
        <div className={style.contGeneral}>
            {/* <div className={style.imgHome} id='imagen'>ACTIVO</div> */}
           
            {/* VIDEO */}
            <div className={style.video} id='imagen'>
                <video autoPlay muted loop>
                    <source src={video} type="video/mp4"></source>
                </video>
                <h1>ACTIVO</h1>
            </div>

            {/* FOTOS */}
            <div className={style.contImg}>
                
                {fotos.map((foto,idx)=>(
                    <Link to='catalogo' 
                        smooth={true} 
                        duration={500}
                        className={style.img} key={idx}
                        >
                            <img src={foto.img} alt={foto.descripcion} />

                            <div className={style.frente}>
                                {foto.descripcion}
                            </div>
                    </Link>

                    ))}

            </div>

            {/* CARGA Y CATALOGO */}
            <div className={style.contCatalogo}>   
                <CatalogoProducto ></CatalogoProducto>

                {isVisible && (
                    <Link
                        to={'imagen'} smooth={true} 
                            duration={500} className={style.botonRetorno}>
                                <ArrowUpwardIcon className={style.flecha}></ArrowUpwardIcon>
                    </Link>
                )}
            </div>
        </div>
    )
}
export default Home;