const productService = ({ productDao }) => ({

  async addProduct(product) {

    return productDao.create(product);

  },

  async getProduct(id) {

      return productDao.getById(id);

  },

  async getAllProducts() {

      return productDao.getAll();

  },
  
  async updateProduct(id, product) {

      return productDao.update(id, product);

  },

  async deleteProduct(id) {

      return productDao.delete(id);

  },

  async filterByName(productName) {

      return productDao.getByName(productName)

  },

  async filterByCode(productCode) {

      return productDao.getByCode(productCode)

  },

  async filterByPrice(productMinPrice, productMaxPrice) {

      return productDao.getByPrice(productMinPrice, productMaxPrice)

  },

  async filterByStock(productMinStock, productMaxStock) {

      return productDao.getByStock(productMinStock, productMaxStock)

  },

});

module.exports = productService;

