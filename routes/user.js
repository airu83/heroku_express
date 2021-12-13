const express = require('express');
const router = express.Router();

const { User } = require('../models/User');

const { auth } = require('../middleware/auth');

router.use(express.urlencoded({extended: true}));
router.use(express.json());

const cookieParser = require('cookie-parser');
router.use(cookieParser());

const cors = require('cors'); // 도메인이 다른 경우에 대한 처리
router.use(cors({
  origin: true, // Access-Control-Allow-Origin = default true
  credentials: true
}));

router.post('/user/register', (req, res) => {

    const user = new User(req.body)
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
        success: true,
        User: userInfo
        })
    })

})

router.post('/user/login', function(req, res){

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })

});

router.get('/user/auth', auth, (req, res) => {

    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image
    })

})

router.get('/user/logout', auth, (req, res) => {

    User.findOneAndUpdate({ _id: req.user._id },
      { token: "" }
      , (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.cookie("x_auth", "").status(200).send({
          success: true,
          User: user
        })
    })

})

router.get('/user/find', (req, res) => {
  User.find({/*name: "m1"*/}, (err, user) => {
    if (err) return res.json({ success: false, err });
    console.log(user);
    return res.status(200).send({
      success: true,
      User: user
    });
  })
})

module.exports = router;