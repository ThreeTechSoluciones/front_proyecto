import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Style from '../../components/categorias/todasCategorias.module.css';
import { useEffect, useState } from 'react';
import { Sucursal, useSucursales } from '../../contexts/SucursalContext';
import { BaseObjeto } from '../../components/modalPut/ModalPut';
import ModalPut from '../../components/modalPut/ModalPut';


export default function CheckboxList() {
  const {fetchSucursales, sucursales, actualizarSucursal, eliminarSucursal} = useSucursales();
  const [open, setOpen] = useState(false)
  const [sucursalSelect, setSucursalSelect]= useState<BaseObjeto | null>(null)

  //GET
  useEffect(() => {
    fetchSucursales()
  }, []);
  
  const modalPut= (abrir:boolean) =>{
    setOpen(abrir)
  }

  const handleModalClose = () => {
    setOpen(false); // Actualiza el estado en el padre
  };
  
  const handleSucursalClick = (sucursal: Sucursal)=>{
    setSucursalSelect({
      id: Number(sucursal.id), // Convierte a number
      nombre: sucursal.nombre,
      fechaEliminacion: sucursal.fechaDeEliminacion || '',
    });
    modalPut(true)
  };
  
  const handleConfirmarEdicion = (sucursalEditada: Sucursal) => {
    actualizarSucursal(sucursalEditada); // Llamamos a la función de actualización desde el modal
  };

  const handleEliminar = (sucursalEliminar: Sucursal) =>{
      eliminarSucursal(sucursalEliminar)
  }

  return (

    <List className={Style.list}>

      {(sucursales ?? []).map ((sucursal, idx) => {

        const labelId = `checkbox-list-label-${idx}`;

        return (
          <div className={Style.container} key={sucursal.id}>
            <ListItem
            disablePadding
            className={Style.contCategorias}
          > 
              <ListItemText id={labelId} primary={`${sucursal.nombre}`} className={Style.item} onClick={()=>handleSucursalClick (sucursal)}/>
          </ListItem>

          </div>
          
        );
      })}
      <ModalPut open={open} onClose={handleModalClose} objeto={sucursalSelect} onConfirm={handleConfirmarEdicion} onDelete={handleEliminar}  titulo='SUCURSAL'/>
    </List>
  );
}