
import React from 'react';
import { Users } from 'lucide-react';

const SecurityAdmin: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-magic-light p-6">
      <h2 className="text-xl font-bold text-magic-dark mb-4">Administración de Seguridad</h2>
      <p className="text-magic-dark/70 mb-6">
        Administra usuarios del panel y consulta el registro de actividades de seguridad.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-magic-dark mb-4">Usuarios Administradores</h3>
          <div className="bg-magic-light/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-magic mr-2" />
                <span className="font-semibold">admin</span>
              </div>
              <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">Activo</span>
            </div>
            <p className="text-sm text-magic-dark/70">
              Este es un demo con un usuario administrador predefinido. En una implementación real, aquí podrías gestionar múltiples usuarios con diferentes niveles de permiso.
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-magic-dark mb-4">Registro de Actividad</h3>
          <div className="bg-magic-light/30 rounded-lg p-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <span className="bg-magic-light/70 text-magic-dark px-2 py-1 rounded text-xs mr-2 whitespace-nowrap">
                  {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                </span>
                <span>Inicio de sesión exitoso (Usuario: admin)</span>
              </div>
              <div className="flex items-start">
                <span className="bg-magic-light/70 text-magic-dark px-2 py-1 rounded text-xs mr-2 whitespace-nowrap">
                  {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                </span>
                <span>Acceso al panel de administración</span>
              </div>
              <p className="text-magic-dark/70 mt-2">
                Este es un registro simulado. En una implementación real, aquí verías un historial completo de actividades de seguridad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityAdmin;
