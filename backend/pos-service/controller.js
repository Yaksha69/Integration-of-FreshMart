const Sale = require('./sale')

//Create Product
const createSale = async(req, res) =>{
    const {items, total_sale} = req.body

    try{
        const sale = await Sale.create({items, total_sale})
        res.status(200).json({sucess: true, message: sale})
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, message: err.message})
    }
}



module.exports = {
    createSale,
}