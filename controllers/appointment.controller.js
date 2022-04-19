const Appointment = require('../model/appointment.model');

exports.addAppointment = (req, res) => {
    try {
        let {specification, patientName, userId, time, dateOfAppointment, username, reason} = req.body;
        console.log(dateOfAppointment)
        specification = specification.trim();
        patientName = patientName.trim();
        userId = userId.trim();
        time = time.trim();
        dateOfAppointment = dateOfAppointment.trim();
        doctorName = username.trim();
        reason = reason.trim();
        if(specification == '' || patientName == '' || userId == '' || time == '' || dateOfAppointment == '' || doctorName =='', reason == ''){
            res.json({
                status: 'FAILED',
                message: "Empty input fields"
            })
        }else{
            Appointment.find({userId, time, dateOfAppointment})
            .then((data) => {
               if(data.length){
                   res.json({
                       status: 'FAILED',
                       message: "You can't book an appointment on the same date and time"
                   })
               }else{
                Appointment.find({doctorName, time, dateOfAppointment})
                .then((result) => {
                    if(result.length){
                        res.json({
                            status: 'FAILED',
                            message: "Doctor has already been booked on the date and time you choose"
                        })
                    }else{
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

let userId;

exports.getAppointments = (req, res) => {
    try {
        const userId = req.params._id;
        console.log(userId)
        Appointment.find({userId})
        .then(appointments => {
            res.json({
                status:'SUCCESS',
                appointments
            })
        })
        .catch(() => {
            res.json('Something happened')
        })
        
    } catch (error) {
        res.json(error.message)
    }
}