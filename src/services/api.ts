import axios from 'axios';
import { Product } from '../types';

const API_URL = 'https://fakestoreapi.com/products'; 


export const fetchProducts = async (category: string, page: number, limit: number): Promise<{ products: Product[]; total: number }> => {
  try {
      const offset = (page - 1) * limit; 
      const url = category
          ? `${API_URL}/category/${category}`
          : `${API_URL}`;
      const response = await axios.get<Product[]>(url);

      const allProducts = response.data;
      const filteredProducts = allProducts.slice(offset, offset + limit); 
      const total = allProducts.length; 

      return { products: filteredProducts, total };
  } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw new Error('No se pudieron cargar los productos');
  }
};

export const fetchProductById = async (id: number): Promise<Product> => {
    try {
      const response = await axios.get<Product>(`${API_URL}/${id}`);
      if (!response.data || typeof response.data.id === 'undefined') {
        throw new Error('Producto inválido recibido de la API');
      }
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${id}:`, error);
      throw new Error('No se pudo cargar el producto');
    }
  };

export default {
    fetchProducts,
    fetchProductById,
};