const orderDao = ({ orderModel }) => ({
  
    async create(user_id) {

        const order = await orderModel.find({ "user_id" : user_id });

        if (order.length == 0) {

            try {

                const newOrder = await new orderModel
    
                await newOrder.save()
    
                const last = await newOrder._id.toString()
                
                return orderModel.findByIdAndUpdate({"_id": last}, { $set : { "user_id": user_id } } );
                
            } catch (error) { return error }           

        } else {

            return false

        } 
    
    }      

  });
  
  module.exports = orderDao;