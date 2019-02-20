var express = require('express');
var router = express.Router();

var repair = require("../controllers/formController.js");
var login = require("../controllers/createUser.js");
var loginAut = require("../controllers/LoginController");
var repairadmin = require("../controllers/AdminController.js");
var personnel = require("../controllers/personnelController.js");
var historymachine = require("../controllers/HistoryMachineController.js");
var manage = require("../controllers/manageController.js");
/* GET home page. */
//

router.get('/formfull11', function(req, res, next) {
  res.render('formfull11', { title: 'formfull11' });
});

router.get('/testp', function(req, res, next) {
  res.render('testp', { title: 'testp' });
});

router.get('/manage',manage.show);
function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
      return next();
  } else {
      var err = new Error('You must be logged in to view this page.');
      err.status = 401;
      return next(err);
  }
}
router.post('/loginToAdminMenu',function(req,res,next){   
  loginAut.aut (req,res);
});



router.get('/loginform', function(req, res, next) {
  res.render('login', { title: 'loginform' });
});
router.get('/loginCreateUser', function(req, res, next) {  
  res.render('createUser', { title: 'userlogin' });
});


//personnnel and department ETC.
router.get('/personnelform',requiresLogin,personnel.showPersonnel);

router.get('/addPersonnel',requiresLogin,personnel.showDepartmentAndSection);
router.get('/addSection',requiresLogin,personnel.showDepartment);
router.post('/savePersonnel,requiresLogin',personnel.savePersonnel);
router.get('/addDepartmentName',function(req,res){
  res.render('../views/personnel/addDepartment');
});
router.post('/addDepartmentName',requiresLogin,personnel.saveDepartment);
router.post('/deletePersonnel/:id',requiresLogin,personnel.deletePerson);
router.get('/commitdeletepersonnel/:id',requiresLogin,personnel.commit);
//edit personnel
router.get('/editpersonnel/:id',requiresLogin,personnel.showEditPersonnel);
router.post('/commitEditPersonnel/:id',requiresLogin,personnel.editPersonnel);
//end personnel//////////////////

router.get('/', repair.show);
router.get('/form',repair.startForm);
router.get('/formfull11/:id',requiresLogin, repair.formfull1);
router.get('/formfull2/:id',requiresLogin, repair.formfull2);
router.get('/formfull2Again/:id',requiresLogin, repair.formfull2Again);
router.get('/formfull22/:id',requiresLogin, repair.formfull22);
router.get('/formfull33/:id',requiresLogin, repair.formfull33);
// router.get('/formfull3/:id', repair.formfull3);
// router.get('/formfull4/:id', repair.formfull4);
router.get('/formfull44/:id',requiresLogin, repair.formfull44);


router.post('/editformfull1/:id',requiresLogin, repair.editformfull1);
router.post('/editformfull2/:id',requiresLogin, repair.editformfull2);
// router.post('/editformfull3/:id', repair.editformfull3);
router.post('/editformfull4/:id',requiresLogin, repair.editformfull4);
router.post('/saveeditformfull33/:id',requiresLogin, repair.saveeditformfull33);
router.get('/formfullEdit/:id',requiresLogin,repair.editform);

router.post('/save', repair.save);

router.post('/createUser',login.save);

router.get('/adminmenu',requiresLogin,repairadmin.show);




router.get('/logout',function(req,res){
  loginAut.logout(req,res);
});

router.get('/formChangePassword',requiresLogin,loginAut.getFormChangePassword);
router.post('/changePassword',requiresLogin,loginAut.changePassword);
//

router.get('/addMachineForm',historymachine.addMachineform);
router.post('/addMachine',historymachine.addMachine);
router.get('/saveHistoryForm',requiresLogin,historymachine.testAddHistoryForm);
router.post('/savehistory',requiresLogin,historymachine.saveHistory);
router.get('/historymachine',requiresLogin,historymachine.create);
router.get('/historyrepair',requiresLogin,historymachine.showhistory);
router.get('/aHistoryMachine/:id',requiresLogin,historymachine.showAHistory);
router.get('/editaMachine/:id',requiresLogin,historymachine.showEditAHistory);
router.post('/accepEditMachine/:id',requiresLogin,historymachine.saveEditMachine);
//
router.post('/deleteform/:id',requiresLogin, repair.deleteform);
router.post('/createHistoyMach/:id',requiresLogin,repair.savetohistory);
module.exports = router;
