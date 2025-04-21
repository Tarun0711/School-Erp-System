const mongoose = require('mongoose');

const sittingPlanSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true
  },
  examDates: [
    {
      date: {
        type: Date,
        required: true
      },
      sittings: [
        {
          sittingTime: {
            type: String,
            required: true
            },
          examTitle: {
            type: String,
            required: true
          },
          classRange: {
            from: {
              type: String,
              required: true
            },
            to: {
              type: String,
              required: true
            }
          }
        }
      ]
    }
  ]
});

const SittingPlan = mongoose.model('SittingPlan', sittingPlanSchema);

module.exports = SittingPlan;
