import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';

import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import { Sucursal } from '../../contexts/SucursalContext';
import { useState } from 'react';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

type Props = {
    sucursales: Sucursal[];
    onChange: (idSucursal: number, cantidad: number) => void;
}
export default function SelectSucursal({sucursales, onChange}:Props) {

const [idSucursal, setIdSucursal] = useState<number>(0);
  const [cantidad, setCantidad] = useState<number>(0);

  const handleSucursalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    setIdSucursal(value);
    onChange(value, cantidad); // Notificamos al padre
  };

  const handleCantidadChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = parseInt(event.target.value);
    setCantidad(value);
    onChange(idSucursal, value); // Notificamos al padre
  };

  return (
    <div>
      
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="select-sucursal">Sucursal</InputLabel>
        <NativeSelect
          
          id="select-sucursal"
          value={idSucursal}
          onChange={handleSucursalChange}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />

          {sucursales.map((sucursal) => (
            <option key={sucursal.id} value={sucursal.id}>
              {sucursal.nombre}
            </option>
          ))}                
        </NativeSelect>
      </FormControl>

        {/* Cantidad */}
        <FormControl sx={{ m: 1, width:'5vw' }} variant="standard">
        <InputLabel htmlFor="cantidad">Cantidad</InputLabel>
        <BootstrapInput
          id="cantidad"
          type="number"
          value={cantidad}
          onChange={(e) => {
      const valor = e.target.value;
      // Solo permite números positivos
      if (/^\d*$/.test(valor)) {
        handleCantidadChange(e);
      }
    }}
    inputProps={{ min: "0" }}
        />
      </FormControl>
    </div>
  );
}
