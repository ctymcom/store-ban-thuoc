// import MD5 from 'crypto-js/md5';
import md5 from "md5";
import jwt_decode from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import UAParser from "ua-parser-js";

import { ClearAuthToken, SetAuthToken } from "../graphql/auth.link";
import { AritoUser, AritoUserService } from "../repo/arito-user.repo";
import { GraphService } from "../repo/graph.repo";
import { GetAuthToken } from "./../graphql/auth.link";
import data from "../../components/index/ingredients/data/ingredients-data";

export const LOGIN_PATHNAME = "login-pathname";

const AuthContext = createContext<{
  user?: AritoUser;
  showDialogUpdatePassword?: boolean;
  setShowDialogUpdatePassword?: Function;
  saveCurrentPath?: () => void;
  checkUser?: (roles?: string[]) => boolean;
  login?: (username: string, password: string, mode: "user" | "editor") => Promise<AritoUser>;
  register?: (nickname: string, email: string, phone: string) => Promise<AritoUser>;
  logout?: () => void;
  updateAritoUser?: (data: AritoUser) => void;
  changeAritoUserPasswrod?: (oldPass: string, newPass: string) => void;
  recoveryPassword?: (email: string) => Promise<string>;
}>({});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any | null>(undefined);
  const [showDialogUpdatePassword, setShowDialogUpdatePassword] = useState(false);

  // useEffect(() => {
  //   return firebase.auth().onAuthStateChanged(async (user) => {
  //   });
  // }, []);

  useEffect(() => {
    if (user) {
      // console.log(user)
    } else if (user === null) {
      ClearAuthToken();
    }
  }, [user]);

  const saveCurrentPath = () => {
    sessionStorage.setItem(LOGIN_PATHNAME, location.pathname);
  };

  const checkUser = (roles: any[] = null): boolean => {
    let token = GetAuthToken();
    if (token) {
      let decodedToken = jwt_decode(token) as {
        exp: number;
        role: string;
        user: AritoUser;
      };
      if (Date.now() >= decodedToken.exp * 1000) {
        setUser(null);
        return false;
      }
      if (!roles || (roles && roles.includes(decodedToken.user.role))) {
        setUser(decodedToken.user);
        return true;
      } else {
        setUser(null);
        return false;
      }
    } else {
      setUser(null);
      return false;
    }
  };

  const login = async (username: string, password: string, mode: "user" | "editor") => {
    let encryptedPassword = md5(password);

    const parser = new UAParser();
    const result = parser.getResult();
    const headers = {
      "x-d-model": result.device.model,
      "x-d-brand": result.device.vendor,
      "x-d-name": result.browser.name,
      "x-d-os": result.os.name,
    };
    const { token, user } = await AritoUserService.loginArito(
      username,
      encryptedPassword,
      headers,
      mode
    );
    await GraphService.clearStore();
    if (user.id) {
      SetAuthToken(token);
      setUser(user);
    } else {
      ClearAuthToken();
      throw Error("Đăng nhập thất bại");
    }
    return user;
  };

  const register = async (nickname: string, email: string, phone: string) => {
    const { token, user } = await AritoUserService.regisAritoUser(nickname, email, phone);
    await GraphService.clearStore();
    ClearAuthToken();
    if (user.id) {
      SetAuthToken(token, true);
      setUser(user);
    } else {
      ClearAuthToken();
      throw Error("Đăng ký thất bại");
    }
    return user;
  };

  const recoveryPassword = async (email: string) => {
    return AritoUserService.recoveryPassword(email);
  };

  const logout = () => {
    ClearAuthToken();
    location.reload();
  };

  const updateAritoUser = async (data: AritoUser) => {
    const { nickname, phone, birthday, companyType, companyName } = data;
    const { token, user } = await AritoUserService.userUpdateMe({
      nickname,
      phone,
      birthday,
      companyType,
      companyName,
    });
    SetAuthToken(token);
    setUser(user);
    console.log("set user", token);
  };

  const changeAritoUserPasswrod = async (oldPass: string, newPass: string) => {
    let encryptedOldPassword = md5(oldPass);
    let encryptedNewPassword = md5(newPass);
    try {
      const data = await AritoUserService.userChangePassword(
        encryptedOldPassword,
        encryptedNewPassword
      );
      alert(data);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setShowDialogUpdatePassword,
        showDialogUpdatePassword,
        changeAritoUserPasswrod,
        recoveryPassword,
        login,
        register,
        logout,
        checkUser,
        saveCurrentPath,
        updateAritoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
