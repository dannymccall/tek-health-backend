const Doctor = require('../model/doctor.model')
const bcrypt = require('bcryptjs');


exports.SignUp = (req, res) => {
    try {
        let {email, username, password, dateOfBirth, typeOfUser, specification} = req.body;
        email = email.trim();
        username =username.trim();
        password = password.trim();
        dateOfBirth = dateOfBirth.trim();
        typeOfUser = typeOfUser.trim();
        specification = specification.trim()
        console.log(email)
        if(email == '' || username=="" || password ==""||dateOfBirth==""||typeOfUser=="" || specification ==""){
            res.json({
                status: 'FAILED',
                message: "Empty input fields"
            })
        }else{
            console.log(email)
            Doctor.find({email})
            .then(user => {
                console.log(user)
                if(user.length > 0){
                    res.json({
                        status: 'FAILED',
                        message: "Email already exists"
                    })
                }else{
                    Doctor.find({username})
                    .then(result => {
                        if(result.length > 0){
                            res.json({
                                status: 'FAILED',
                                message: "Username already exists"
                            }) 
                        }
                    })
                    bcrypt.hash(password, 10)
                    .then((hashedPassword) => {
                        console.log('hello')
                        const newDoctor = new Doctor({
                            email,
                            username,
                            password: hashedPassword,
                            dateOfBirth,
                            typeOfUser,
                            specification
                        })
                        console.log(newDoctor)
                        newDoctor.save()
                        .then(() => res.json({
                            status: "SUCCESS",
                            message: "Signup Successfull"
                        }))
                        .catch(() => res.json({
                            status: "FAILED",
                            message: "Error while hashing password"
                        }))
                    })
                    .catch(() => res.json({
                        status: "FAILED",
                        message: "Error occurred"
                    }))
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


exports.SignIn = async(req, res) => {
    let {username, password } = req.body;
    username=username.trim();
    password=password.trim()
    if(username=="" || password==""){
        res.json({
            status: "FAILED",
            message: "Empty Input Fields"
        })
    }
    console.log(`${username} ${password}`)
    Doctor.find({username})
    .then((user) => {
       if(user){
           const hashedPassword = user[0].password;
           bcrypt.compare(password, hashedPassword)
           .then((result => {
               if(result){
                   user[0].userStatus = "online";
                   user[0].save()
                   .then(
                       res.json({
                           status: "SUCCESS",
                           message: "User found",
                           user: user[0]
                       })
                   )
               }else{
                res.json({
                    status: "FAILED",
                    message: "Invalid Username or Password"
                })
               }
           }))
           .catch()
       }
       else{
        res.json({
            status: "FAILED",
            message: "Invalid Username or Password"
        })
       }
    })
    .catch(() => {
        res.json({
            status: "FAILED",
            message: "Invalid Username or Password"
        })
    })
}

exports.Logout = (req, res) => {
    const username = req.body.username;
    User.find({username})
    .then(user => {
        console.log(user[0])
        user[0].userStatus = 'offline';
        user[0].save()
        .then( res.json({
            status: 'SUCCESS',
        }))
       
    }).catch(()=> {
        res.json({
            status: 'FAILED',
        })
    })
}

exports.getDoctors = (req, res) => {
    Doctor.find({typeOfUser: 'Doctor'})
    .then(value => {
        res.json({
            status: 'SUCCESS',
            data: value
        })
    })
}