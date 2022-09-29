const Doctor = require("../model/doctor.model");
const bcrypt = require("bcryptjs");

//REGISTERING A DOCTOR
exports.SignUp =  async (req, res) => {
  try {
    let { email, username, password, dateOfBirth, typeOfUser, specification } =
      req.body;
    email = email.trim();
    username = username.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();
    typeOfUser = typeOfUser.trim();
    specification = specification.trim();

    //CHECKING FOR EMPTY FIELDS
    if (email == "" ||username == "" ||password == "" ||dateOfBirth == "" ||typeOfUser == "" ||specification == "") 
    return res.status(400).json({status: "FAILED",message: "Empty input fields",})
      console.log(email);

    //CHECKING IF EMAIL EXISTS 
    let emailExits = await  Doctor.findOne({ email })
    if(emailExits) return res.status(400).json({status: "FAILED",message: "Email already exists",})

    //CHECKING IF USERNAME EXISTS
    let user = await Doctor.findOne({username})
    if(user) return res.status(400).json({status: "FAILED",message: "Username already exists",})

    //HASHING PASSWORDS
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt)

    const newDoctor = new Doctor({
      email,
      username,
      password: hashedPassword,
      dateOfBirth,
      typeOfUser,
      specification,
    });

    let savedDoctor = await newDoctor.save()
    if(savedDoctor) return res.status(400).json({status: "SUCCESS",message: "Signup successful", savedDoctor})
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};

//LOGGING IN A USER
exports.SignIn = async (req, res) => {
  let { username, password } = req.body;
  username = username.trim();
  password = password.trim();

  try {
    //CHECKING FOR EMPTY FIELDS
    if (username == "" || password == "") return res.status(400).json({status: "FAILED",message: "Empty Input Fields",});
    console.log(`${username} ${password}`);
  
    //FINDING IF DOCTOR EXISTS
    let doctor = await Doctor.findOne({ username })
    if(!doctor) return res.status(400).json({ status: "FAILED", message: "Invalid Username or Password",})
  
    //TRYING TO VERIFY PASSWORDS
    let hashedPassword = doctor.password;
    let verifyPass = await bcrypt.compare(password, hashedPassword)
    if(!verifyPass) return res.status(400).json({ status: "FAILED", message: "Invalid Username or Password" })
  
     //UPDATING USER STATUS 
    doctor.userStatus = "online"
    let updatedDoctor = await doctor.save()
    if(updatedDoctor) return res.status(200).json({ status: "SUCCESS", message: "Doctor found", doctor })  
  } catch (error) {
    return res.status(400).json({ status: "FAILED", message: error.message,})
  }
}
//LOGGING OUT A DOCTOR 
exports.Logout = async (req, res) => {
  const username = req.body.username;
  let doctor = await Doctor.findOne({username}) 
  
  doctor.userStatus = "offline";
  let save = await doctor.save()
  if(save) return res.status(200).json({ status: "SUCCESS", doctor })
};

//GET ALL DOCTORS 
exports.getDoctors = async (req, res) => {
  let doctor = await Doctor.find()
   if(doctor) return res.status(200).json({status: "SUCCESS",data: doctor,});
};


