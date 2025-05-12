
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield } from 'lucide-react';

interface PreAccessPanelProps {
  onAccess: () => void;
}

const PreAccessPanel: React.FC<PreAccessPanelProps> = ({ onAccess }) => {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple example - replace '123456' with your desired access code
    if (accessCode === '021993') {
      onAccess();
    } else {
      setError('Código de acceso incorrecto');
    }
  };

  return (
    <div className="bg-gradient-to-b from-magic-light/50 to-white py-12 md:py-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="bg-magic/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-10 w-10 text-magic" />
            </div>
            <h1 className="text-3xl font-bold text-magic-dark">Área Restringida</h1>
            <p className="text-magic-dark/70 mt-2">
              Ingrese el código de acceso para continuar
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-magic-light overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Código de acceso"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="border-magic-light"
                />
                {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
              </div>
              
              <Button 
                type="submit" 
                className="w-full magic-button mb-2"
              >
                Acceder
              </Button>
              
              <Button 
                type="button" 
                variant="outline"
                className="w-full"
                onClick={() => window.location.href = '/'}
              >
                Volver al Menú Principal
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreAccessPanel;
