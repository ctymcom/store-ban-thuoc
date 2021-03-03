import { createContext, useContext, useState } from "react";
import { User } from "../../../../lib/repo/user.repo";

export const ProfileUserContext = createContext<Partial<{
  users: User[]
  setUsers: Function
}>>({});

export function ProfileUserProvider(props) {
  const [users, setUsers] = useState<User[]>();
  return  <ProfileUserContext.Provider value={{ users, setUsers }}>
            { props.children }
          </ProfileUserContext.Provider>
  ;
}

export const useProfileUserContext = () => useContext(ProfileUserContext);