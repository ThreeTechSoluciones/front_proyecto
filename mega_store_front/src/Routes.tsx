export const API_ROUTES = {
    //BASE
    BASE: "https://megastore.dealbera.online",
    //LOGIN
    LOGIN:"/auth/login",

    //MARCAS
    GET_MARCAS:'/products/marcas',
    POST_MARCA:'/products/marca',
    PUT_MARCA:'/products/marca',
    DELETE_MARCA: (id: string) => `/products/marca/${id}`,

    //SUCURSALES
    GET_SUCURSALES: '/products/sucursales',
    POST_SUCURSAL:'/products/sucursal',
    PUT_SUCURSAL:'/products/sucursal',
    DELETE_SUCURSAL: (id: string) => `/products/sucursal/${id}`,

    //COLOR
    GET_COLOR: '/products/colores',
    POST_COLOR:'/products/color',
    PUT_COLOR:'/products/color',
    DELETE_COLOR: (id: string) => `/products/color/${id}`,

     //TALLE
     GET_TALLE: '/products/talles',
     POST_TALLE:'/products/talle',
     PUT_TALLE:'/products/talle',
     DELETE_TALLE: (id: string) => `/products/talle/${id}`,

     //CATEGORIA
     GET_CATEGORIA: '/products/categorias',
     POST_CATEGORIA:'/products/categoria',
     PUT_CATEGORIA:'/products/categoria',
     DELETE_CATEGORIA: (id: string) => `/products/categoria/${id}`,

     //PRODUCTO
     POST_PRODUCTO :'/products/producto',
     GET_PRODUCTO:'/products/productosAll',
     GET_PRODUCTO_PAGINACION: (page: number, size: number, sort: string) => `/products/productos?page=${page}&size=${size}&sort=${sort}`,
     PUT_PRODUCTO:'/products/producto',
     DELETE_PRODUCTO: (id: string) => `/products/producto/${id}`,
     GET_PRODUCTO_ESPECIFICO: (id: string) => `/products/producto/${id}`,
     HISTORIAL:(id: string) => `/products/historiales-precio/producto/${id}`,
     //ESTADISTICAS

     //PERFIL
     GET_DATOS_PERFIL:(id:string)=> `/auth/usuario/id/${id}`,
     PUT_DATOS_PERFIL: '/auth/usuario',
     
    //REGISTER
    POST_USUARIO:'/auth/usuario',
    REENVIAR_CODIGO:'/auth/usuario/reenviar-codigo',
    VERIFICAR:'/auth/usuario/verificar',

    //VENTA
    POST_VENTA:'/products/venta',
    
    //MOVIMIENTO DE STOCK
    MOVIMIENTO_STOCK: '/products/movimiento-stock',

    //ESTADISTICAS DE VENTAS
    GET_VENTAS : (fechaDesde: string, fechaHasta: string, frecuencia: string): string => 
      `/estadisticas-ventas/ventas-por-periodo?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}&frecuencia=${frecuencia}`,
    
    //ESTADISTICAS DE PRODUCTOS
    GET_PRODUCTOS: (fechaDesde: string, fechaHasta: string): string => 
    `/estadisticas-ventas/productos-mas-vendidos?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}&limite=10`,

    //ESTADISTICAS FRECUENCIA VENTAS
    GET_FREC_VENTAS:'/estadisticas-clientes/frecuencia-ventas',

    //ESTADISTICA VENTAS PROMEDIO

    GET_PROM_VENTAS:'estadisticas-clientes/montos-ventas',

    //CAMBIO DE CONTRASEÑA
    CODIGO:'/auth/obtener-codigo-password',
    VERIFICAR_CODIGO:'/auth/verificar-codigo-password',
    RESTABLECER:'/auth/restablecer-password'
    //El resto de URLS...

  

  };