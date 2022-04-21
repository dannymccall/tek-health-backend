const Message = require("../model/message.model");

exports.postMessage = (req, res) => {
  try {
    let { patientId, doctorId, doctorName, messageText } = req.body;

    patientId = patientId.trim();
    doctorId = doctorId.trim();
    doctorName = doctorName.trim();
    messageText = messageText.trim();

    if (
      (patientId == "" || doctorId == "", doctorName == "", messageText == "")
    ) {
      res.json({
        status: "FAILED",
        message: "Empty Input Fields",
      });
    } else {
      const message = new Message({
        patientId,
        doctorId,
        doctorName,
        messageText,
      });
      message.save().then((data) => {
        res.json({
          status: "SUCCESS",
          data,
        });
      });
    }
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};


exports.getDoctorMessages = (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        Message.find({doctorId})
        .then((messages) => {
            res.json({
                status: 'SUCCESS',
                messages
            })
        })
        
    } catch (error) {
        res.json({
            status:'FAILED',
            message: error.message
        })
    }
}

exports.getPatientMessages = (req, res) => {
    try {
        const patientId = req.params.patientId;
        Message.find({patientId})
        .then((messages) => {
            res.json({
                status: 'SUCCESS',
                messages
            })
        })
    } catch (error) {
        res.json({
            status:'FAILED',
            message: error.message
        })
    }
}