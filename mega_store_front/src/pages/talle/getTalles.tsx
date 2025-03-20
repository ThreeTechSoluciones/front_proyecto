import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Style from '../../components/categorias/todasCategorias.module.css';
import { useEffect, useState } from 'react';
import { useTalle, Talle } from '../../contexts/TalleContext';
import { BaseObjeto } from '../../components/modalPut/ModalPut';
import ModalPut from '../../components/modalPut/ModalPut';

/**
 * Componente `CheckboxList` para listar talles con opciones de edición y eliminación.
 * 
 * Utiliza un modal para editar o eliminar un talle seleccionado. Se conecta a través
 * de `useTalle` para realizar las operaciones necesarias (fetch, update y delete).
 * 
 * @component
 */
export default function CheckboxList() {
  const {talles, fetchTalles,actualizarTalle,eliminarTalle} =useTalle()
  const [open, setOpen] = useState(false)
  const [objectSelect, setObjectSelect]= useState<BaseObjeto | null>(null)
 

  //GET
  useEffect(() => {
    fetchTalles()
  }, []);

    /**
   * Abre o cierra el modal de edición.
   * 
   * @param {boolean} abrir - Estado para abrir (`true`) o cerrar (`false`) el modal.
   */
    const modalPut = (abrir: boolean) => {
      setOpen(abrir);
    };
  
    /**
     * Cierra el modal de edición.
     */
    const handleModalClose = () => {
      setOpen(false); // Cierra el modal
    };
  
    /**
     * Maneja la selección de un talle para editar.
     * 
     * @param {Talle} data - El talle seleccionado.
     */
    const handleClick = (data: Talle) => {
      setObjectSelect({
        id: Number(data.id), // Convierte el ID a número
        nombre: data.nombre,
        fechaEliminacion: data.fechaDeEliminacion || '', // Asegura un valor predeterminado
      });
      modalPut(true); // Abre el modal
    };
  
    /**
     * Confirma la edición del talle seleccionado.
     * 
     * @param {Talle} objectEditadar - El objeto editado que se va a actualizar.
     */
    const handleConfirmarEdicion = (objectEditadar: Talle) => {
      actualizarTalle(objectEditadar); // Llama a la función de actualización
    };
  
    /**
     * Elimina el talle seleccionado.
     * 
     * @param {Talle} objectEliminar - El objeto que se va a eliminar.
     */
    const handleEliminar = (objectEliminar: Talle) => {
      eliminarTalle(objectEliminar); // Llama a la función de eliminación
    };

  return (

    <List className={Style.list}>

      {(talles ?? [1,2,3]).map ((talle, idx) => {

        const labelId = `checkbox-list-label-${idx}`;

        return (
          <div className={Style.container} key={talle.id}>
            <ListItem
            disablePadding
            className={Style.contCategorias}
          > 
              <ListItemText id={labelId} primary={`${talle.nombre}`} className={Style.item} onClick={()=>handleClick (talle)}/>
          </ListItem>
          </div>
          
        );
      })}
      <ModalPut open={open} onClose={handleModalClose} objeto={objectSelect} onConfirm={handleConfirmarEdicion} onDelete={handleEliminar}  titulo='TALLE'/>
    </List>
  );
}