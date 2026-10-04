export interface MvpConfig {
  department: {
    id: number;
    code: string;
    name: string;
    fullName: string;
  };
  scheme: string;
  activeSemesters: number[];
  futureSemesters: number[];
  allSemesters: number[];
}

export const MVP_CONFIG: MvpConfig = {
  department: {
    id: 1, // CSE department_id in Supabase / fallback
    code: 'CSE',
    name: 'Computer Science & Engineering',
    fullName: 'Computer Science and Engineering',
  },
  scheme: 'KTU 2024 Scheme',
  activeSemesters: [1, 3, 5],
  futureSemesters: [2, 4, 6, 7, 8],
  allSemesters: [1, 2, 3, 4, 5, 6, 7, 8],
};

export interface SemesterInfo {
  semNum: number;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export const SEMESTER_CARD_DATA: SemesterInfo[] = [
  {
    semNum: 1,
    label: 'S1',
    title: 'Semester 1',
    subtitle: 'KTU 2024 Scheme',
    description: 'Foundational mathematics, basic sciences, and introductory computing concepts for S1 CSE.',
    iconName: 'Code',
  },
  {
    semNum: 3,
    label: 'S3',
    title: 'Semester 3',
    subtitle: 'KTU 2024 Scheme',
    description: 'Core computing foundations: Data Structures, Discrete Math, Digital Electronics & Object-Oriented Programming.',
    iconName: 'Database',
  },
  {
    semNum: 5,
    label: 'S5',
    title: 'Semester 5',
    subtitle: 'KTU 2024 Scheme',
    description: 'Advanced CSE subjects: Microprocessors & Microcontrollers, Machine Learning, Operating Systems, and Lab Work.',
    iconName: 'Network',
  },
];
