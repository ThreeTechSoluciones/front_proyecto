import React, { useEffect } from "react";
import { CircularProgress, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useHistorialCompras } from "../../contexts/HistorialComprasContext";

import style from "./historialCompras.module.css";
import WhatsAppButton from "../../components/botonWpp/botonWpp";

const ListaHistorialCompras: React.FC = () => {
  const { fetchHistorialCompras, historialData, loading, error } = useHistorialCompras();

  useEffect(() => {
    fetchHistorialCompras();
  }, []);

  if (loading) return <CircularProgress />; // Muestra un cargador mientras los datos se obtienen
  if (error) return <Typography color="error">{error}</Typography>; // Muestra el error si ocurre

  // Verifica si historialData es un array y tiene elementos
  if (!Array.isArray(historialData) || historialData.length === 0) {
    return <Typography color="error">Error: No se encontraron datos de ventas.</Typography>;
  }

  return (
<div className={style.container}>
<h3 className={style.texto}>HISTORIAL DE COMPRAS</h3>
    <List className={style.list}>
      {historialData.length === 0 ? (
        <p className={style.texto}>No hay compras registradas.</p> // Mensaje si no hay datos
      ) : (
        historialData.map((compra) => (
          <div key={compra.id}>
            <ListItem className={style.listItem} >
              <ListItemText className={style.listItemText}
                primary={`Nro compra: #${compra.id}`}
                secondary={`Fecha: ${new Date(compra.fechaVenta).toLocaleDateString("es-ES")}`}
                
                
              />
              <Typography className={style.listItemTyp} variant="body2" color="textSecondary">
              {`Monto total: $${compra.totalVenta.toLocaleString("es-ES")}`}
  </Typography>
            </ListItem>
            <Divider /> {/* Separador entre cada compra */}
          </div>
        ))
      )}
    </List>
    <WhatsAppButton /></div>
    
  );
};

export default ListaHistorialCompras;