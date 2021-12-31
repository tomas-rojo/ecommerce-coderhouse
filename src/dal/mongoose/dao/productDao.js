const productDao = ({ productModel }) => ({
  
    async getAll() {

      return productModel.find();

    },
  
    async getById(id) {

      return productModel.findById(id);
      
    },
  
    async create(product) {
      
      return productModel.create(product);

    },
  
    async delete(id) {

      return productModel.findByIdAndDelete(id);

    },
  
    async update(id, product) {

      return productModel.findByIdAndUpdate(id, product);

    },

    async getByName(productName) {

      return productModel.find({ name : {'$regex': productName, '$options': 'i'}} );
    },

    async getByCode(productStock){

      return productModel.find({ code : {'$regex': productStock, '$options': 'i'}} );

    },
    
    async getByPrice(productMinPrice, productMaxPrice) {

      return productModel.find({ price: { $gte: productMinPrice, $lte: productMaxPrice } })

    },

    async getByStock(productMinStock, productMaxStock) {
      return productModel.find({ stock: { $gte: productMinStock, $lte: productMaxStock } })
    },
  });
  
  module.exports = productDao;
  