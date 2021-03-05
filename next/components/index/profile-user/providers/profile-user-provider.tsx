import { createContext, useContext, useEffect, useState } from "react";
import { AritoUser, AritoUserService } from "../../../../lib/repo/arito-user.repo";

export const ProfileUserContext = createContext<Partial<{
  users: AritoUser[]
  
}>>({});

export function ProfileUserProvider({ children} : any) {
  const [users, setUsers] = useState(null);
  
  useEffect(() => {
    
  }, []);

  return  (
    <ProfileUserContext.Provider value={{ users }}>
      { children }
    </ProfileUserContext.Provider>
  );
}
export const useProfileUserContext = () => useContext(ProfileUserContext);