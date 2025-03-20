import React from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCarrito } from '../../contexts/CarritoContext';



type ShoppingCartWithBadgeProps = {
    productCount: number; // Especificamos que debe ser un número
  };
  
  const ShoppingCartWithBadge: React.FC<ShoppingCartWithBadgeProps> = ({ productCount }) => {
  return (
    <Badge 
      badgeContent={productCount} 
      color="primary" // Cambia el color del badge
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right', // Posiciona el número
      }}
    >
      <ShoppingCartIcon style={{ fontSize: 'clamp(1.2rem,1.5vw,1.5rem' }} />
    </Badge>
  );
}

export default function CarritoMenuAdmin() {
    const {productosTotales} =useCarrito()

  return (
    <div style={{ padding: '10px' }} >
      <ShoppingCartWithBadge productCount={productosTotales} />
    </div>
  );
}
