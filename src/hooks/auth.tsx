import React, { 
  createContext,
  ReactNode,
  useContext,
  useEffect
} from "react";

import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';

import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

export const AuthContext = createContext({} as IAuthContextData);


function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userStorageKey = '@gofinances:user';

  async function signInWithGoogle() {
    try {
      //https://auth.expo.io/demetriusleonardobantim/gofinances
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');
      const CLIENT_ID = '881676110595-tb3roo5ek54send5f66slc70icntmaal.apps.googleusercontent.com'
      const REDIRECT_URI = 'https://auth.expo.io/@demetriusleonardobantim/gofinances'
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      console.log(authUrl)
       const { type, params } = await AuthSession
      .startAsync({ authUrl }) as AuthorizationResponse;
      console.log('params aqui', type)
      if(type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();
        
        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture
        }
        console.log('userLogged', userLogged)
        setUser(userLogged);

        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });

      if(credential) {
        const name = credential.fullName!.givenName;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signOut() {
    console.log('oi')
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStoraged = await AsyncStorage.getItem(userStorageKey);

      if(userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged);
      }

      setUserStorageLoading(false);
    }

    loadUserStorageData();
  },[]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      signInWithGoogle,
      signInWithApple,
      signOut,
      userStorageLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }