
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, User, KeyRound, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await login(username, password);
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al panel de administración.",
      });
    } catch (error) {
      toast({
        title: "Error de autenticación",
        description: "Credenciales inválidas. Por favor, inténtalo nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="animate-pulse text-magic text-lg">Cargando...</div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="bg-gradient-to-b from-magic-light/50 to-white py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="bg-magic/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-10 w-10 text-magic" />
              </div>
              <h1 className="text-3xl font-bold text-magic-dark">Acceso Administrativo</h1>
              <p className="text-magic-dark/70 mt-2">
                Ingresa tus credenciales para acceder al panel de administración
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md border border-magic-light overflow-hidden">
              <div className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="username">Usuario</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-magic-dark/50 h-4 w-4" />
                        <Input
                          id="username"
                          type="text"
                          placeholder="Ingresa tu usuario"
                          className="pl-10 border-magic-light"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="password">Contraseña</Label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-magic-dark/50 h-4 w-4" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Ingresa tu contraseña"
                          className="pl-10 pr-10 border-magic-light"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-magic-dark/50 hover:text-magic transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full magic-button" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                  </Button>
                </form>
                
                <div className="mt-6 text-center text-sm text-magic-dark/60">
                  <p></p>
                  <p> <span className="font-mono"></span></p>
                  <p> <span className="font-mono"></span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLogin;
