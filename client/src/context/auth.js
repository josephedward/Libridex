// https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71
import { createContext, useContext } from 'react';

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}