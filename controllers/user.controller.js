const User = require("../model/user.model");
const bcrypt = require("bcryptjs");

exports.SignUp = (req, res) => {
  try {
    let { email, username, password, dateOfBirth, typeOfUser } = req.body;
    email = email.trim();
    username = username.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();
    typeOfUser = typeOfUser.trim();
    console.log(email);
    if (
      email == "" ||
      username == "" ||
      password == "" ||
      dateOfBirth == "" ||
      typeOfUser == ""
    ) {
      res.json({
        status: "FAILED",
        message: "Empty input fields",
      });
    } else {
      console.log(email);
      User.find({ email }).then((user) => {
        console.log(user);
        if (user.length > 0) {
          res.json({
            status: "FAILED",
            message: "Email already exists",
          });
        } else {
          User.find({ username }).then((result) => {
            if (result.length > 0) {
              res.json({
                status: "FAILED",
                message: "Username already exists",
              });
            }
          });
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              console.log("hello");
              const newUser = new User({
                email,
                username,
                password: hashedPassword,
                dateOfBirth,
                typeOfUser,
              });
              console.log(newUser);
              newUser
                .save()
                .then(() =>
                  res.json({
                    status: "SUCCESS",
                    message: "Signup Successfull",
                  })
                )
                .catch(() =>
                  res.json({
                    status: "FAILED",
                    message: "Error while hashing password",
                  })
                );
            })
            .catch(() =>
              res.json({
                status: "FAILED",
                message: "Error occurred",
              })
            );
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

exports.SignIn = async (req, res) => {
  let { username, password } = req.body;
  username = username.trim();
  password = password.trim();
  if (username == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty Input Fields",
    });
  }
  console.log(`${username} ${password}`);
  User.find({ username })
    .then((user) => {
      if (user) {
        const hashedPassword = user[0].password;
        bcrypt
          .compare(password, hashedPassword)
          .then((result) => {
            if (result) {
              user[0].userStatus = "online";
              user[0].save().then(
                res.json({
                  status: "SUCCESS",
                  message: "User found",
                  user: user[0],
                })
              );
            } else {
              res.json({
                status: "FAILED",
                message: "Invalid Username or Password",
              });
            }
          })
          .catch();
      } else {
        res.json({
          status: "FAILED",
          message: "Invalid Username or Password",
        });
      }
    })
    .catch(() => {
      res.json({
        status: "FAILED",
        message: "Invalid Username or Password",
      });
    });
};

exports.Logout = (req, res) => {
  const username = req.body.username;
  User.find({ username })
    .then((user) => {
      console.log(user[0]);
      user[0].userStatus = "offline";
      user[0].save().then(
        res.json({
          status: "SUCCESS",
        })
      );
    })
    .catch(() => {
      res.json({
        status: "FAILED",
      });
    });
};
