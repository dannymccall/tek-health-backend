const Blood = require("../model/blood.model");

exports.addBlood = (req, res, next) => {
  try {
    let { quantity, selectBloodType } = req.body;
    quantity = quantity.toString().trim();
    selectBloodType = selectBloodType.trim();
    let bloodCode = Math.floor(1000 + Math.random() * 9000);
    const bloodType = selectBloodType;
    if (quantity == "" || selectBloodType == "") {
      res.json({
        status: "FAILED",
        message: "Empty Input Fields",
      });
    } else if (isNaN(quantity)) {
      res.json({
        status: "FAILED",
        message: "Quantity must be a number",
      });
    } else {
      Blood.find({ bloodType }).then((blood) => {
        if (blood.length) {
          blood[0].quantity += Number(quantity);
          blood[0].save().then(() => {
            res.json({
              status: "SUCCESS",
              message: "Stock updated successfully",
            });
          });
        } else {
          const newBlood = new Blood({
            bloodType: selectBloodType,
            quantity,
            bloodCode,
          });
          newBlood
            .save()
            .then(() => {
              res.json({
                status: "SUCCESS",
                message: "Stock added successfully",
              });
            })
            .catch(() => {
              res.json({
                status: "FAILED",
                message: "Something heppened",
              });
            });
        }
      });
    }
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};

exports.orderForBlood = (req, res) => {
  try {
    let { quantity, selectBloodGroup, username } = req.body;
    quantity = quantity.toString().trim();
    selectBloodGroup = selectBloodGroup.trim();
    let bloodType = selectBloodGroup;
    let key;
    if (quantity == "" || selectBloodGroup == "") {
      res.json({
        status: "FAILED",
        message: "Empty Input Fields",
      });
    } else if (isNaN(quantity)) {
      res.json({
        status: "FAILED",
        message: "Quantity must be a number",
      });
    } else {
      Blood.find({ bloodType }).then((blood) => {
        if (blood.length) {
          blood.map((value) => {
            key = value.quantity;
            if (key <= 0) {
              res.json({
                status: "FAILED",
                message:
                  "Please we are out of stock at the moment for this particular blood type",
              });
            } else if (key < quantity) {
              res.json({
                status: "FAILED",
                message:
                  "Our Stock is below your order, please reduce your order",
              });
            } else {
              const newQuantity = key - quantity;
              let bloodCode = blood[0].bloodCode;
              blood[0].quantity = newQuantity;
              blood[0].save().then(() => {
                res.json({
                  status: "SUCCESS",
                  message: `Your order has been successfull with blood order ${bloodCode}`,
                });
              });
              console.log(username);
            }
          });
        } else {
          res.json({
            status: "FAILED",
            message: `We have don't have such blood type in stock`,
          });
        }
      });
    }
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};

exports.getBloodInStock = (req, res) => {
  Blood.find({bloodType}).then((data) => {
    res.json({
      status: "SUCCESS",
      data,
    });
  });
};
