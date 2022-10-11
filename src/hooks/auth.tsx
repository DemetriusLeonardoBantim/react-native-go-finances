import { createContext, ReactNode, useContext } from 'react'



interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  user: string
  id: string
  email: string
  photo?: string
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({children}: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{user: 'Demetrius Leonardo', id:'1', email:'Demetriusbantimvas@gmail.com'}}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}


export {AuthProvider, useAuth}