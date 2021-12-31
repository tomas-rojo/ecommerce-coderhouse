const orderService = ({ orderDao }) => ({

    async getOrder(id) {
  
      return orderDao.create(id);
  
    }
  
  });
  
  module.exports = orderService;
  