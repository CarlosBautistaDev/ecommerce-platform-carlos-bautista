import { useAuth } from '@/context/AuthContext';

const MiCuentaPage: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <p className="text-lg">Debes iniciar sesión para ver esta página.</p>
      </div>
    );
  }

  const accountData = {
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    telefono: '+52 123 456 7890',
    direccion: 'Calle Falsa 123, Ciudad de México, México',
    pedidos: [
      { id: 1, total: 50.0, fecha: '2023-09-01' },
      { id: 2, total: 30.0, fecha: '2023-08-15' },
      { id: 3, total: 20.0, fecha: '2023-07-10' },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Mi Cuenta
        </h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Información Personal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Nombre:
                </span>{' '}
                {accountData.nombre}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Correo Electrónico:
                </span>{' '}
                {accountData.email}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Teléfono:
                </span>{' '}
                {accountData.telefono}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Dirección:
                </span>{' '}
                {accountData.direccion}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Historial de Pedidos
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200">
                    ID Pedido
                  </th>
                  <th className="border-b dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200">
                    Fecha
                  </th>
                  <th className="border-b dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {accountData.pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td className="border-b dark:border-gray-700 px-4 py-2 text-gray-600 dark:text-gray-400">
                      #{pedido.id}
                    </td>
                    <td className="border-b dark:border-gray-700 px-4 py-2 text-gray-600 dark:text-gray-400">
                      {pedido.fecha}
                    </td>
                    <td className="border-b dark:border-gray-700 px-4 py-2 text-gray-600 dark:text-gray-400">
                      ${pedido.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-right">
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiCuentaPage;