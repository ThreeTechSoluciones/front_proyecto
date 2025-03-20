// NotificationContext.tsx
import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";


interface NotificationContextType {
  mensaje: string;
  mostrarMensaje: (msg: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({children,}) => {
  const [mensaje, setMensaje] = useState<string>("");
  
  const mostrarMensaje = (msg: string) => {
    setMensaje(msg);
    setTimeout(() => setMensaje(""), 1500); 
  };
  const value = useMemo(() => ({ mensaje, mostrarMensaje }), [mensaje]);
  const divStyles: React.CSSProperties = {
    width:'25vw',
    height:'15vw',
    backgroundColor: '#c99af3',
    border:'solid 2px white',
    borderRadius: '10px',
    color: 'white',
    position:'fixed',
    top:'50%',
    left:'50%',
    transform: 'translate(-50%, -90%)', 
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    fontSize:'clamp(1rem,1.5vw,3rem)',
    transition:'all 0.3s',
    padding:'10px'
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {mensaje && <div style={divStyles}>
        {mensaje}
      </div>} 
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification debe usarse dentro de un NotificationProvider"
    );
  }
  return context;
};