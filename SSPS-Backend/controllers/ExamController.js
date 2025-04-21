const SittingPlan = require('../models/exam'); 

// Create a new sitting plan
exports.createSittingPlan = async (req, res) => {
    try {
      const { examName, examDates } = req.body;
  
      // Validate and extract examName
      if (!examName) {
        return res.status(400).json({ message: 'Exam name is required' });
      }
  
      // Validate and extract examDates
      if (!examDates || !Array.isArray(examDates)) {
        return res.status(400).json({ message: 'Exam dates are required and must be an array' });
      }
  
      const parsedExamDates = examDates.map((examDate) => {
        const { date, sittings } = examDate;
  
        // Validate date
        if (!date) {
          throw new Error('Date is required for each exam date');
        }
  
        // Validate and extract sittings
        if (!sittings || !Array.isArray(sittings)) {
          throw new Error('Sittings are required and must be an array for each exam date');
        }
  
        const parsedSittings = sittings.map((sitting) => {
          const { sittingTime, examTitle, classRange } = sitting;
  
          // Validate sittingTime
          if (sittingTime === undefined) {
            throw new Error('Seat number is required for each sitting');
          }
  
          // Validate examTitle
          if (!examTitle) {
            throw new Error('Exam title is required for each sitting');
          }
  
          // Validate and extract classRange
          if (!classRange || !classRange.from || !classRange.to) {
            throw new Error('Class range with from and to is required for each sitting');
          }
  
          return {
            sittingTime,
            examTitle,
            classRange: {
              from: classRange.from,
              to: classRange.to,
            },
          };
        });
  
        return {
          date,
          sittings: parsedSittings,
        };
      });
  
      // Create a new SittingPlan instance
      const sittingPlan = new SittingPlan({
        examName,
        examDates: parsedExamDates,
      });
  
      // Save the sitting plan to the database
      await sittingPlan.save();
      res.status(201).json(sittingPlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
// Get all sitting plans
exports.getAllSittingPlans = async (req, res) => {
  try {
    const sittingPlans = await SittingPlan.find();
    res.status(200).json(sittingPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a sitting plan by ID
exports.getSittingPlanById = async (req, res) => {
  try {
    const sittingPlan = await SittingPlan.findById(req.params.id);
    if (!sittingPlan) {
      return res.status(404).json({ message: 'Sitting plan not found' });
    }
    res.status(200).json(sittingPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a sitting plan by ID
exports.updateSittingPlan = async (req, res) => {
  try {
    const sittingPlan = await SittingPlan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!sittingPlan) {
      return res.status(404).json({ message: 'Sitting plan not found' });
    }
    res.status(200).json(sittingPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a sitting plan by ID
exports.deleteSittingPlan = async (req, res) => {
  try {
    const sittingPlan = await SittingPlan.findByIdAndDelete(req.params.id);
    if (!sittingPlan) {
      return res.status(404).json({ message: 'Sitting plan not found' });
    }
    res.status(200).json({ message: 'Sitting plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
