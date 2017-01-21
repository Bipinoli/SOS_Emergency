var express = require('express');
var mongojs = require('mongojs');
var expressValidator = require('express-validator');
var path = require('path');
var url = require('url');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var ObjectId = mongojs.ObjectId;
var bodyParser = require('body-parser');
var db = mongojs('SOS', ['users']);
var app = express();
// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Connect Flash
app.use(flash());

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use('/public', express.static(path.join(__dirname + '/public')));

app.get('/', (req, res) => {
	res.render('home', {
		title: "Welcome to ",
	});
})
app.get('/reportform', (req, res) => {
	res.render('reportform.ejs', {
		title: "Report Abuse | ",
	});
})
/*
var body = "";
app.get('/search', (req,res) => {
	var url_parts = url.parse(req.url, true);
	console.log(url_parts.query.t);
	if(url_parts.query.t != undefined) { //accessing the get value
		db.contacts.find({fname: { $regex: url_parts.query.t, $options: 'i' }}).sort({fname: 1}, function (err, docs){
			if(docs.length > 0){
				docs.forEach(function(elem){
					body += '<a href="/view/'+elem._id+'">'+elem.fname + " " + elem.lname + "</a><br>";
				})
				res.send(body); 
			}
			body = "";
			res.end();
		})
	} else {
		res.redirect('/');
	}
}) */
app.use(cookieParser());

app.get('/', function (req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
})

app.get('/login', (req, res) => {
	res.render ('login', {
		title: "Login | "
	})
})

app.post ('/login', (req,res) => {
	var email = req.body.email;
	var pw = req.body.pw;

	// Validation
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('pw', 'Password is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('login',{
			title:"Errors | ",
			errors:errors
		});
	} else {
		db.users.find({email:email, password: pw}, (err,docs) => {
			if(docs != "") { 
			req.session.user = docs[0].fname;
			req.session.email = docs[0].email;
			req.session.path = 'localhost:3000/';
			req.session._expires = 86400;
			req.session.new = docs[0].perm;
			res.redirect("/dashboard");
			const User  = docs[0].fname; 
			} else {
      	res.render('login', {
      		title: "Error | ",
      		error: "epmis",
      		message: "Email and Password do not match."
      	})
     		 }
      }) 
   }
})

app.get("/dashboard", (req,res) => {
  if (req.session && req.session.user) {
    db.users.find({ email: req.session.email }, function (err, user) {
      if (!user) {
        // if the user isn't found in the DB, reset the session info and
        // redirect the user to the login page
        req.session.reset();
        res.redirect('/login');
      } else {
        // expose the user to the template
        res.locals.user = user;
 
        // render the dashboard page
 			res.render('dashboard', {
 				title: "Dashboard"
 			})
      }
    });
      } else {
    res.redirect('/login');
  }
})

app.get('/reg', (req, res) => {
	res.render ('reg', { 
		title: "Register | "
	})
})

app.post('/register', (req, res) => {
	var fname = req.body.fname;
	var lname = req.body.lname;
	var email = req.body.email;
	var pw = req.body.pw;
	var pwd = req.body.pwd;

	// Validation
	req.checkBody('fname', 'First Name is required').notEmpty();
	req.checkBody('lname', 'Last Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('pw', 'Password is required').notEmpty();
	req.checkBody('pwd', 'Passwords do not match').equals(req.body.pw);

	var errors = req.validationErrors();

	if(errors){
		res.render('reg',{
			title:"Errors | ",
			errors:errors
		});
	} else {
		var newUser = {
			fname: fname,
			lname: lname,
			email:email,
			password: (pw),
			perm: "user"
		};

		db.users.insert(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

      res.redirect('/reg/success'); 
   }
})

app.get('/reg/:t', (req, res) => {
	if (req.params.t == 'success') {
		res.send ('Adding was successful <a href="/new">Add another</a>');
		res.end();
	}
})

app.get ('/map', (req,res) => {
	res.render('partials/map', {
		title:"Map | "
	});
})

app.listen(3000, () => {
	console.log ("Server started on port 3000");
})
