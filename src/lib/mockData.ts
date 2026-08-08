/** Legacy mock types — kept for reference; app reads from Supabase now. */
interface MockSemester { id: number; label: string; is_active: boolean; }
interface MockSubject {
  id: string; name: string; code: string; semester_id: number;
  description?: string; credits?: number; slug: string; icon_name: string; route: string;
  resources?: Record<string, unknown[]>;
}
interface MockResourceCategory { slug: string; label: string; description: string; icon_name: string; }
interface MockResource {
  id: string; title: string; url: string; subject_id: string; category_slug: string;
  module_number?: number; is_verified?: boolean; file_size?: string; file_type?: string;
  download_count?: number; created_at: string;
}

export const semesters: MockSemester[] = [
  { id: 1, label: 'Semester 1', is_active: true },
  { id: 2, label: 'Semester 2', is_active: true },
  { id: 3, label: 'Semester 3', is_active: true },
  { id: 4, label: 'Semester 4', is_active: true },
  { id: 5, label: 'Semester 5', is_active: true },
  { id: 6, label: 'Semester 6', is_active: true },
  { id: 7, label: 'Semester 7', is_active: true },
  { id: 8, label: 'Semester 8', is_active: true }
];

export const resourceCategories: MockResourceCategory[] = [
  { slug: 'notes', label: 'Module Notes', description: 'Handwritten and typed notes structured module by module.', icon_name: 'FileText' },
  { slug: 'pyq', label: 'University Questions', description: 'Previous year question papers sorted by academic year.', icon_name: 'History' },
  { slug: 'series-questions', label: 'Series Exams', description: 'Internal series exam questions from top engineering colleges.', icon_name: 'Bookmark' },
  { slug: 'model-questions', label: 'Model Papers', description: 'University model question papers with key solutions.', icon_name: 'Layers' },
  { slug: 'syllabus', label: 'Syllabus', description: 'Official university curriculum structure and scheme of study.', icon_name: 'BookOpen' },
  { slug: 'lab-questions', label: 'Lab Manuals', description: 'Lab experiments, programs, and viva-voce questions.', icon_name: 'Terminal' },
  { slug: 'youtube', label: 'YouTube Lectures', description: 'Curated playlists and top video courses for key modules.', icon_name: 'Youtube' },
  { slug: 'assignments', label: 'Assignments', description: 'Standard assignment sheets and challenge questions.', icon_name: 'ClipboardList' }
];

export const resources: MockResource[] = [];

const defaultResources = {
  notes: [],
  series_questions: [],
  model_questions: [],
  pyq: [],
  syllabus: [],
  lab_questions: [],
  assignments: [],
  mini_projects: [],
  reference_books: [],
  reference_videos: [],
  youtube_classes: []
};

export const subjects: MockSubject[] = [
  // --- SEMESTER 1 (S1) ---
  {
    id: 'mathematics-1',
    name: 'Mathematics for Information Science I',
    code: 'MAT101',
    semester_id: 1,
    description: 'Introduces calculus, optimization, differential equations, and basic mathematical structures essential for algorithmic computing.',
    credits: 3,
    slug: 'mathematics-1',
    icon_name: 'Calculator',
    route: '/semester-1/mathematics-1',
    resources: defaultResources
  },
  {
    id: 'physics',
    name: 'Physics for Information Science',
    code: 'PHY101',
    semester_id: 1,
    description: 'Covers semiconductor physics, quantum mechanics, lasers, superconductivity, and functional electronic materials for hardware development.',
    credits: 4,
    slug: 'physics',
    icon_name: 'Atom',
    route: '/semester-1/physics',
    resources: defaultResources
  },
  {
    id: 'chemistry',
    name: 'Chemistry for Information Science & Electrical Science',
    code: 'CYT101',
    semester_id: 1,
    description: 'Introduces electrochemistry, modern polymers, nanomaterials, spectroscopy, and environmental chemistry applications in electronic sciences.',
    credits: 4,
    slug: 'chemistry',
    icon_name: 'FlaskConical',
    route: '/semester-1/chemistry',
    resources: defaultResources
  },
  {
    id: 'engineering-graphics',
    name: 'Engineering Graphics and Computer Aided Drawing',
    code: 'EST110',
    semester_id: 1,
    description: 'Develops visualization of engineering objects through projection systems, freehand sketching, and software computer-aided design drafting.',
    credits: 3,
    slug: 'engineering-graphics',
    icon_name: 'PenTool',
    route: '/semester-1/engineering-graphics',
    resources: defaultResources
  },
  {
    id: 'algorithmic-thinking-python',
    name: 'Algorithmic Thinking with Python',
    code: 'EST102',
    semester_id: 1,
    description: 'Teaches algorithmic problem-solving, structured flowcharts, logic building, and foundational programming constructs using Python language.',
    credits: 4,
    slug: 'algorithmic-thinking-python',
    icon_name: 'Code',
    route: '/semester-1/algorithmic-thinking-python',
    resources: defaultResources
  },
  {
    id: 'workshop-practice',
    name: 'Workshop Practice',
    code: 'ESL120',
    semester_id: 1,
    description: 'Provides hands-on introductory experience with carpentry, fitting, sheet metal, welding, plumbing, and mechanical machining practices.',
    credits: 2,
    slug: 'workshop-practice',
    icon_name: 'Wrench',
    route: '/semester-1/workshop-practice',
    resources: defaultResources
  },
  {
    id: 'health-wellness',
    name: 'Health and Wellness',
    code: 'MCN101',
    semester_id: 1,
    description: 'Promotes physical fitness, personal hygiene, sports performance, nutrition, mental health safety, and positive student well-being.',
    credits: 1,
    slug: 'health-wellness',
    icon_name: 'Heart',
    route: '/semester-1/health-wellness',
    resources: defaultResources
  },
  {
    id: 'life-skills-communication',
    name: 'Life Skills and Professional Communication',
    code: 'HUT101',
    semester_id: 1,
    description: 'Develops critical thinking, business writing, public speaking, teamwork, leadership qualities, and empathetic workplace interpersonal communication.',
    credits: 2,
    slug: 'life-skills-communication',
    icon_name: 'MessageSquare',
    route: '/semester-1/life-skills-communication',
    resources: defaultResources
  },

  // --- SEMESTER 2 (S2) ---
  {
    id: 'mathematics-2',
    name: 'Mathematics for Information Science II',
    code: 'MAT102',
    semester_id: 2,
    description: 'Covers linear algebra, vector spaces, matrices, system of linear equations, and computing eigenvalues for computer algorithms.',
    credits: 3,
    slug: 'mathematics-2',
    icon_name: 'Calculator',
    route: '/semester-2/mathematics-2',
    resources: defaultResources
  },
  {
    id: 'essentials-web-design',
    name: 'Essentials to Web Design',
    code: 'CST102',
    semester_id: 2,
    description: 'Introduces HTML layouts, CSS styling rules, responsive displays, and custom client-side JavaScript behaviors for frontend applications.',
    credits: 3,
    slug: 'essentials-web-design',
    icon_name: 'Globe',
    route: '/semester-2/essentials-web-design',
    resources: defaultResources
  },
  {
    id: 'programming-c',
    name: 'Programming in C',
    code: 'CST104',
    semester_id: 2,
    description: 'Develops structured programming foundations, memory management pointers, complex data structures, and logical puzzle solving utilizing C.',
    credits: 4,
    slug: 'programming-c',
    icon_name: 'Code',
    route: '/semester-2/programming-c',
    resources: defaultResources
  },
  {
    id: 'engineering-entrepreneurship-ipr',
    name: 'Engineering Entrepreneurship and Intellectual Property Rights',
    code: 'EST104',
    semester_id: 2,
    description: 'Covers fundamentals of launching tech startups, innovation scaling, commercializing ideas, patents, copyright laws, and licensing.',
    credits: 3,
    slug: 'engineering-entrepreneurship-ipr',
    icon_name: 'Lightbulb',
    route: '/semester-2/engineering-entrepreneurship-ipr',
    resources: defaultResources
  },
  {
    id: 'computer-hardware-lab',
    name: 'Computer Hardware Lab',
    code: 'CSL102',
    semester_id: 2,
    description: 'Provides practical training in dismantling, assembling, troubleshooting personal computers, OS installation, and network setup components.',
    credits: 1,
    slug: 'computer-hardware-lab',
    icon_name: 'Terminal',
    route: '/semester-2/computer-hardware-lab',
    resources: defaultResources
  },
  {
    id: 'programming-c-lab',
    name: 'Programming in C Lab',
    code: 'CSL104',
    semester_id: 2,
    description: 'Provides hands-on laboratory exercises writing C programs, compiling scripts, debugging memory addresses, and checking compiler bugs.',
    credits: 2,
    slug: 'programming-c-lab',
    icon_name: 'Code',
    route: '/semester-2/programming-c-lab',
    resources: defaultResources
  },
  {
    id: 'discrete-mathematical-structures',
    name: 'Discrete Mathematical Structures',
    code: 'MAT205',
    semester_id: 2,
    description: 'Covers propositional logic, set relationships, permutation combinatorics, graph networks, and recurrence algebraic systems for CS design.',
    credits: 4,
    slug: 'discrete-mathematical-structures',
    icon_name: 'Binary',
    route: '/semester-2/discrete-mathematical-structures',
    resources: defaultResources
  },

  // --- SEMESTER 3 (S3) ---
  {
    id: 'mathematics-3',
    name: 'Mathematics for Computer & Information Science III',
    code: 'MAT203',
    semester_id: 3,
    description: 'Covers mathematical probability, descriptive statistics, random variables, distribution functions, and Markov chain process estimation models.',
    credits: 3,
    slug: 'mathematics-3',
    icon_name: 'Calculator',
    route: '/semester-3/mathematics-3',
    resources: defaultResources
  },
  {
    id: 'theory-of-computation',
    name: 'Theory of Computation',
    code: 'CST201',
    semester_id: 3,
    description: 'Introduces language grammar, finite automata machines, pushdown languages, Turing machines, and theoretical limits of algorithmic computability.',
    credits: 4,
    slug: 'theory-of-computation',
    icon_name: 'Cpu',
    route: '/semester-3/theory-of-computation',
    resources: defaultResources
  },
  {
    id: 'data-structures-algorithms',
    name: 'Data Structures and Algorithms',
    code: 'CST203',
    semester_id: 3,
    description: 'Covers dynamic arrays, linked nodes, trees, graphs, sorting lists, hash tables, and big-O asymptotic algorithm analysis.',
    credits: 4,
    slug: 'data-structures-algorithms',
    icon_name: 'Database',
    route: '/semester-3/data-structures-algorithms',
    resources: defaultResources
  },
  {
    id: 'object-oriented-programming',
    name: 'Object Oriented Programming',
    code: 'CST205',
    semester_id: 3,
    description: 'Teaches abstract encapsulation, inheritance hierarchy, polymorphism interfaces, exception wrappers, and app dev using Java platform.',
    credits: 4,
    slug: 'object-oriented-programming',
    icon_name: 'FolderOpen',
    route: '/semester-3/object-oriented-programming',
    resources: defaultResources
  },
  {
    id: 'digital-electronics-logic-design',
    name: 'Digital Electronics and Logic Design',
    code: 'CST207',
    semester_id: 3,
    description: 'Covers boolean logic gate circuits, combinational registers, sequential flip-flop machines, counters, and general microprocessor design.',
    credits: 4,
    slug: 'digital-electronics-logic-design',
    icon_name: 'Cpu',
    route: '/semester-3/digital-electronics-logic-design',
    resources: defaultResources
  },
  {
    id: 'economics-engineers',
    name: 'Economics for Engineers',
    code: 'HUT200',
    semester_id: 3,
    description: 'Introduces macro and micro economics, cost-benefit analysis, technology depreciation, project inflation forecasting, and financial management tools.',
    credits: 2,
    slug: 'economics-engineers',
    icon_name: 'TrendingUp',
    route: '/semester-3/economics-engineers',
    resources: defaultResources
  },
  {
    id: 'ethics-sustainable-development',
    name: 'Engineering Ethics and Sustainable Development',
    code: 'MCN201',
    semester_id: 3,
    description: 'Covers environmental preservation metrics, safety standards, professional moral code obligations, and sustainable manufacturing practices globally.',
    credits: 2,
    slug: 'ethics-sustainable-development',
    icon_name: 'ShieldAlert',
    route: '/semester-3/ethics-sustainable-development',
    resources: defaultResources
  },
  {
    id: 'data-structures-lab',
    name: 'Data Structures Lab',
    code: 'CSL201',
    semester_id: 3,
    description: 'Provides programming lab experience implementing stacks, trees, heaps, graph search traversals, and quick sorting methods.',
    credits: 2,
    slug: 'data-structures-lab',
    icon_name: 'Terminal',
    route: '/semester-3/data-structures-lab',
    resources: defaultResources
  },
  {
    id: 'digital-electronics-lab',
    name: 'Digital Electronics Lab',
    code: 'CSL203',
    semester_id: 3,
    description: 'Provides physical breadboard experience wiring logic gates, adders, multiplexers, counters, and registers in digital labs.',
    credits: 2,
    slug: 'digital-electronics-lab',
    icon_name: 'Terminal',
    route: '/semester-3/digital-electronics-lab',
    resources: defaultResources
  },

  // --- SEMESTER 4 (S4) ---
  {
    id: 'mathematics-4',
    name: 'Mathematics for Computer & Information Science IV',
    code: 'MAT204',
    semester_id: 4,
    description: 'Covers graph network theories, numerical matrix algorithms, algebraic approximations, and advanced modeling methods for programmers.',
    credits: 3,
    slug: 'mathematics-4',
    icon_name: 'Calculator',
    route: '/semester-4/mathematics-4',
    resources: defaultResources
  },
  {
    id: 'database-management-systems',
    name: 'Database Management Systems',
    code: 'CST202',
    semester_id: 4,
    description: 'Relational models, declarative SQL queries, normal form design, transaction control, indexing structures, and concurrency safety protocols.',
    credits: 4,
    slug: 'database-management-systems',
    icon_name: 'Database',
    route: '/semester-4/database-management-systems',
    resources: defaultResources
  },
  {
    id: 'operating-systems',
    name: 'Operating Systems',
    code: 'CST204',
    semester_id: 4,
    description: 'Covers process scheduling, deadlocks, virtual memory pages, file mapping directories, and fundamental shell execution routines.',
    credits: 4,
    slug: 'operating-systems',
    icon_name: 'Server',
    route: '/semester-4/operating-systems',
    resources: defaultResources
  },
  {
    id: 'computer-organization-architecture',
    name: 'Computer Organization and Architecture',
    code: 'CST206',
    semester_id: 4,
    description: 'Explores assembly arithmetic units, control pipelines, L1/L2 cache maps, memory structures, and hardware peripheral communications.',
    credits: 4,
    slug: 'computer-organization-architecture',
    icon_name: 'Cpu',
    route: '/semester-4/computer-organization-architecture',
    resources: defaultResources
  },
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    code: 'CST208',
    semester_id: 4,
    description: 'Introduces SDLC methodologies, agile sprints, system testing, design patterns, quality check standards, and project managers.',
    credits: 3,
    slug: 'software-engineering',
    icon_name: 'Layers',
    route: '/semester-4/software-engineering',
    resources: defaultResources
  },
  {
    id: 'database-lab',
    name: 'Database Management Systems Lab',
    code: 'CSL202',
    semester_id: 4,
    description: 'Hands-on querying of relational tables, view index triggers, stored procedure schemas, and web application connections.',
    credits: 2,
    slug: 'database-lab',
    icon_name: 'Terminal',
    route: '/semester-4/database-lab',
    resources: defaultResources
  },
  {
    id: 'operating-systems-lab',
    name: 'Operating Systems Lab',
    code: 'CSL204',
    semester_id: 4,
    description: 'Lab program execution of CPU scheduler simulators, page fault handlers, fork processes, and bash shell pipelines.',
    credits: 2,
    slug: 'operating-systems-lab',
    icon_name: 'Terminal',
    route: '/semester-4/operating-systems-lab',
    resources: defaultResources
  },

  // --- SEMESTER 5 (S5) ---
  {
    id: 'design-analysis-algorithms',
    name: 'Design and Analysis of Algorithms',
    code: 'CST301',
    semester_id: 5,
    description: 'Covers dynamic divide-conquer, greedy optimizations, network graphs, backtracks, dynamic algorithms, and NP-hard theory bounds.',
    credits: 4,
    slug: 'design-analysis-algorithms',
    icon_name: 'Network',
    route: '/semester-5/design-analysis-algorithms',
    resources: defaultResources
  },
  {
    id: 'computer-networks',
    name: 'Computer Networks',
    code: 'CST303',
    semester_id: 5,
    description: 'Covers OSI layered models, TCP/IP, IP routing, packet routers, DNS lookups, encryption keys, and security mechanisms.',
    credits: 4,
    slug: 'computer-networks',
    icon_name: 'Globe',
    route: '/semester-5/computer-networks',
    resources: defaultResources
  },
  {
    id: 'microprocessors-microcontrollers',
    name: 'Microprocessors and Microcontrollers',
    code: 'CST305',
    semester_id: 5,
    description: 'Covers x86 architecture, assembly registers, ARM microcontrollers, input-output interrupts, interfacing, and embedded program layouts.',
    credits: 4,
    slug: 'microprocessors-microcontrollers',
    icon_name: 'Cpu',
    route: '/semester-5/microprocessors-microcontrollers',
    resources: defaultResources
  },
  {
    id: 'compiler-design',
    name: 'Compiler Design',
    code: 'CST307',
    semester_id: 5,
    description: 'Study compiler phases, parser trees, semantic checks, intermediate code expressions, optimization methods, and target code compilers.',
    credits: 4,
    slug: 'compiler-design',
    icon_name: 'Binary',
    route: '/semester-5/compiler-design',
    resources: defaultResources
  },
  {
    id: 'constitution-of-india',
    name: 'Constitution of India',
    code: 'MCN301',
    semester_id: 5,
    description: 'Introduces national values, fundamental citizen rights, administrative power divisions, judiciary branches, and democratic values.',
    credits: 2,
    slug: 'constitution-of-india',
    icon_name: 'BookOpen',
    route: '/semester-5/constitution-of-india',
    resources: defaultResources
  },
  {
    id: 'compiler-design-lab',
    name: 'Compiler Design Lab',
    code: 'CSL301',
    semester_id: 5,
    description: 'Provides compiler implementation tasks coding lexical tokenizers, syntax parsers, syntax trees, and code builders.',
    credits: 2,
    slug: 'compiler-design-lab',
    icon_name: 'Terminal',
    route: '/semester-5/compiler-design-lab',
    resources: defaultResources
  },
  {
    id: 'computer-networks-lab',
    name: 'Computer Networks Lab',
    code: 'CSL303',
    semester_id: 5,
    description: 'Provides lab exercises coding TCP/UDP socket scripts, network router configurations, and network topology simulation maps.',
    credits: 2,
    slug: 'computer-networks-lab',
    icon_name: 'Terminal',
    route: '/semester-5/computer-networks-lab',
    resources: defaultResources
  },

  // --- SEMESTER 6 (S6) ---
  {
    id: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    code: 'CST302',
    semester_id: 6,
    description: 'Covers intelligent path searches, game trees, knowledge representations, bayesian logics, planning agents, and introductory AI tools.',
    credits: 4,
    slug: 'artificial-intelligence',
    icon_name: 'Sparkles',
    route: '/semester-6/artificial-intelligence',
    resources: defaultResources
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    code: 'CST304',
    semester_id: 6,
    description: 'Introduces regression models, support vector classifiers, unsupervised clustering algorithms, neural networks, and ML pipeline systems.',
    credits: 4,
    slug: 'machine-learning',
    icon_name: 'Brain',
    route: '/semester-6/machine-learning',
    resources: defaultResources
  },
  {
    id: 'web-technologies',
    name: 'Web Technologies',
    code: 'CST306',
    semester_id: 6,
    description: 'Introduces full-stack frameworks, REST api schemas, token logins, backend routing, databases, and dynamic single-page web applications.',
    credits: 4,
    slug: 'web-technologies',
    icon_name: 'Globe',
    route: '/semester-6/web-technologies',
    resources: defaultResources
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    code: 'CST308',
    semester_id: 6,
    description: 'Covers statistical modeling, data cleanup libraries, data visualization graphs, predictive modeling, and business analytics workflows.',
    credits: 3,
    slug: 'data-analytics',
    icon_name: 'LineChart',
    route: '/semester-6/data-analytics',
    resources: defaultResources
  },
  {
    id: 'mini-project',
    name: 'Mini Project / Comprehensive Course Work',
    code: 'CSD302',
    semester_id: 6,
    description: 'A collaborative capstone project integrating frontend coding, backend services, and databases into a working application.',
    credits: 2,
    slug: 'mini-project',
    icon_name: 'FolderKanban',
    route: '/semester-6/mini-project',
    resources: defaultResources
  },
  {
    id: 'machine-learning-lab',
    name: 'Machine Learning Lab',
    code: 'CSL302',
    semester_id: 6,
    description: 'Provides lab exercises configuring classifiers, preprocessing sets, testing predictions, and drawing analytics curves in Python.',
    credits: 2,
    slug: 'machine-learning-lab',
    icon_name: 'Terminal',
    route: '/semester-6/machine-learning-lab',
    resources: defaultResources
  },
  {
    id: 'web-technologies-lab',
    name: 'Web Technologies Lab',
    code: 'CSL304',
    semester_id: 6,
    description: 'Hands-on experience configuring server routers, coding responsive UI components, authentication, and database connectors.',
    credits: 2,
    slug: 'web-technologies-lab',
    icon_name: 'Terminal',
    route: '/semester-6/web-technologies-lab',
    resources: defaultResources
  },

  // --- SEMESTER 7 (S7) ---
  {
    id: 'cyber-security',
    name: 'Cyber Security',
    code: 'CST401',
    semester_id: 7,
    description: 'Covers symmetric cryptosystems, access lists, virus scanners, penetration audits, secure coding rules, and cloud infrastructure safety.',
    credits: 4,
    slug: 'cyber-security',
    icon_name: 'ShieldAlert',
    route: '/semester-7/cyber-security',
    resources: defaultResources
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    code: 'CST403',
    semester_id: 7,
    description: 'Covers server architectures, virtual hypervisors, bucket storage systems, serverless runtimes, load balancer scales, and SaaS models.',
    credits: 4,
    slug: 'cloud-computing',
    icon_name: 'Cloud',
    route: '/semester-7/cloud-computing',
    resources: defaultResources
  },
  {
    id: 'devops',
    name: 'DevOps and Software Engineering Practices',
    code: 'CST405',
    semester_id: 7,
    description: 'Introduces git version branches, automated pipeline scripting, docker file virtualization, cluster networks, and server monitoring dashboards.',
    credits: 3,
    slug: 'devops',
    icon_name: 'Infinity',
    route: '/semester-7/devops',
    resources: defaultResources
  },
  {
    id: 'internship',
    name: 'Internship / Industrial Training',
    code: 'CSD401',
    semester_id: 7,
    description: 'Engages students in a practical industry workspace, gaining professional design, coding, and workflow experiences.',
    credits: 2,
    slug: 'internship',
    icon_name: 'Briefcase',
    route: '/semester-7/internship',
    resources: defaultResources
  },
  {
    id: 'project-phase-1',
    name: 'Project Phase I',
    code: 'CSD403',
    semester_id: 7,
    description: 'Initial capstone research phase formulating project requirements, visual architecture drafts, feasibility tests, and prototyping designs.',
    credits: 2,
    slug: 'project-phase-1',
    icon_name: 'FolderSearch',
    route: '/semester-7/project-phase-1',
    resources: defaultResources
  },

  // --- SEMESTER 8 (S8) ---
  {
    id: 'project-phase-2',
    name: 'Project Phase II',
    code: 'CSD402',
    semester_id: 8,
    description: 'Final full development lifecycle implementing coding routines, quality checks, server deployments, documentation, and showcase presentations.',
    credits: 8,
    slug: 'project-phase-2',
    icon_name: 'Rocket',
    route: '/semester-8/project-phase-2',
    resources: defaultResources
  },
  {
    id: 'seminar',
    name: 'Seminar',
    code: 'CSD404',
    semester_id: 8,
    description: 'Focuses on exploring novel research topics, analyzing academic publications, and presenting findings to technical panels.',
    credits: 2,
    slug: 'seminar',
    icon_name: 'Presentation',
    route: '/semester-8/seminar',
    resources: defaultResources
  },
  {
    id: 'comprehensive-viva',
    name: 'Comprehensive Viva Voce',
    code: 'CSV402',
    semester_id: 8,
    description: 'Oral assessment evaluating total knowledge acquired across core CSE algorithms, coding paradigms, and engineering concepts.',
    credits: 2,
    slug: 'comprehensive-viva',
    icon_name: 'UserCheck',
    route: '/semester-8/comprehensive-viva',
    resources: defaultResources
  }
];
