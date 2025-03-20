import styles from './ModalPut.module.css'
import Dialog from '@mui/material/Dialog'; // Dialog (se usa como un modal)
import DialogContent from '@mui/material/DialogContent'; // Contenido del modal de Material UI
import DialogActions from '@mui/material/DialogActions'; // Acciones como botones en el modal de Material UI
import Button from '@mui/material/Button'; // Botón de Material UI
import ZoomBoton from '../transitions/buttomzoom'; 
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';


export interface BaseObjeto {
  id: number; // Puede ser número o string según tus datos.
  nombre: string;
  fechaEliminacion?: string | null;
}
;
  
  type Props<T extends BaseObjeto> = {
    open: boolean;
    onClose: () => void;
    objeto: T | null; // Si no hay marca seleccionada, puede ser null
    onConfirm: (objeto: T) => void; 
    onDelete: (objeto: T) => void; 
    titulo: string | ''
  };

const ModalPut = <T extends BaseObjeto>({ open, onClose, objeto, onConfirm, onDelete, titulo }: Props<T>) =>{

    // Estado para controlar la visibilidad del modal de producto
    const [isDialogOpen, setDialogOpen] = useState(open ?? false);
    const [objectoSelect, setObjetoSelect] = useState(objeto ?? null);
    const [confirmar, setConfirmar] = useState(false)
    const [confirmarD, setConfirmarD] = useState(false)

  //Carga de las const al momento de abrir el modal 
    useEffect(() => {
        setDialogOpen(open);
        setObjetoSelect(objeto)
        setConfirmar(false)
        setConfirmarD(false)
    }, [open]);
  
    //funcion para cerrar el modal
    const handleClose = () => {
        setDialogOpen(false);
        onClose(); 
    };

    //funcion para pasar a confirmar (cambia el simbolo al tilde)
    const aConfirmar =(data: boolean)=>{
        setConfirmar(data)
    }
    //funcion para pasar a confirmar (cambia el simbolo al tilde) en el DELETE
    const aConfirmarD =(data: boolean)=>{
        setConfirmarD(data)
    }

    //funcion para confirmar el Put
    const confirmarPut = () =>{
        if (objectoSelect) {
          onConfirm(objectoSelect); // Ejecutamos la función de confirmación pasando el objeto
        }
        setConfirmar(false)
    }

    //funcion para confirmar el delete
    const confirmarDelete = () =>{
        if (objectoSelect) {
          onDelete(objectoSelect); // Ejecutamos la función de confirmación pasando el objeto
        }
        setConfirmar(false)
        handleClose()
    }
    
  return (
    <>
        <Dialog open={isDialogOpen} onClose={handleClose} fullWidth maxWidth="xs"  >
        <DialogContent className={styles.Dialog}>

            <div className={styles.contInfo}> 
              {objectoSelect ?  
              ( 
                <>
                <h2>{titulo}</h2>
                <input
                  type="text"
                  value={objectoSelect.nombre}
                  readOnly={!confirmar}

                  className={confirmar ? `${styles.linea}`: ''}

                  onChange={(e) => {
                    if (confirmar) {
                      setObjetoSelect({
                        ...objectoSelect,
                        nombre: e.target.value,
                      });
                    }

                  }}
                />
                </>
              )
              :
              (
                <h1>no hay objeto</h1>
              )}
            </div>

        </DialogContent>

          <DialogActions className={styles.contBotones}>
            {/* Boton eliminar */}
            <Button>
                {confirmarD ? 
                (<CheckIcon className={styles.botones} onClick={()=> confirmarDelete()}></CheckIcon>)
                :
                (<DeleteIcon className={styles.botones} onClick={()=> aConfirmarD(true)}></DeleteIcon>)}
            </Button>
            
            {/* Boton editar */}
            <Button  >
              {confirmar ? 
              (<CheckIcon className={styles.botones} onClick={()=> confirmarPut()}></CheckIcon>)
              :
              (<CreateIcon className={styles.botones} onClick={()=> aConfirmar(true)} ></CreateIcon>)}
            </Button>

            <Button onClick={handleClose}>
                <ZoomBoton />
            </Button>
          
          </DialogActions>
        </Dialog>
    </>
  );
}
export default ModalPut;