const Appointment = require('../model/appointment.model');

exports.addAppointment = (req, res) => {
    try {
        let {specification, patientName, userId, time, dateOfAppointment, username} = req.body;
        console.log(dateOfAppointment)
        specification = specification.trim();
        patientName = patientName.trim();
        userId = userId.trim();
        time = time.trim();
        dateOfAppointment = dateOfAppointment.trim();
        username = username.trim();
        if(specification == '' || patientName == '' || userId == '' || time == '' || dateOfAppointment == '' || username ==''){
            res.json({
                status: 'FAILED',
                message: "Empty input fields"
            })
        }else{
            Appointment.find({userId})
            .then((result) =>{
                if(result !== null){
                    Appointment.find({time})
                    .then((data) => {
                        if(data.length){
                           Appointment.find({time})
                           .then(appointment => {
                               if(appointment.length){
                                   res.json({
                                       status:'FAILED',
                                       message: 'Please you have already booked an appointment of the same date and time'
                                   })
                               }
                           })
                        }
                    })
                }else{
                    const appointment = new Appointment({
                         userId,
                         patientName,
                         username,
                         time,
                         dateOfAppointment,
                         specification
                    })
                   appointment.save()
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
            })
        }
    } catch (error) {
        res.json({
            status: 'FAILED',
            message: error.message
        })
    }
}