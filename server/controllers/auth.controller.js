const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { checkPhoneNumberAvailable } = require('../services/checkPhone');
const { validateUser } = require("../validation/validations.schema");

exports.register = async (req, res) => {
  //register admin
  try {
    //validate user data
    const { error } = validateUser(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    if (await checkPhoneNumberAvailable(req.body.phone))
      return res.status(409).send({
        success: false,
        message: "User with the same phone number already exist",
      });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        userId: newUser._id,
        phone: newUser.phone,
        email: newUser.email,
        nationalId: newUser.nationalId,
      },
      "mivote_secret",
      { expiresIn: "1d" }
    );

    return res.status(201).send({
      message: "User created!",
      data: {
        user: newUser,
        token,
      },
    });
  } catch (err) {
    return res.status(400).send({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  //login a user
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send({
        success: false,
        message: "Invalid email or password 2",
      });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(400).send({
        success: false,
        message: "Invalid email or password 1",
      });

    const token = jwt.sign(
      {
        userId: user._id,
        phone: user.phone,
        email: user.email,
        nationalId: user.nationalId,
        role: user.role,
      },
      "mivote_secret",
      { expiresIn: "1d" }
    );

    return res.status(200).send({
      success: true,
      message: "User logged in!",
      data: { user, token },
    });
  } catch (err) {
    return res.status(400).send({ success: false, message: err.message });
  }
};

exports.getAll = async (req, res) => {
  const users = await User.find();
  if (users) { res.send({ success: true, data: users }).status(201); } else return next(new ErrorMessage("Users not found", 404));

}
