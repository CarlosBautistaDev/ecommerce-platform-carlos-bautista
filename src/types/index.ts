export interface Producto {
    id: number; 
    title: string; 
    price: number; 
    description: string; 
    category: string;
    image: string; 
    rating: {
        rate: number; 
        count: number; 
    };
}

export interface CarritoItem {
    producto: Producto; 
    cantidad: number;
}


export interface Carrito {
    items: CarritoItem[]; 
    total: number; 
}

export interface ApiResponseProductos {
    productos: Producto[]; 
    total: number;
    skip: number; 
    limit: number; 
}