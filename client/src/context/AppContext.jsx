import { createContext,useContext, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { useState } from "react";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();

  const [user,setUser] = useState(null);
  const [isSeller , setIsSeller] = useState(false);
  const [showUserLogin , setShowUserLogin] = useState(false);
  const [products,setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

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

  //Get cart item count
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems){
      totalCount += cartItems[item];
    }
    return totalCount;
  }

  //Get total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for(const items in cartItems){
      let itemInfo = products.find((product)=>product._id === items);
      if(cartItems[items] > 0 ){
        totalAmount += itemInfo.price * cartItems[items];
      }
    }
    return Math.floor(totalAmount*100)/100;
  }

  //Fetch all products
  const fetchProducts = async () => {
    setProducts(dummyProducts)
  }

  useEffect(()=>{
    fetchProducts();
  },[])


  const value = {navigate, user, setUser, isSeller, setIsSeller , showUserLogin, setShowUserLogin , products , currency , addToCart , updateCartItem , removeFromCart, cartItems,searchQuery,setSearchQuery , getCartCount, getCartAmount}; 

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