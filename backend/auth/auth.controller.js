const User = require("./auth.dao");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = require("../config/properties").SECRET_KEY;

exports.createUser = (req, res, next) => {
  const time = new Date();
  const year = time.getFullYear();
  const month = getMonth(time.getMonth() + 1);
  const day = time.getDate();

  const date = `${day}-${month}-${year}`;

  function getMonth(month) {
    switch (month) {
      case 1:
        return "Jan";
        break;
      case 2:
        return "Feb";
        break;
      case 3:
        return "Mar";
        break;
      case 4:
        return "Apr";
        break;
      case 5:
        return "May";
        break;
      case 6:
        return "Jun";
        break;
      case 7:
        return "Jul";
        break;
      case 8:
        return "Aug";
        break;
      case 9:
        return "Sep";
        break;
      case 10:
        return "Oct";
        break;
      case 11:
        return "Nov";
        break;
      case 12:
        return "Dec";
        break;
      default:
        return "Not found";
    }
  }
  // console.log(req.body);
  const newUser = {
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email.toLowerCase(),
    priv: req.body.priv,
    password: bcrypt.hashSync(req.body.password, 10),
    createdAt: date,
  };

  User.create(newUser, (err, user) => {
    if (err && err.code === 11000)
      return res.status(409).send("Email already exists");
    if (err) return res.status(500).send("Server error");
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: user._id }, SECRET_KEY, {
      expiresIn: expiresIn,
    });
    const dataUser = {
      fName: user.fName,
      lName: user.lName,
      email: user.email,
      priv: user.priv,
      accessToken: accessToken,
      expiresIn: expiresIn,
    };
    // response
    res.send({ dataUser });
  });
};

exports.loginUser = (req, res, next) => {
  const userData = {
    email: req.body.email.toLowerCase(),
    password: req.body.password,
  };
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) return res.status(500).send("Server error!");

    if (!user) {
      // email does not exist
      res.status(409).send({ message: "Something is wrong" });
    } else {
      // console.log(user);
      const resultPassword = bcrypt.compareSync(
        userData.password,
        user.password
      );
      if (resultPassword) {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user._id }, SECRET_KEY, {
          expiresIn: expiresIn,
        });
        const name = user.fName + user.lName;
        const priv = user.priv;

        const dataUser = {
          id: user._id,
          email: user.email,
          priv: user.priv,
          accessToken: accessToken,
          expiresIn: expiresIn,
          fName: user.fName + " " + user.lName,
        };
        res.send({ dataUser });
      } else {
        // password wrong
        res.status(409).send({ message: "Something is wrong" });
      }
    }
  });
};
