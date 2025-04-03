# Carlos Ramon Bautista Rodriguez Front end Developer

Bienvenido a la **Plataforma de E-commerce**, una aplicación básica de comercio electrónico desarrollada con **Next.js**, **Tailwind CSS** y **React Query**. Este proyecto demuestra la capacidad de crear interfaces modernas, gestionar datos de manera eficiente y ofrecer una experiencia de usuario fluida.

---

## **Características del Proyecto**

### **Configuración del Proyecto**
- **Next.js con App Router:** Configurado en `next.config.js`.
- **Tailwind CSS:** Tema personalizado definido en `tailwind.config.js`.
- **React Query:** Configurado en `_app.tsx` con un cliente optimizado.
- **ESLint:** Configuración presente en `.eslintrc.json`.

### **Página de Catálogo**
- **Cuadrícula de productos:** Implementada en `/productos` usando el componente `ProductGrid`.
- **React Query:** Usado para obtener datos de productos desde una API pública.
- **Paginación y filtrado:** Implementados en `index.tsx` con estados controlados.
- **Estados de carga y error:** Indicadores visuales añadidos para mejorar la experiencia del usuario.
- **Responsividad:** Adaptado a dispositivos móviles, tabletas y escritorios con Tailwind CSS.

### **Página de Detalle de Producto**
- **Página dinámica:** Implementada en `/productos/[id]` con rutas dinámicas de Next.js.
- **React Query:** Usado para cargar datos del producto y productos relacionados.
- **Productos relacionados:** Consultas paralelas implementadas para mostrar productos similares.
- **Botón "Añadir al Carrito":** Conectado al carrito con persistencia en `localStorage`.

### **Carrito de Compras**
- **Drawer/sidebar:** Implementado en `CartDrawer.tsx` con diseño responsivo.
- **Persistencia:** Datos almacenados en `localStorage` usando el hook `useCart`.
- **Resumen de compra:** Subtotal, impuestos y total calculados dinámicamente.
- **Mutaciones con React Query:** Usadas para añadir, actualizar y eliminar productos.

### **React Query**
- **Consultas básicas:** Usadas en catálogo y detalle de producto.
- **Mutaciones:** Implementadas en el carrito para añadir, actualizar y eliminar productos.
- **Invalidación de caché:** Configurada después de mutaciones en `useCart`.
- **Consultas paralelas:** Implementadas para productos relacionados.
- **Paginación:** Implementada en el catálogo con React Query.
- **Prefetching:** Usado en la página de detalle de producto.
- **Estado optimista:** Implementado en el carrito para mejorar la experiencia del usuario.
- **Reintento configurable:** Configurado en `_app.tsx` para manejar errores.
- **Indicadores visuales:** Añadidos para estados de carga y error.

### **Implementación con Tailwind**
- **Interfaz atractiva:** Diseñada exclusivamente con utilidades de Tailwind CSS.
- **Diseño responsivo:** Adaptado a todos los tamaños de pantalla.
- **Tema personalizado:** Colores primarios y secundarios definidos en `tailwind.config.js`.
- **Animaciones y transiciones:** Añadidas en botones y el drawer del carrito.
- **Tema oscuro/claro:** Implementado con `ThemeToggle` y clases de Tailwind CSS.

### **Características Extra**
- **Autenticación simulada:** Implementada con login/registro y redirección en `AuthContext`.
- **Sistema de favoritos:** Persistencia implementada con `localStorage`.
- **Página "Mi Cuenta":** Mostrando datos ficticios y un historial de pedidos.
- **Análisis de rendimiento:** Uso de `React.memo` y `useCallback` para optimizar componentes.
- **Accesibilidad:** Atributos ARIA y soporte para navegación por teclado añadidos.

---

## Estructura del Proyecto

```
ecommerce-platform
├── public
│   ├── favicon.ico
│   └── images/
├── src
│   ├── components/
│   │   ├── CartDrawer.tsx
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── ThemeToggle.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useFavorites.ts
│   │   └── useAuth.ts
│   ├── pages/
│   │   ├── _app.tsx
│   │   ├── index.tsx
│   │   ├── productos/
│   │   │   ├── [id].tsx
│   │   │   └── index.tsx
│   │   └── mi-cuenta.tsx
│   ├── services/
│   │   └── api.ts
│   ├── styles/
│   │   └── globals.css
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       └── helpers.ts
├── .eslintrc.json
├── .prettierrc
├── next-env.d.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Instrucciones para Ejecutar el Proyecto Localmente

1. **Clona el repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd ecommerce-platform
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Ejecuta la aplicación**:
   ```bash
   npm run dev
   ```

4. **Abre tu navegador** y visita `http://localhost:3000` para ver la aplicación en acción.

## Desafíos y Soluciones

Durante el desarrollo, se enfrentaron varios desafíos, como la gestión del estado del carrito y la implementación de la autenticación. Se utilizaron hooks personalizados y React Query para simplificar la gestión de datos y mejorar la experiencia del usuario.

¡Esperamos que disfrutes explorando y utilizando esta plataforma de e-commerce!