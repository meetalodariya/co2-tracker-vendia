import React, { useState } from 'react';

export interface Component{
  type:string;
  serialNumber:string;
  co2:number;
}

export interface Transport{
  transportationMethod:string;
  trackingId:string;
  co2:number;
}

export interface HPTDetails{
  toolType : string;
  serialNumber:string;
  imageURL:string;
  components : Component[]; 
  transport : Transport;
}

export interface AuthUser {
  token: string;
}

export interface AuthContextType {
  user: AuthUser;
  hptdetails : HPTDetails;
  signin: (user: AuthUser, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  getdatabyHPT : (hptDetails: HPTDetails, callback:VoidFunction)=>void;
}








export const AuthContext = React.createContext<AuthContextType>({
  user: { token: '' },
  hptdetails : {
    toolType:'',
    serialNumber : '',
    imageURL : '',
    components : [{
      type : '',
      serialNumber : '',
      co2 : 0
    }],
    transport  : {
      transportationMethod : '',
      trackingId:'',
      co2 : 0
    }

  },
  signin: () => undefined,
  signout: () => undefined,
  getdatabyHPT: ()=>undefined
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(
    JSON.parse(localStorage.getItem('user')),
  );  
  const [hptdetails, setHptdetails] = useState<HPTDetails | null>(
    // JSON.parse(localStorage.getItem('user')),
  );  

  const signin = (newUser: AuthUser, callback: VoidFunction) => {
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    callback();
  };

  const signout = (callback: VoidFunction) => {
    localStorage.removeItem('user');
    setUser(null);
    callback();
  };

  const getdatabyHPT = (hptDetails:HPTDetails, callback: VoidFunction)=>{
    setHptdetails(hptDetails);
    callback();
  }

  const value = { user, signin, signout ,hptdetails,getdatabyHPT};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
