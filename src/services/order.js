const orderService = () => ({

    async getOrder(cart) {
      if (typeof cart == "undefined") {
        return null
      } else {
        const products = []
        await cart[0].products.map(a => products.push({productName : a.name}))
        const id = cart[0].products.map(a => a._id.toString())
        const names = cart[0].products.map(a => a.name)
        const img = cart[0].products.map(a => a.thumbnail)
        const price = cart[0].products.map(a => a.price.toString())
        const countsNames = {};

        names.forEach(function (x) { countsNames[x] = (countsNames[x] || 0) + 1; });

        products.map(function(entry, index){
          entry.productPrice = price[index]
          return entry
          })
        
        products.map(function(entry, index){
          entry.productImg = img[index]
          return entry
          })

        products.map(function(entry, index){
          entry.productID = id[index]
          return entry
          })
       
       function findOcc(products, key, key2, key3, key4){
        let arr2 = [];
          
        products.forEach((x)=>{
             
          // Checking if there is any object in arr2
          // which contains the key value
           if(arr2.some((val)=>{ return val[key] == x[key] && val[key2] == x[key2] && val[key3] == x[key3] && val[key4] == x[key4] })){
               
             // If yes! then increase the occurrence by 1
             arr2.forEach((k)=>{
               if(k[key] === x[key]){ 
                 k["quantity"]++
               }
            })
               
           }else{
             // If not! Then create a new object initialize 
             // it with the present iteration key's value and 
             // set the occurrence to 1
             let a = {}
             a[key] = x[key]
             a[key2] = x[key2]
             a[key3] = x[key3]
             a[key4] = x[key4]
             a["quantity"] = 1
             arr2.push(a);
           }
        })
          
          return arr2
          }
          let key = "productName"
          let key2 = "productPrice"
          let key3 = "productImg"
          let key4 = "productID"
          let order = (findOcc(products, key, key2, key3, key4))
          const sum = order.map(a => a.productPrice * a.quantity).reduce((a, b) => a + b, 0)
          order.push({totalSum:sum})
          return order
      }
      
    }
  
  });
  
  module.exports = orderService;
  