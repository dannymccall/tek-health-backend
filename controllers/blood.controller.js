const Blood = require("../model/blood.model");

exports.addBlood = (req, res) => {
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
            bloodCode
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
