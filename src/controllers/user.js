const Users = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createUser = async (req, res) => {
  try {
    const body = req.body;
    const userExist = await Users.findOne({mobileNumber:req.body.mobileNumber})
    if(userExist)
    {
      res.status(201).json({message:"User already exist"});
    }
    const newUser = await Users.create({
      firstName: body.firstName,
      lastName: body.lastName,
      mobileNumber: body.mobileNumber,
      address: body.address,
    });
    console.log(JSON.stringify(newUser))
    if(newUser._id)
      res.status(201).json({message:"User created succesfully"});
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const body = req.body;
    const phone = req.params.phone;
    console.log(phone);
    const update = await Users.findOneAndUpdate({mobileNumber:phone},{
      firstName: body.firstName,
      lastName: body.lastName,
      mobileNumber: body.mobileNumber,
      address: body.address,
    },
    )
    console.log(update)
    if(!update)
    {
      res.status(500).json("User not found");
    }
    if(update._id)
    {
      res.status(200).json({message:"User updated successfully"});
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const phone = req.params.phone;
    console.log(phone)
    const userExist = await Users.findOne({mobileNumber:phone})
    console.log(JSON.stringify(userExist))
    if(!userExist)
    {
      res.status(201).json("User does not exist");
    }
    await Users.findOneAndDelete({mobileNumber:phone});
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
