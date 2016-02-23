// GET /
function about(req, res) {  
  res.render('about');
}

function contact(req, res) {  
  res.render('contact');
}

function family(req, res) {  
  res.render('family');
}


module.exports = {
  about: about,
  contact: contact,
  family: family,
}