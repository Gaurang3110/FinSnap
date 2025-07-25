import { createContext,useContext } from "react";
import { useNavigate} from "react-router-dom";
import { useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

  const navigate = useNavigate();

  const [user,setUser] = useState(null);
  const [isSeller , setIsSeller] = useState(false);


  const value = {navigate, user, setUser, isSeller, setIsSeller}; 

  return <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}

// export const useAppContext = () => {
//   return useContext(AppContext);
// }