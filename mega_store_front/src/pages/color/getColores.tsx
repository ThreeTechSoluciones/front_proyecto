import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Style from '../../components/categorias/todasCategorias.module.css';
import { useEffect, useState } from 'react';
import { Color, useColor } from '../../contexts/ColorContext';
import { BaseObjeto } from '../../components/modalPut/ModalPut';
import ModalPut from '../../components/modalPut/ModalPut';

export default function CheckboxList() {
  const {fetchColores, eliminarColor, actualizarColor, colores} =useColor()
  const [open, setOpen] = useState(false)
  const [objectSelect, setObjectSelect]= useState<BaseObjeto | null>(null)

  //GET
  useEffect(() => {
    fetchColores()
  }, []);
  const modalPut= (abrir:boolean) =>{
    setOpen(abrir)
  }

  const handleModalClose = () => {
    setOpen(false); // Actualiza el estado en el padre
  };
  
  const handleClick = (data: Color)=>{
    setObjectSelect({
      id: Number(data.id), // Convierte a number
      nombre: data.nombre,
      fechaEliminacion: data.fechaDeEliminacion || '',
    });
    modalPut(true)
  };
  
  const handleConfirmarEdicion = (objectEditadar: Color) => {
    actualizarColor(objectEditadar); // Llamamos a la función de actualización desde el modal
  };

  const handleEliminar = (objectEliminar: Color) =>{
      eliminarColor(objectEliminar)
  }


  return (

    <List className={Style.list}>

      {(colores ?? [1,2,3]).map ((color, idx) => {

        const labelId = `checkbox-list-label-${idx}`;
 
        return (
        <div className={Style.container} key={color.id}>
          <ListItem
            disablePadding
            className={Style.contCategorias}
            
          > 
              <ListItemText id={labelId} primary={`${color.nombre}`} className={Style.item} onClick={()=>handleClick (color)} />
          </ListItem >
          </div>
          
        );
      })}
      <ModalPut open={open} onClose={handleModalClose} objeto={objectSelect} onConfirm={handleConfirmarEdicion} onDelete={handleEliminar}  titulo='COLOR'/>
    </List>
  
  );
  
}