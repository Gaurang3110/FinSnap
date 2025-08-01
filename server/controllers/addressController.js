import Address from "../models/Address.js"


//Add Address : /api/address/add
export const addAddress = async ( req , res) => {
  try { 
    const {address , userId} = req.body
    await Address.create({...address, userId})
    res.json({success:true , message: 'Address added successfully'})
  } catch(e) {
    console.log(e.message)
    res.json({success:false , message:e.message})
  }
}

// Get Address : /api/address/get
export const getAddress = async ( req , res) => {
  try { 
    const {address , userId} = req.body
    const addresses = await Address.find({userId})
        res.json({success:true , addresses})
  } catch(e) {
    console.log(e.message)
    res.json({success:false , message:e.message})
  }
}

