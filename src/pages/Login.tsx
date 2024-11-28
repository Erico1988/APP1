import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, UserPlus, LogIn, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn, currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (email === 'narindra.defis@gmail.com' && password === 'FihinoTsifoina') {
        await signIn(email, password);
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion');
    }
  };

  if (currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-fuchsia-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sprout className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-800">Suivi des Tâches de Passation des Marchés</h1>
        </div>
        <h2 className="text-xl text-green-600 font-semibold">Programme DEFIS</h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
        <div className="flex rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              isLogin
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <LogIn className="h-4 w-4" />
              Connexion
            </div>
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              !isLogin
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <UserPlus className="h-4 w-4" />
              Inscription
            </div>
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="nom@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
              <span className="ml-2 text-gray-600">Se souvenir de moi</span>
            </label>
            <a href="#" className="text-green-600 hover:text-green-500">
              Mot de passe oublié?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-fuchsia-600 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-fuchsia-700 focus:ring-4 focus:ring-green-200 font-medium transition-colors"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;