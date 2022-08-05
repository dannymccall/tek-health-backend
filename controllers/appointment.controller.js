const Appointment = require("../model/appointment.model");

//MAKE APPOINTMENT
exports.addAppointment = async(req, res) => {
  try {
    let {specification,patientName,userId,time,dateOfAppointment,username,reason,} = req.body;
    console.log(dateOfAppointment);
    specification = specification.trim();
    patientName = patientName.trim();
    userId = userId.trim();
    time = time.trim();
    dateOfAppointment = dateOfAppointment.trim();
    doctorName = username.trim();
    reason = reason.trim();

    //CHECKING FOR EMPTY FIELDS
    if (specification == "" ||patientName == "" ||userId == "" ||time == "" ||dateOfAppointment == "" ||doctorName == "",reason == "")
     return res.status(400).json({status: "FAILED",message: "Empty input fields",});

    //CHECKING IF USER ALREADY HAS AN APPOINTMENT ON THAT PARTICULAR DATE AND TIME 
    let appointment = await Appointment.findOne({ userId, time, dateOfAppointment })
    if (appointment) return res.status(400).json({status: "FAILED",message: "You can't book an appointment on the same date and time",})
        
    //CHECKING IF DOCTOR ALREADY HAS AN APPOINTMENT ON THAT PARTICULAR DATE AND TIME 
    let doctorAppointment = await Appointment.findOne({ doctorName, time, dateOfAppointment })
    if (doctorAppointment) return res.status(400).json({status: "FAILED",message:"Doctor has already been booked on the date and time you chose",});
    
    //MAKING NEW APPOINGMENT
    const newAppointment = new Appointment({
      userId,
      patientName,
      doctorName,
      time,
      dateOfAppointment,
      specification,
      reason,
    });

    //SAVING APPOINTMENT
    let savedAppointment = await newAppointment.save()
    if(savedAppointment) return res.status(200).json({status: "SUCCESS",message: "Appointment booked successfully",savedAppointment});
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};



exports.getAppointments = async (req, res) => {
  try {
    const userId = req.params._id;
    console.log(userId);

    let appointments = await Appointment.find({ userId })
    if(appointments) return res.status(200).json({status: "SUCCESS",appointments,});
  } catch (error) {
    res.json(error.message);
  }
};


exports.getAllAppointments = async (req, res) => {
  try {
    let appointments = await Appointment.find()
    if(appointments) return res.json({status: "SUCCESS",appointments,});
  } catch (error) {
    res.json(error.message);
  }
};

exports.getDoctorAppointments = async (req, res) => {
  try {
    const doctorName = req.params.username;

    let doctorAppointment = await Appointment.find({ doctorName })
    if(doctorAppointment) return res.json({status: "SUCCESS",appointments:doctorAppointment});
  } catch (error) {
    res.json({
      status: 'FAILED',
      message: 'something happened'
    })
  }
}

exports.updateAppointments = async(req, res) => {
  try {
    const _id = req.params.appointmentId;
    let appointment = await Appointment.find({ _id })
    console.log(appointment)
    appointment[0].appointmentStatus = "yes";
    appointment = await appointment[0].save()
    if(appointment) return res.status(200).json({status:'SUCCESS', appointment})
  } catch (error) {
    res.json({
      status: 'FAILED',
      message: 'something happened'
    })
  }
}

