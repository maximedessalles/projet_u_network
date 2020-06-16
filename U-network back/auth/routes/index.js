const express = require('express');
const router = express.Router();
const userController = require('../../api/routes/user');
const promotionController = require('../../api/routes/promotion');
const groupeController = require('../../api/routes/groupe');
const filiereController = require('../../api/routes/filiere');
const actualiteController = require('../../api/routes/actualite');
const formationController = require('../../api/routes/formation');
const recrutementController = require('../../api/routes/recrutement');
const demandeEmploiController = require('../../api/routes/demandeEmploi');
const EvenementController = require('../../api/routes/evenement');

router.get('/ping', filiereController.ping);

router.post('/register', userController.register);
router.post('/login', userController.authenticate);
router.get('/confirmation/:token', userController.confirmation);
router.get('/logout',userController.logout);
router.post('/user',userController.user);
router.delete('/user/:id',userController.userDelete);
router.get('/user/:id',userController.getUserById);
router.get('/user',userController.users);
router.get('/user/:idFormation/:idPromotion',userController.getUserWithFilter);
router.get('/logout', userController.logout);
router.get('/user/:id', userController.getUserById);
router.get('/user', userController.users);
router.get('/userEmail', userController.getUserEmail);
router.post('/userWithFilter', userController.usersWithFilter);
router.put('/user/:id', userController.updateUserById);
router.delete('/user/:id', userController.userDelete);
router.get('/userWithoutEtude/:idFormation/:idPromotion',userController.getUserWithoutEtude);
router.post('/sendEmail', userController.sendEmail);
router.post('/user', userController.user);
router.get('/logout', userController.logout);

router.get('/promotion',promotionController.getPromotion);
router.post('/promotion',promotionController.postPromotion);
router.get('/promotion/:id', promotionController.getPromotionById);
router.get('/promotion', promotionController.getPromotion);
router.post('/promotion', promotionController.postPromotion);
router.delete('/promotion/:id', promotionController.deletePromotion);
router.put('/promotion/:id', promotionController.updatePromotionById);

router.get('/formation',formationController.getFormation);
router.post('/formation',formationController.postFormation);
router.delete('/formation/:id',formationController.deleteFormation);
router.get('/formation/:id',formationController.getFormationById);
router.put('/formation/:id',formationController.updateFormationById);
router.get('/formation', formationController.getFormation);
router.post('/formation', formationController.postFormation);

router.get('/filiere',filiereController.getFiliere);
router.post('/filiere',filiereController.postFiliere);
router.delete('/filiere/:id',filiereController.deleteFiliere);
router.get('/filiere/:id',filiereController.getFiliereById);
router.put('/filiere/:id',filiereController.updateFiliereById);
router.get('/filiereByFormation/:id',filiereController.getFiliereByFormation);
router.get('/filiere', filiereController.getFiliere);
router.post('/filiere', filiereController.postFiliere);
router.delete('/filiere/:id', filiereController.deleteFiliere);
router.get('/filiere/:id', filiereController.getFiliereById);
router.put('/filiere/:id', filiereController.updateFiliereById);

router.put('/groupe/:id',groupeController.updateGroupeById);
router.get('/groupeByUser/:id',groupeController.getGroupeByUser);
router.post('/groupe',groupeController.postGroupe);
router.delete('/groupe/:id', groupeController.deleteGroupe);
router.get('/groupeByUser/:id',groupeController.getGroupeByUser);
router.post('/groupe',groupeController.postGroupe);

router.post('/recrutement',recrutementController.postRecrutement);
router.get('/recrutement/:id',recrutementController.getRecrutementById);
router.get('/recrutement',recrutementController.getRecrutement);
router.get('/recrutementByFiliere/:id',recrutementController.getRecrutementByFiliere);


router.get('/getActualiteGroupe/:id',actualiteController.getActualiteByGroupe);
router.get('/getActualiteUser/:id',actualiteController.getActualiteByUser);
router.get('/getActualite',actualiteController.getActualite);
router.put('/updateActualite/:id',actualiteController.updateActualite);
router.post('/actualite', actualiteController.postActualite);

router.get('/getEvenement',EvenementController.getEvenement);
router.post('/evenement', EvenementController.postEvenement);
router.put('/updateEvenement/:id',EvenementController.updateEvenement);



router.get('/demandeEmploi/:id',demandeEmploiController.getDemandeById);
router.post('/demandeEmploi', demandeEmploiController.postDemande);
router.get('/demandeEmploi', demandeEmploiController.getDemande);
router.get('/demandeEmploiByFiliere/:id',demandeEmploiController.getDemandeByFiliere);







module.exports = router; 