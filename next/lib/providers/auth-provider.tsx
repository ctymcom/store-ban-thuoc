import MD5 from 'crypto-js/md5';
import jwt_decode from 'jwt-decode';
import { createContext, useContext, useState } from 'react';
import UAParser from 'ua-parser-js';
import { ClearAuthToken, SetAuthToken } from '../graphql/auth.link';
import { AritoUser, AritoUserService } from '../repo/arito-user.repo';
import { GetAuthToken } from './../graphql/auth.link';

const AuthContext = createContext<{
  user?: AritoUser 
  checkUser?: () => boolean
  login?: (username: string, password: string) => Promise<AritoUser> 
  logout?: () => void
}>({});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any | null>(undefined);

  // useEffect(() => {
  //   return firebase.auth().onAuthStateChanged(async (user) => {
  //   });
  // }, []);

  const checkUser = (): boolean => {
    let token = GetAuthToken()
    if (token) {
      let decodedToken = jwt_decode(token) as {
        exp: number
        role: string
        user: AritoUser
      }
      if (Date.now() >= decodedToken.exp * 1000) {
        return null;
      }
      setUser(decodedToken.user)
      return true
    } else {
      return null
    }
  }

  const login = async (username: string, password: string) => {
    let encryptedPassword = MD5(password).toString()

    const parser = new UAParser()
    const result = parser.getResult()
    const headers = {
      'x-d-model': result.device.model,
      'x-d-brand': result.device.vendor,
      'x-d-name': result.browser.name,
      'x-d-os': result.os.name,
    }
    const { token, user } = await AritoUserService.loginAritoUser(username, encryptedPassword, headers)
    if (user.id) {
      SetAuthToken(token)
      setUser(user)
    } else {
      ClearAuthToken()
      throw Error('Đăng nhập thất bại')
    }
    return user
  }

  const logout = () => {
    ClearAuthToken()
    location.reload()
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);