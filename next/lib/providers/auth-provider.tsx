// import MD5 from 'crypto-js/md5';
import md5 from "md5";
import jwt_decode from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import UAParser from "ua-parser-js";

import { ClearAuthToken, SetAuthToken } from "../graphql/auth.link";
import { AritoUser, AritoUserService } from "../repo/arito-user.repo";
import { GraphService } from "../repo/graph.repo";
import { GetAuthToken } from "./../graphql/auth.link";

export const LOGIN_PATHNAME = "login-pathname";

const AuthContext = createContext<{
  user?: AritoUser;
  setUser?: Function;
  showDialogUpdatePassword?: boolean;
  setShowDialogUpdatePassword?: Function;
  saveCurrentPath?: () => void;
  checkUser?: (roles?: string[]) => Promise<boolean>;
  login?: (username: string, password: string, mode: "user" | "editor") => Promise<AritoUser>;
  register?: (nickname: string, email: string, phone: string) => Promise<AritoUser>;
  logout?: () => void;
  updateAritoUser?: (data: AritoUser) => Promise<{ type: string; mess: string }>;
  changeAritoUserPassword?: (
    oldPass: string,
    newPass: string
  ) => Promise<{ type: string; mess: string }>;
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

  const checkUser = async (roles: any[] = null): Promise<boolean> => {
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
        try {
          let user = await AritoUserService.userGetMe();
          setUser(user);
          return true;
        } catch (err) {
          setUser(null);
          return false;
        }
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
    let noti = { type: "", mess: "" };
    const { nickname, phone, birthday, companyType, companyName } = data;
    await AritoUserService.userUpdateMe({
      nickname,
      phone,
      birthday,
      companyType,
      companyName,
    })
      .then((res) => {
        SetAuthToken(res.token);
        setUser(res.user);
        noti = { type: "success", mess: "Cập nhật thành công" };
      })
      .catch((err) => {
        noti = { type: "warn", mess: err };
      });
    return noti;
  };

  const changeAritoUserPassword = async (oldPass: string, newPass: string) => {
    let encryptedOldPassword = md5(oldPass);
    let encryptedNewPassword = md5(newPass);
    let noti = { type: "", mess: "" };
    try {
      noti.type = "success";
      noti.mess = await AritoUserService.userChangePassword(
        encryptedOldPassword,
        encryptedNewPassword
      );
    } catch (err) {
      noti.type = "warn";
      noti.mess = err.message;
    }
    return noti;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        setShowDialogUpdatePassword,
        showDialogUpdatePassword,
        changeAritoUserPassword,
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
