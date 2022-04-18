const Appointment = require('../model/appointment.model');

function UtilityManager(req, res, userId, patientName, doctorName, time, dateOfAppointment, specification, reason){
    const newAppointment = new Appointment({
        userId,
        patientName,
        doctorName,
        time,
        dateOfAppointment,
        specification,
        reason
   })
  newAppointment.save()
  .then(() =>{
    res.json({
       status: 'SUCCESS',
       message: 'Appointment booked successfully' 
    })
}).catch(() => {
    res.json({
        status: 'FAILED',
        message: 'Something happened' 
     })
})
}

module.exports = UtilityManager