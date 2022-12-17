const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../model/user");

// signup
router.post("/signup", async (req, res) => {
  const saltPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(req.body.password, saltPassword);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: securePassword,
    birthday: req.body.birthday,
    phoneNumber: req.body.phoneNumber,
  });

  try {
    const newUser = await user.save();

    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// get all users
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message }); // status 500 means there is error in my server (database )
  }
}); // end getting all

// delete user
router.delete("/:id", async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  // const courses = await Course.find({ OwnerID: req.params.id }).deleteMany();
  user.remove();

  res.json("user deleted ");
});

// get on user
router.get("/getOne/:id", async (req, res) => {
  try {
    const userEmail = req.params.id;
    const user = await User.findOne({ email: userEmail });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });

    if (user) {
      const ValidatePassword = await bcrypt.compare(password, user.password);
      if (ValidatePassword) {
        res.status(200).json(user);
      } else {
        return res.status(400).json({ message: "invalid Email or password" });
      }
    } else {
      return res.status(400).json({ message: "invalid Email or password" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// update
router.post("/update/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await User.findOneAndUpdate(
      { _id: userID },
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
      }
    );

    // await user.save();
    res.status(200).json("updated successfully");
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});

router.post("forgetPasswd");
module.exports = router;
