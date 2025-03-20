import style from "./galeriaNosotros.module.css";



interface GaleriaNosotrosProps {
  imagen: string;
  ubicacion: string;

}

const GaleriaNosotros: React.FC<GaleriaNosotrosProps> = ({ imagen, ubicacion}) => {
  return (
    <div className={style.imagenContainer}>
      <img className={style.imagen} src={imagen} />
      <div className={style.carddetails}>
        <button className={style.cardbutton}>{ubicacion}</button>
      </div>
    </div>
  );
};

export default GaleriaNosotros;
