// GET /
function about(req, res) { 
	console.log(req.user);
	console.log(req.isAuthenticated());
  res.render('about');
}

function contact(req, res) {  
  res.render('contact');
}

function profile(req, res) {  
  res.render('profile');
}


module.exports = {
  about: about,
  contact: contact,
  profile: profile,
}