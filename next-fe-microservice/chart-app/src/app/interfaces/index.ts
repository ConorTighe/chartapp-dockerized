export interface ICompounds {
    title: string;
    unit: string;
    value: number;
}

export interface IPatient {
    id: string;
    date_testing: string;
    date_birthdate: string;
    ethnicity: number;
    gender: number;
    test_results: ITestResults;
}

export interface ITestResults {
    id: string;
    compounds: ICompounds[];
};

export interface IChartInfo {
    totalPaticpants: number;
    ageRange: [number, number];
};
