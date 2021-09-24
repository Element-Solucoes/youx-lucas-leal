import React, { useContext, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useState } from 'react';
import { FirebaseHandler } from '../classes/Firebase';

// Cria uma nova instância do firebase.
const firebase_setup = new FirebaseHandler();

// Cria um contexto para utilizarmos quando um usuário mudar seu estado de login.
export const AuthContext = React.createContext<firebase.User | null>(null);
export const auth = firebase_setup.auth;

// Returna um hook para o contexto.
export function useAuth(): firebase.User | null {
  return useContext(AuthContext);
}

// Aqui é onde a mágica acontece, o provider de autenticação vai guardar uma instância
// do usuário aqui dentro, que poderá ser utilizada posteriormente.
export const AuthProvider: React.FC = ({ children }) => {
  // Onde o usuário será guardado.
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  // Chamado toda vez que o estado de login atual muda.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setCurrentUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  // Retorna o componente do auth provider.
  return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
};
