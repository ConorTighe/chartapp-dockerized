"use client"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { IChartInfo, IPatient, ITestResults } from "@/app/interfaces";

export default function useChart() {
    const myChart = useRef<Chart>();

    const [selectedCompounts, setSelectedCompounts] = useState<any[]>([]);

    const [chartInfo, setChartInfo] = useState<IChartInfo>();

    const compoundOptions = [
        { value: 'Creatine', label: 'Creatine' },
        { value: 'Protein', label: 'Protein' },
        { value: 'Chloride', label: 'Chloride' },
        { value: 'Glucose', label: 'Glucose' },
        { value: 'Potassium', label: 'Potassium' },
        { value: 'Sodium', label: 'Sodium' },
        { value: 'Calcium', label: 'Calcium' },
    ];

    const getChartInfo = (patients: IPatient[]) => {
        const totalPaticpants = [...new Set(patients.map(pateint => pateint.id))].length;
        const ageRange: [number, number] = [20, 30];
        setChartInfo({
            totalPaticpants: totalPaticpants,
            ageRange,
        })
    }

    useEffect(() => {
        const canvas = document.getElementById('myChart') as HTMLCanvasElement;
        const ctx = canvas?.getContext('2d');

        const getPatients = async () => {
            const res = await axios.get(`http://localhost:8000/patients`);
            const patients: IPatient[] = await res.data.patients;

            getChartInfo(patients);
            const testingLabels = patients.map(pateint => pateint.date_testing);
            const tests = patients.map(pateint => pateint.test_results);

            if (!ctx) return;
            if (myChart.current) myChart.current.destroy();

            const datasets = handleDisplayedData(tests);
            const pateintTitle = `Patient ID: ${patients[0].id} \nDOB: ${patients[0].date_birthdate} \nEthnicity: ${patients[0].ethnicity} \nGender: ${patients[0].gender}`
            myChart.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: testingLabels,
                    datasets,
                },
                options: {
                    layout: {
                        padding: 50,
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                title: () => pateintTitle,
                                label: () => datasets[0].label,
                            }
                        }
                    }
                }
            });
        }

        getPatients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCompounts])

    const handleUpdateSelected = (newSelectedCompounds: string[]) => {
        setSelectedCompounts(newSelectedCompounds);
    }

    const handleDisplayedData = (tests: ITestResults[]) => {
        const displayedComponents = !selectedCompounts.length ? compoundOptions.map(({ value }) => value) : selectedCompounts;
        return displayedComponents.map(target => {
            const targetTestResults = tests.map(test => test.compounds.filter(com => com.title === target)).flat();

            const hex = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

            return {
                data: targetTestResults.map(({ value }) => value),
                label: `${target}(${targetTestResults[0].unit})`,
                borderColor: hex,
                backgroundColor: hex,
            }
        });
    }
    selectedCompounts
    return { chartInfo, compoundOptions, selectedCompounts, handleUpdateSelected, handleDisplayedData }
}
