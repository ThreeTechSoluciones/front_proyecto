import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Style from '../../components/categorias/todasCategorias.module.css';
import { useEffect, useState} from 'react';
import { useMarca } from '../../contexts/MarcaContext';
import ModalPut from '../../components/modalPut/ModalPut';
import { BaseObjeto } from '../../components/modalPut/ModalPut';
import { Marca } from '../../contexts/MarcaContext';

    

export default function CheckboxList() {
  const {marcas, fetchMarcas, actualizarMarca, eliminarMarca} = useMarca();
  const [open, setOpen] = useState(false)
  const [marcaSelect, setMarcaSelect]= useState<BaseObjeto | null>(null)
  
  useEffect(()=>{
    fetchMarcas()
  },[])



  const modalPut= (abrir:boolean) =>{
    setOpen(abrir)
  }

  const handleModalClose = () => {
    setOpen(false); // Actualiza el estado en el padre
  };

  const handleMarcaClick = (marca : Marca)=>{
    setMarcaSelect({
      id: Number(marca.id), // Convierte a number
      nombre: marca.nombre,
      fechaEliminacion: marca.fechaDeEliminacion || '',
    });
    modalPut(true)
  };
  
  const handleConfirmarEdicion = (marcaEditada: Marca) => {
    actualizarMarca(marcaEditada); // Llamamos a la función de actualización desde el modal
  };

  const handleEliminarMarca = (marcaEliminar:Marca) =>{
      eliminarMarca(marcaEliminar)
  }
  
  return (
    
    <List className={Style.list}>

      {(marcas ?? []).map ((marca, idx) => {

        const labelId = `checkbox-list-label-${idx}`;
        return (
          <div className={Style.container} key={marca.id}>
          <ListItem
            key={marca.id}
            disablePadding
            className={Style.contCategorias}
          > 
              <ListItemText id={labelId} primary={`${marca.nombre}`} className={Style.item} onClick={()=>handleMarcaClick(marca)}>
              </ListItemText>
          </ListItem>
          
          </div>
        );
      })}
      <ModalPut open={open} onClose={handleModalClose} objeto={marcaSelect} onConfirm={handleConfirmarEdicion} onDelete={handleEliminarMarca}  titulo='MARCA'/>
    </List>

  );
}