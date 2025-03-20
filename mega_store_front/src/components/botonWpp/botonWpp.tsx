import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import React from 'react';
import style from "./botonWpp.module.css"

const WhatsAppButton: React.FC = () => {
  const whatsappUrl = "https://wa.me/3534010369";  // Reemplaza con tu número de WhatsApp

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={style.whatsappButton}>
      <span className={style.whatsappIcon}><WhatsAppIcon/></span> {/* Puedes usar un icono como texto */}
    </a>
  );
};

export default WhatsAppButton;
