import styles from './barrabusqueda.module.css';
import { useState } from "react";
import { useProductos } from '../../contexts/ProductoContext';
import SearchIcon from '@mui/icons-material/Search';

const BarraBusqueda = () => {
    const [buscarProductos, setBuscarProductos] = useState("");
    const { filtrarProductosPorNombre } = useProductos(); // Obtenemos la función de filtrado desde el contexto

    const handleBuscar = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBuscarProductos(event.target.value);
    };

    const handleSearchClick = () => {
        console.log("Búsqueda enviada:", buscarProductos); 
        filtrarProductosPorNombre(buscarProductos)// Muestra en consola el texto completo
    }
    
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearchClick();
        }
    };
    

    return (
        <div className={styles.container}>
            <div className={styles.mainbox}>
                
                <input 
                    className={styles.search_input} 
                    placeholder="Buscar..." 
                    type="text" 
                    value={buscarProductos}
                    onChange={handleBuscar} 
                    onKeyDown={handleKeyPress} // Detecta la tecla Enter
                />
                <button className={styles.search_button} onClick={() => handleSearchClick()} >
                    <SearchIcon className={styles.search_icon}></SearchIcon>                    
                </button>
            </div>
        </div>
    );
};

export default BarraBusqueda;
