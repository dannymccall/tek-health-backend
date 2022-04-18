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
            Appointment.find({userId})
            .then((data) => {
                if(data.length){
                    Appointment.find({dateOfAppointment})
                    .then((result) => {
                        if(result.length){
                            Appointment.find({time})
                            .then((appointment) => {
                               if(appointment.length){
                                res.json({
                                    status: 'FAILED',
                                    message: "Please you can't book appointments at the same date and time"
                                })
                               }else{
                               Appointment.find({doctorName})
                               .then((username) => {
                                   if(username){
                                        Appointment.find({dateOfAppointment})
                                        .then(dateOfAppointment => {
                                            if(dateOfAppointment){
                                                Appointment.find({time})
                                                .then(time => {
                                                    if(time){
                                                        res.json({
                                                            status: 'FAILED',
                                                            message: "Doctor has already been booked for the same date and time"
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
    } catch (error) {
        res.json({
            status: 'FAILED',
            message: error.message
        })
    }
}