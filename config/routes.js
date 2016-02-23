var express = require('express'),
    router  = express.Router();

var usersController = require('../controllers/usersController');
var projectsController = require('../controllers/projectsController');
var almController = require('../controllers/almController');
var cashflowController = require('../controllers/cashflowController');
var staticController = require('../controllers/staticController');



router.route('/').get(function(req, res) {
  res.render('index');
})
 
router.route('/users')
  .get(usersController.usersIndex)
  .post(usersController.usersCreate)

router.route('/users/:id') 
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete)

router.route('/projects')
  .get(projectsController.projectsIndex)
  .post(projectsController.projectsCreate)

router.route('/projects/:id') 
  .get(projectsController.projectsShow)
  .patch(projectsController.projectsUpdate)
  .delete(projectsController.projectsDelete)



//new routes for ALM
router.route('/financialALM')
  .get(almController.ALMIndex)
  .post(almController.ALMCreate)

router.route('/financialALM/:id')
  // .get(almController.ALMShow)
  .patch(almController.ALMUpdate)
  .delete(almController.ALMDelete)


//new routes for Cashflow
router.route('/financialCashflow')
  .get(cashflowController.cashflowIndex)
//   .post(cashflowController.financialCashflowCreate)

// router.route('/financialCashflow/:id') 
//   .get(cashflowController.financialCashflowShow)
//   .patch(cashflowController.financialCashflowUpdate)
//   .delete(cashflowController.financialCashflowDelete)

// STATIC
router.route('/about')
  .get(staticController.about);
router.route('/contact')
  .get(staticController.contact);
  router.route('/family')
    .get(staticController.family);



// https://api.typeform.com/v0/form/VNrOIR?key=3fa2fcb4f0bb33a6350bb8417485830bb0ffa09f&completed=true
module.exports = router;