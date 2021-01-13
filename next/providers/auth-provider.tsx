import { createContext, useEffect, useState } from 'react';
import { firebase } from '../lib/firebase-client';
import nookies from 'nookies';
import { useContext } from 'react';
import { UserRepository } from '../lib/repo/user.repo';
import { GetServerSidePropsContext } from 'next';

const AuthContext = createContext<{ user: any | null }>({
  user: null,
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any | null>(null);
  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, 'x-token', '', { path: '/'});
      } else {
        const token = await user.getIdToken();
        new UserRepository().login(token).then(({ user, token }) => {
            nookies.set(undefined, 'x-token', token, { path: '/'});;
        })
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>
        {children}
    </AuthContext.Provider>
  );
}

export const useAtuh = () => useContext(AuthContext);

export function AuthMiddleware(fn?: (context: GetServerSidePropsContext) => { props: any } | Promise<{ props: any }>) {
    return (context: GetServerSidePropsContext) => { 
        const cookies = nookies.get(context);
        if (!cookies["x-token"]) {
            context.res.writeHead(302, { Location: "/auth/login" });
            context.res.end();
        }
        return fn ?  fn(context) : { props: {} };
    } 
}

export function NonAuthMiddleware(fn?: (context: GetServerSidePropsContext) => { props: any }) {
    return (context: GetServerSidePropsContext) => { 
        const cookies = nookies.get(context);
        if (cookies["x-token"] && cookies["x-token"].length > 0) {
            context.res.writeHead(302, { Location: "/" });
            context.res.end();
        }
        return fn ?  fn(context) : { props: {} };
    } 
}