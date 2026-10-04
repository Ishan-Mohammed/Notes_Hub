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
    description: 'Advanced CSE subjects: Microprocessors & Microcontrollers, Machine Learning, Operating Systems, and Network Algorithms.',
    iconName: 'Network',
  },
];

export interface SubjectDefinition {
  id: string;
  code: string;
  name: string;
  credits: number;
  semesterId: number;
  description: string;
  iconName: string;
  category: 'Theory' | 'Elective' | 'MOOC';
  orGroupId?: string;
  orGroupTitle?: string;
}

export const CSE_SUBJECTS_2024: SubjectDefinition[] = [
  // --- SEMESTER 1 (S1) ---
  {
    id: 'gamat101',
    code: 'GAMAT101',
    name: 'Mathematics for Information Science–1',
    credits: 3,
    semesterId: 1,
    description: 'Foundational calculus, differential equations, optimization, and mathematical structures for computing algorithms.',
    iconName: 'Calculator',
    category: 'Theory',
  },
  {
    id: 'gapht121',
    code: 'GAPHT121',
    name: 'Physics for Information Science',
    credits: 4,
    semesterId: 1,
    description: 'Semiconductor physics, quantum principles, lasers, fiber optics, and electronic functional materials.',
    iconName: 'Atom',
    category: 'Elective',
    orGroupId: 's1-phy-chem',
    orGroupTitle: 'Basic Science Elective',
  },
  {
    id: 'gxcyt122',
    code: 'GXCYT122',
    name: 'Chemistry for Information Science',
    credits: 4,
    semesterId: 1,
    description: 'Electrochemistry, spectroscopy, modern functional polymers, and nanomaterials for electronic hardware.',
    iconName: 'FlaskConical',
    category: 'Elective',
    orGroupId: 's1-phy-chem',
    orGroupTitle: 'Basic Science Elective',
  },
  {
    id: 'gmest103',
    code: 'GMEST103',
    name: 'Engineering Graphics and Computer Aided Drawing',
    credits: 3,
    semesterId: 1,
    description: 'Projection systems, 3D spatial visualization, freehand engineering sketching, and CAD drafting tools.',
    iconName: 'PenTool',
    category: 'Theory',
  },
  {
    id: 'gxest104',
    code: 'GXEST104',
    name: 'Introduction to Electrical and Electronics Engineering',
    credits: 4,
    semesterId: 1,
    description: 'Electrical circuits, electromagnetic fields, semiconductor devices, and foundational analog electronics.',
    iconName: 'Zap',
    category: 'Theory',
  },
  {
    id: 'ucest105',
    code: 'UCEST105',
    name: 'Algorithmic Thinking with Python',
    credits: 4,
    semesterId: 1,
    description: 'Algorithmic logic building, structured flowcharts, data structures, and Python problem solving.',
    iconName: 'Code',
    category: 'Theory',
  },
  {
    id: 'ucsem129',
    code: 'UCSEM129',
    name: 'Digital 101 – NASSCOM MOOC',
    credits: 1,
    semesterId: 1,
    description: 'NASSCOM certified foundation course in emerging digital technologies, cloud computing, and AI essentials.',
    iconName: 'Globe',
    category: 'MOOC',
  },

  // --- SEMESTER 3 (S3) ---
  {
    id: 'gamat301',
    code: 'GAMAT301',
    name: 'Mathematics for Information Science–3',
    credits: 3,
    semesterId: 3,
    description: 'Probability distributions, random processes, descriptive statistics, and Markov chains for data analytics.',
    iconName: 'Calculator',
    category: 'Theory',
  },
  {
    id: 'pccst302',
    code: 'PCCST302',
    name: 'Theory of Computation',
    credits: 4,
    semesterId: 3,
    description: 'Automata theory, formal grammars, context-free languages, Turing machines, and computational complexity limits.',
    iconName: 'Cpu',
    category: 'Theory',
  },
  {
    id: 'pccst303',
    code: 'PCCST303',
    name: 'Data Structures and Algorithms',
    credits: 4,
    semesterId: 3,
    description: 'Linear & non-linear data structures, searching, sorting, trees, graphs, and asymptotic complexity analysis.',
    iconName: 'Database',
    category: 'Theory',
  },
  {
    id: 'pbcst304',
    code: 'PBCST304',
    name: 'Object Oriented Programming',
    credits: 4,
    semesterId: 3,
    description: 'OOP abstractions, encapsulation, inheritance hierarchy, polymorphism, exception wrappers, and Java application dev.',
    iconName: 'FolderOpen',
    category: 'Theory',
  },
  {
    id: 'gaest305',
    code: 'GAEST305',
    name: 'Digital Electronics & Logic Design',
    credits: 4,
    semesterId: 3,
    description: 'Number systems, Boolean logic minimization, combinational & sequential logic design, flip-flops, and counters.',
    iconName: 'Binary',
    category: 'Theory',
  },
  {
    id: 'uchut346',
    code: 'UCHUT346',
    name: 'Economics for Engineers',
    credits: 2,
    semesterId: 3,
    description: 'Engineering economics, cost estimation, project depreciation, financial forecasting, and economic decision models.',
    iconName: 'TrendingUp',
    category: 'Elective',
    orGroupId: 's3-econ-ethics',
    orGroupTitle: 'Humanities & Ethics Elective',
  },
  {
    id: 'uchut347',
    code: 'UCHUT347',
    name: 'Engineering Ethics and Sustainable Development',
    credits: 2,
    semesterId: 3,
    description: 'Professional engineering moral codes, environmental sustainability metrics, safety standards, and ethical responsibility.',
    iconName: 'ShieldCheck',
    category: 'Elective',
    orGroupId: 's3-econ-ethics',
    orGroupTitle: 'Humanities & Ethics Elective',
  },

  // --- SEMESTER 5 (S5) ---
  {
    id: 'pccst501',
    code: 'PCCST501',
    name: 'Computer Networks',
    credits: 4,
    semesterId: 5,
    description: 'OSI layered architecture, TCP/IP protocol suite, packet routing algorithms, congestion control, and network security.',
    iconName: 'Network',
    category: 'Theory',
  },
  {
    id: 'pccst502',
    code: 'PCCST502',
    name: 'Design and Analysis of Algorithms',
    credits: 4,
    semesterId: 5,
    description: 'Divide and conquer, greedy optimization, dynamic programming, network flow graphs, and NP-completeness bounds.',
    iconName: 'Binary',
    category: 'Theory',
  },
  {
    id: 'pccst503',
    code: 'PCCST503',
    name: 'Machine Learning',
    credits: 3,
    semesterId: 5,
    description: 'Supervised & unsupervised learning models, regression analysis, decision trees, neural networks, and data clustering.',
    iconName: 'Brain',
    category: 'Theory',
  },
  {
    id: 'pbcst504',
    code: 'PBCST504',
    name: 'Microcontrollers',
    credits: 4,
    semesterId: 5,
    description: 'Microcontroller architecture, 8051 & ARM instruction sets, assembly programming, timers, and peripheral interfacing.',
    iconName: 'Cpu',
    category: 'Theory',
  },
  {
    id: 'pecst521',
    code: 'PECST52N',
    name: 'Data Analytics',
    credits: 3,
    semesterId: 5,
    description: 'Data analytics pipelines, statistical data processing, visualization models, and exploratory data mining.',
    iconName: 'Database',
    category: 'Elective',
    orGroupId: 's5-elective-2',
    orGroupTitle: 'Programme Elective – 2',
  },
  {
    id: 'pecst522',
    code: 'PECST52N',
    name: 'Artificial Intelligence',
    credits: 3,
    semesterId: 5,
    description: 'Intelligent agents, state-space search algorithms, knowledge representation, reasoning logic, and expert systems.',
    iconName: 'Bot',
    category: 'Elective',
    orGroupId: 's5-elective-2',
    orGroupTitle: 'Programme Elective – 2',
  },
];
