import jwt from "jsonwebtoken";

//Login Seller : /api/seller/login

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({
        success: true,
        message: "Seller Logged In",
      });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (e) {
    console.log(e.message);
    res.json({ success: false, message: e.message });
  }
};

// Seller isAuth : /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
  try {
    return res.json({ success: true});
  } catch (e) {
    console.log(e.message);
    res.json({ success: false, message: e.message });
  }
};

//Logout User : /api/user/logout
export const logout = async (req,res)=>{
  try{
    res.clearCookie('token' , {
      httpOnly:true,
      secure:process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });
    return res.json({success:true , message: 'Logged Out'})
  }catch(e){
    console.log(e.message);
    res.json({success:false , message:e.message})
  }
}

//Logout Seller : /api/seller/logout
export const sellerLogout = async (req,res)=>{
  try{
    res.clearCookie('sellerToken' , {
      httpOnly:true,
      secure:process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });
    return res.json({success:true , message: 'Logged Out'})
  }catch(e){
    console.log(e.message);
    res.json({success:false , message:e.message})
  }
}