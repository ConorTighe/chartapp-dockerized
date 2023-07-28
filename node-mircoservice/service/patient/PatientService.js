 import { v4 } from 'uuid';
import PatientModel from '../../modal/Patient.js';
import axios from 'axios';

class PatientService {

  static parseComponents (patient) {
    return { compounds: [{
      title: "Creatine",
      value: patient["creatine"],
      unit: patient["creatine_unit"],
    },
  {
      title: "Chloride",
      value: patient["chloride"],
      unit: patient["chloride_unit"],
    },
  {
      title: "Glucose",
      value: patient["fasting_glucose"],
      unit: patient["fasting_glucose_unit"],
    },
    {
      title: "Potassium",
      value: patient["potassium"],
      unit: patient["potassium_unit"],
    },
    {
      title: "Sodium",
      value: patient["sodium"],
      unit: patient["sodium_unit"],
    },
    {
      title: "Calcium",
      value: patient["total_calcium"],
      unit: patient["total_calcium_unit"],
    },
    {
      title: "Protein",
      value: patient["total_protein"],
      unit: patient["total_protein_unit"],
    },
  ]}
  }

  static async init () {
    const { data } = await axios.get('https://mockapi-furw4tenlq-ez.a.run.app/data');

    const patients = data.map(client => ({
      id: client.client_id,
      date_testing: client.date_testing,
      date_birthdate: client.date_birthdate,
      gender: client.gender,
      ethnicity: client.ethnicity,
      test_results: PatientService.parseComponents(client)
    }));

    const result = await PatientModel.insertMany(patients);
    return result;
  }

  static async get () {
    const result = await PatientModel.find({});
    return result;
  }
}

export default PatientService;
