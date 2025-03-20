import { useEffect, useState } from 'react';
import { useMovimientoStock } from '../../contexts/MovimientoStockContext';
import { useSucursales } from '../../contexts/SucursalContext';
import SelectSucursal from './selectSucursal';
import styles from './modalMovimientoStock.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';



interface ModalMovimientoStockProps {
    
    idProducto: number ;
    img?:string;
  }
export default function ModalMovimientoStock({idProducto, img}:ModalMovimientoStockProps) {
    const{ movimientoStock}=useMovimientoStock()
    const{sucursales , fetchSucursales}=useSucursales()
  
    const [listaMovimientos, setListaMovimientos] = useState<{ id: number; idSucursal: number; cantidad: number }[]>([]);
    const [cantidadMove, setCantidadMove] = useState<{ id: number }[]>([]);

    useEffect(()=>{fetchSucursales()},[])

    // Función para agregar un nuevo SelectSucursal con ID único
    const agregarMove = () => {
      const newId = Date.now(); // Usamos timestamp para crear un ID único
      setCantidadMove([...cantidadMove, { id: newId }]);
    };

    // Función para eliminar un SelectSucursal por ID
    const eliminarMove = (id: number) => {
      setCantidadMove(cantidadMove.filter((item) => item.id !== id));
      setListaMovimientos(listaMovimientos.filter((mov) => mov.id !== id));
    };

    const actualizarMovimiento = (id: number, idSucursal: number, cantidad: number) => {
      const index = listaMovimientos.findIndex((mov) => mov.id === id);
      const nuevoMovimiento = { id, idSucursal, cantidad };
  
      if (index === -1) {
        // Si no existe, agregar el nuevo movimiento
        setListaMovimientos([...listaMovimientos, nuevoMovimiento]);
      } else {
        // Si ya existe, actualizar el movimiento
        const nuevosMovimientos = [...listaMovimientos];
        nuevosMovimientos[index] = nuevoMovimiento;
        setListaMovimientos(nuevosMovimientos);
      }
    };

   
    const generarListaMovimientos = () => {
        // Removemos el 'id' de cada movimiento
        const listaSinId = listaMovimientos.map(({ id, ...resto }) => resto);
      
        // Creamos el JSON final
        const jsonFinal = {
          idProducto: idProducto,
          listaMovimientos: listaSinId
        };

      console.log(jsonFinal)
      movimientoStock(jsonFinal)      
      
    };
    

    return (

      <div className={styles.contGeneral}>


        <div className={styles.superior}>
              <img src={img} alt="fotoProductoo" />
        </div>

        <div className={styles.inferior}>
              <button onClick={()=> agregarMove()} className={styles.agregarMove}>Agregar Movimiento</button>
              
              {cantidadMove.map((item) => (
                <div key={item.id} className={styles.contInput}>
                  <SelectSucursal
                    sucursales={sucursales}
                    onChange={(idSucursal, cantidad) => actualizarMovimiento(item.id, idSucursal, cantidad)}
                  />
                  <IconButton onClick={() => eliminarMove(item.id)} className={styles.botonDelete}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}

              {cantidadMove.length > 0 && (
                <button onClick={generarListaMovimientos} className={styles.generarMove}>Generar movimiento</button>
              )}

        </div>

      </div>
    );
}
  