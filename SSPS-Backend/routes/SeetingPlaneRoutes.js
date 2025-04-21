const express = require('express');
const router = express.Router();
const sittingPlanController = require('../controllers/ExamController'); 

// Create a new sitting plan
router.post('/sittingPlans', sittingPlanController.createSittingPlan);

// Get all sitting plans
router.get('/sittingPlans', sittingPlanController.getAllSittingPlans);

// Get a sitting plan by ID
router.get('/sittingPlans/:id', sittingPlanController.getSittingPlanById);

// Update a sitting plan by ID
router.put('/sittingPlans/:id', sittingPlanController.updateSittingPlan);

// Delete a sitting plan by ID
router.delete('/sittingPlans/:id', sittingPlanController.deleteSittingPlan);

module.exports = router;
