// Interfaz para producto, buena práctica

export interface Producto {
    id: number,
    foto?: string | undefined ;
    nombre: string;
    descripcion: string;
    precio?: number ;
    peso: number;
    stockActual:number;
    stockMedio: number;
    stockMinimo: number;
    categoriaId: number;
    sucursales?: Sucursal[];
    marcaId: number;
    talleId: number;
    colorId: number;
    fechaCreacion?:string;
}
export interface Sucursal {
    idSucursal?: number;
    nombreSucursal: string;
    fechaDeEliminacion?: string;   
    idProducto?: number;
    cantidad?: number;    
}

export interface ProductoGet{
    id: number,
    foto?: string | undefined ;
    nombre: string;
    descripcion: string;
    precio?: number ;
    peso: number;
    stockActual:number;
    stockMedio: number;
    stockMinimo: number;
    categoriaId: number;
    categoria: string;
    sucursales: Sucursal[];
    marcaId: number;
    marca:string;
    talleId: number;
    talle:string;
    colorId: number;
    color:string;
    fechaCreacion?:string;
}