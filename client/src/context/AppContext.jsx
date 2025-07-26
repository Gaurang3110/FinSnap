import { createContext,useContext, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { useState } from "react";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

  const currency = import.meta.VITE_CURRENCY;

  const navigate = useNavigate();

  const [user,setUser] = useState(true);
  const [isSeller , setIsSeller] = useState(false);
  const [showUserLogin , setShhowUserLogin] = useState(false);
  const [products,setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  //Add product to cart
  const  addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]){
      cartData[itemId] += 1;
    } else{
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to cart")
  }

  //Updata cart item quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated successfully");
  }

  //Remove item from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]){
      cartData[itemId] -= 1;
      if(cartData[itemId] === 0){
        delete cartData[itemId];
      }

      toast.success("Removed from cart");
      setCartItems(cartData);
    } else {
      toast.error("Item not found in cart");
    }
  }

  //Fetch all products
  const fetchProducts = async () => {
    setProducts(dummyProducts)
  }

  useEffect(()=>{
    fetchProducts();
  },[])


  const value = {navigate, user, setUser, isSeller, setIsSeller , showUserLogin, setShhowUserLogin , products , currency , addToCart , updateCartItem , removeFromCart, cartItems}; 

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