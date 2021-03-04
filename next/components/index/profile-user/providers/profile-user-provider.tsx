import { createContext, useContext, useEffect, useState } from "react";
import { AritoUser } from "../../../../lib/repo/arito-user.repo";
import { User } from "../../../../lib/repo/user.repo";

export const ProfileUserContext = createContext<Partial<{
  user: AritoUser
  
}>>({});

export function ProfileUserProvider({ children} : any) {
  const [user, setUser] = useState(null);
  return  (
    <ProfileUserContext.Provider value={{ user }}>
      { children }
    </ProfileUserContext.Provider>
  );
}
export const useProfileUserContext = () => useContext(ProfileUserContext);