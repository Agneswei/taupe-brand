import React, { useState } from 'react';

interface PasswordGateProps {
  onPasswordCorrect: () => void;
}

const PasswordGate: React.FC<PasswordGateProps> = ({ onPasswordCorrect }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get password from environment variable
  const CORRECT_PASSWORD = process.env.REACT_APP_ACCESS_PASSWORD || 'defaultpassword';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        sessionStorage.setItem('taupeAccess', 'granted');
        onPasswordCorrect();
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extralight tracking-widest text-black">TAUPE</h1>
          <p className="text-gray-500 mt-2 text-sm">Under Construction</p>
        </div>

        {/* Password Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <h2 className="text-xl font-light text-center mb-6">
            Enter Access Code
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-black transition-colors"
                required
                disabled={isLoading}
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-3 rounded-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Enter Site'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              This site is currently under development.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Taupe. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordGate;

