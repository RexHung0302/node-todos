const userDB = require('../models/user');
const { validationResult } = require('express-validator');
const firebaseAuth = require('../config/firebase-auth');
const nodemailer = require('nodemailer');

module.exports = {
    getLoginHandler: (req, res) => {
      if(req.sessionID && req.session.auth && req.session.auth.uid && req.session.auth.email) {
        res.redirect('/');
      } else {
        res.render('login', {
          success: req.flash('success'),
          error: req.flash('error'),
          email_val: req.flash('email_val'),
          password_val: req.flash('password_val'),
          title: 'Login'
        });
      }
    },
    loginHandler: (req, res) => {
      const errors = validationResult(req);
      const { email, password } = req.body;
      if (!errors.isEmpty()) {
        req.flash('error', errors.errors);
        req.flash('email_val', email);
        req.flash('password_val', password);
        res.redirect('login');
      } else if(errors.isEmpty()) {
        firebaseAuth.signInWithEmailAndPassword(email, password)
          .then(response => {

            req.session.auth = {
              uid: response.user.uid,
              email: response.user.email
            }

            res.redirect('/');
          })
          .catch(error => {
            req.flash('error', {msg: error.message});
            req.flash('email_val', email);
            req.flash('password_val', password);
            res.redirect('login');
          });
      }
    },
    logoutHandler: (req, res) => {
      req.session.destroy();
      res.redirect('login');
    },
    getSignUpHandler: (req, res) => {
      if(req.sessionID && req.session.auth && req.session.auth.uid && req.session.auth.email) {
        res.redirect('/');
      } else {
        res.render('sign-up', {
          error: req.flash('error'),
          email_val: req.flash('email_val'),
          password_val: req.flash('password_val'),
          confirm_password_val: req.flash('confirm_password_val'),
          title: 'Sign Up'
        });
      }
    },
    signUpHandler: (req, res) => {
      const errors = validationResult(req);
      const { email, password, confirm_password } = req.body;
      if (!errors.isEmpty()) {
        req.flash('error', errors.errors);
        req.flash('email_val', email);
        req.flash('password_val', password);
        req.flash('confirm_password_val', confirm_password);
        res.redirect('sign-up');
      } else if(errors.isEmpty()) {
        firebaseAuth.createUserWithEmailAndPassword(email, password)
          .then(response => {

            req.flash('success', {msg: 'Sign Up Success, Login Now!'});

            let userData = {
              email,
              uid: response.user.uid,
              todos: []
            };
            // Push info to firebase.
            userDB.getUser(response.user.uid).set(userData);

            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                host: "smtp.ethereal.email",
                port: 587,
                auth: {
                  user: process.env.GMAIL_ACCOUNT,
                  pass: process.env.GMAIL_PASS,
                }
            });

            var mailOptions = {
              from: `"Services"<${process.env.GMAIL_ACCOUNT}>`,
              to: email,
              subject: 'Congratulations！Account create successfully',
              html: `<h1>Hi!</h1><br><span>Your account has been created successfully by TODO List.</span>`
            }

            transporter.sendMail(mailOptions, (err, info)=>{
              if(err) {
                  return console.log('寄送失敗', err);
              }
              res.redirect('login');
            })
          })
          .catch(error => {
            req.flash('error', {msg: error.message});
            req.flash('email_val', email);
            req.flash('password_val', password);
            req.flash('confirm_password_val', confirm_password);
            res.redirect('sign-up');
          });
      }
    },
}