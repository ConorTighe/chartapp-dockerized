import { Schema, model } from 'mongoose';
import { v4 } from 'uuid';

const CompoundSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
});

const TestResultsSchema = new Schema({
  id: {
    type: String,
    required: true,
    default: v4()
  },
  compounds: [CompoundSchema],
});

const PatientSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  date_testing: {
    type: String,
    required: true
  },
  date_birthdate: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    required: true
  },
  ethnicity: {
    type: Number,
    required: true
  },
  test_results: TestResultsSchema
});



/*
    client_id: 'aeede9c1',
    date_testing: '2022-11-10',
    date_birthdate: '1950-01-01',
    gender: 1,
    ethnicity: 1,
    creatine: 0.95,
    chloride: 110.01,
    fasting_glucose: 50.77,
    potassium: 2.58,
    sodium: 106.65,
    total_calcium: 11.32,
    total_protein: 6.49,
    creatine_unit: 'mgdl',
    chloride_unit: 'mmoll',
    fasting_glucose_unit: 'mgdl',
    potassium_unit: 'mmoll',
    sodium_unit: 'ul',
    total_calcium_unit: 'mgdl',
    total_protein_unit: 'gdl'


*/

const PatientModel = model('Patient', PatientSchema);

export default PatientModel;
