const User = require("../model/user.model");
const bcrypt = require("bcryptjs");

//REGISTERING A USER 
exports.SignUp = async (req, res) => {
  try {
    let { email, username, password, dateOfBirth, typeOfUser } = req.body;
    email = email.trim();
    username = username.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();
    typeOfUser = typeOfUser.trim();

    //CHECKING FOR EMPTY FIELDS 
    if (email == "" ||username == "" || password == "" ||dateOfBirth == "" || typeOfUser == "") 
     return res.status(400).json({ status: "FAILED", message: "Empty input fields", })
      console.log(email);
    
    //CHECKING FOR EXISTING EMAIL
    const emailExits = await User.findOne({ email })
    if(emailExits) return res.status(400).json({ status: "FAILED", message: "Email already exists",})

    //CHECKING FOR EXISTING USERNAME
    let userExits = await  User.findOne({ username })
    if(userExits) return res.status(400).json({ status: "FAILED", message: "Username already exists",})

    console.log(dateOfBirth)
    //HASHING PASSWORDS
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
 
    //CREATING NEW USER
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      dateOfBirth,
      typeOfUser,
    });
    let savedUser = await newUser.save()
    return res.status(200).json({status: "SUCCESS",message: "Signup Successfull", savedUser})
  } catch (error) {
   res.status(400).json({ status: "FAILED", message: error.message,})
  }
};

//LOGGING IN A USER 
exports.SignIn = async (req, res) => {
  let { username, password } = req.body;
  username = username.trim();
  password = password.trim();

  //CHECKING FOR EMPTY PASSWORDS
  if (username == "" || password == "") 
  return res.status(400).json({ status: "FAILED",message: "Empty Input Fields"})
  console.log(`${username} ${password}`);

  //FINDING IF THE USER EXITS
  let user = await User.findOne({ username })
  if(!user) return res.status(400).json({ status: "FAILED", message: "Invalid Username or Password",})

  //COMPARING PASSWORDS 
  let hashedPassword = user.password
  let validPass = await bcrypt.compare(password, hashedPassword)

  //THROWING AN ERROR IF PASSWORD DOES NOT MATCH 
  if(!validPass) return res.status(400).json({ status: "FAILED", message: "Invalid Username or Password" })

  user.userStatus = "online"
  let updateUserStatus = await user.save()
  if(updateUserStatus) return res.status(200).json({ status: "SUCCESS",message: "User found", user: user,})

};

//LOGGING OUT THE USER
exports.Logout = async (req, res) => {
  try {
    const username = req.body.username;

    //FINDING THE USER
    let user = await User.findOne({ username })

    //UPDATING THE USER STATUS 
     user.userStatus = "offline";
    let logoutOut =  user.save()
    
    if(logoutOut) res.status(200).json({status: "SUCCESS", user})
  } catch (error) {
    res.status(400).json({status: "FAILED"})
  }
};
