const Orders = require('../model/orders.model');
exports.addOrder = (req, res) => {
  let { quantity, selectBloodGroup, username } = req.body;
  quantity = quantity.toString().trim();
  selectBloodGroup = selectBloodGroup.trim();
  let bloodType = selectBloodGroup;
  let key;

  const newOrder = new Orders({
    doctorName: username,
    bloodType,
    quantity,
  });
  newOrder.save();
};
