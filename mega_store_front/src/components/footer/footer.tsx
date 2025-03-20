import React from 'react';
// Importación de estilos
import styles from './footer.module.css';
//Importación de iconos desde mui
import CallEndIcon from '@mui/icons-material/CallEnd';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

//Componente Footer
const Footer: React.FC = () => {
  return (
  <footer className={styles.body}>
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className ={styles.options}>< CallEndIcon /> </div>
        <div className={styles.options} >< InstagramIcon /></div>
        <div className={styles.options}> <EmailIcon /></div>
      </div>
      </div>
    </footer>
    
  )
}

export default Footer;