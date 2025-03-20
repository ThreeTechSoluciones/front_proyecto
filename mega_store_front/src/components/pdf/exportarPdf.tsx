import  { forwardRef, useImperativeHandle } from "react";
import html2pdf from "html2pdf.js";

interface ExportarPdfProps{
    id: string;
    title:string;

}

const ExportarPdf = forwardRef<{ exportPdf: () => void }, ExportarPdfProps>(
    ({ id, title }, ref) => {
      // Exponer el método `exportPdf` al componente padre usando `useImperativeHandle`
      useImperativeHandle(ref, () => ({
        exportPdf() {
          const elemento = document.getElementById(id);
          if (elemento) {
            html2pdf().from(elemento).save(`${title}.pdf`);
          }
        },
      }));
  
      return null; // Este componente no renderiza nada directamente
    }
  );
export default ExportarPdf;