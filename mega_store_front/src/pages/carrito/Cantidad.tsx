import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useCarrito } from '../../contexts/CarritoContext';

type Props = {
    cantidad: number;
    stockActual: number;
    idProducto:number
}

export default function BasicSelect({cantidad, stockActual,idProducto}:Props) {
  const [Cantidad, setCantidad] = React.useState(String(cantidad));
  const [listStock, setListStock]= React.useState<number[]>([]);
  const {cambioDeCantidad} = useCarrito()

  React.useEffect(()=>{
        setCantidad(String(cantidad))
        generateList(stockActual);
        
  },[cantidad])

  const handleChange = (event :any) => {
    setCantidad(event.target.value);
  };

  const generateList = (num: number): void => {
    const lista = Array.from({ length: num }, (_, index) => index + 1);
    setListStock(lista)
  };
  
  React.useEffect(()=>{
    cambioDeCantidad(idProducto,Number(Cantidad))
  },[Cantidad])

  return (
    <Box sx={{ width: 'auto' }}>
      <FormControl fullWidth  size="small" >
        <InputLabel id="demo-simple-select-label">Cantidad</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Cantidad}
          label="Cantidad"
          onChange={handleChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 150, // Ajusta el valor según lo que necesites
                overflowY: 'auto', // Activa el scroll si el contenido excede el maxHeight
              },
            },
          }}
          sx={{ width: '80px' }} //Ancho del input
        >
        {listStock.slice(0, 30).map((item) => 
            <MenuItem value={item} key={item}>{item}</MenuItem>
        )}
          
        </Select>
      </FormControl>
    </Box>
  );
}