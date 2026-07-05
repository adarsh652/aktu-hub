const SubjectsData = [
  {
    id: 1,
    name: "Engineering Physics",
    code: "BAS101",
    semester: 1,
    branch: "COMMON",
    credits: 4
  },
  {
    id: 2,
    name: "Engineering Mathematics-I",
    code: "BAS103",
    semester: 1,
    branch: "COMMON",
    credits: 4
  },
  {
    id: 3,
    name: "Fundamentals of Electronics Engineering",
    code: "BEC101",
    semester: 1,
    branch: "COMMON",
    credits: 3
  },
  {
    id: 4,
    name: "Fundamentals of Mechanical Engineering",
    code: "BME101",
    semester: 1,
    branch: "COMMON",
    credits: 3
  },
  {
    id: 5,
    name: "Soft Skills",
    code: "BAS105",
    semester: 1,
    branch: "COMMON",
    credits: 3
  },

  {
    id: 6,
    name: "Engineering Chemistry",
    code: "BAS202",
    semester: 2,
    branch: "COMMON",
    credits: 4
  },
  {
    id: 7,
    name: "Engineering Mathematics-II",
    code: "BAS203",
    semester: 2,
    branch: "COMMON",
    credits: 4
  },
  {
    id: 8,
    name: "Fundamentals of Electrical Engineering",
    code: "BEE201",
    semester: 2,
    branch: "COMMON",
    credits: 3
  },
  {
    id: 9,
    name: "Programming for Problem Solving",
    code: "BCS201",
    semester: 2,
    branch: "COMMON",
    credits: 3
  },
  {
    id: 10,
    name: "Environment and Ecology",
    code: "BAS204",
    semester: 2,
    branch: "COMMON",
    credits: 3
  },
  {
    id: 11,
    name: "Sports and Yoga",
    code: "BVA251",
    semester: 2,
    branch: "COMMON",
    credits: 0
  },

  {
    id: 12,
    name: "Material Science",
    code: "BMS301",
    semester: 3,
    branch: "CSE",
    credits: 3
  },
  {
    id: 13,
    name: "Technical Communication",
    code: "BAS301",
    semester: 3,
    branch: "CSE",
    credits: 3
  },
  {
    id: 14,
    name: "Data Structure",
    code: "BCS301",
    semester: 3,
    branch: "CSE",
    credits: 4
  },
  {
    id: 15,
    name: "Computer Organization and Architecture",
    code: "BCS302",
    semester: 3,
    branch: "CSE",
    credits: 4
  },
  {
    id: 16,
    name: "Discrete Structures & Theory of Logic",
    code: "BCS303",
    semester: 3,
    branch: "CSE",
    credits: 4
  },
  {
    id: 17,
    name: "Cyber Security",
    code: "BCC301",
    semester: 3,
    branch: "COMMON",
    credits: 0
  },

  {
    id: 18,
    name: "Mathematics-IV",
    code: "BAS403",
    semester: 4,
    branch: "CSE",
    credits: 4
  },
  {
    id: 19,
    name: "Universal Human Values and Professional Ethics",
    code: "BVE401",
    semester: 4,
    branch: "COMMON",
    credits: 3
  },
  {
    id: 20,
    name: "Operating System",
    code: "BCS401",
    semester: 4,
    branch: "CSE",
    credits: 4
  },
  {
    id: 21,
    name: "Theory of Automata and Formal Languages",
    code: "BCS402",
    semester: 4,
    branch: "CSE",
    credits: 4
  },
  {
    id: 22,
    name: "Object Oriented Programming with Java",
    code: "BCS403",
    semester: 4,
    branch: "CSE",
    credits: 4
  },
  {
    id: 23,
    name: "Python Programming",
    code: "BCC401",
    semester: 4,
    branch: "COMMON",
    credits: 0
  },

  {
    id: 24,
    name: "Database Management System",
    code: "BCS501",
    semester: 5,
    branch: "CSE",
    credits: 4
  },
  {
    id: 25,
    name: "Web Technology",
    code: "BCS502",
    semester: 5,
    branch: "CSE",
    credits: 4
  },
  {
    id: 26,
    name: "Design and Analysis of Algorithm",
    code: "BCS503",
    semester: 5,
    branch: "CSE",
    credits: 4
  },
  {
    id: 27,
    name: "Object Oriented System Design with C++",
    code: "BCS051",
    semester: 5,
    branch: "CSE",
    credits: 3
  },
  {
    id: 28,
    name: "Application of Soft Computing",
    code: "BCS054",
    semester: 5,
    branch: "CSE",
    credits: 3
  },
  {
    id: 29,
    name: "Constitution of India",
    code: "BNC501",
    semester: 5,
    branch: "COMMON",
    credits: 0
  },

  {
    id: 30,
    name: "Essence of Indian Traditional Knowledge",
    code: "BNC602",
    semester: 6,
    branch: "COMMON",
    credits: 0
  },
  {
    id: 31,
    name: "IDEA TO BUSINESS MODEL",
    code: "BOE601",
    semester: 6,
    branch: "OPEN",
    credits: 3
  },
  {
    id: 32,
    name: "Software Engineering",
    code: "BCS601",
    semester: 6,
    branch: "CSE",
    credits: 4
  },
  {
    id: 33,
    name: "Compiler Design",
    code: "BCS602",
    semester: 6,
    branch: "CSE",
    credits: 4
  },
  {
    id: 34,
    name: "Blockchain Architecture Design",
    code: "BCS063",
    semester: 6,
    branch: "CSE",
    credits: 3
  },
  {
    id: 35,
    name: "Computer Networks",
    code: "BCS603",
    semester: 6,
    branch: "CSE",
    credits: 4
  },
  {
    id: 36,
    name: "Artificial Intelligence",
    code: "BCS701",
    semester: 7,
    branch: "CSE",
    credits: 4
  },
  {
    id: 37,
    name: "Natural language processing",
    code: "BCS071",
    semester: 7,
    branch: "CSE",
    credits: 3
  },
  {
    id: 38,
    name: "High Performance Computing",
    code: "BCS072",
    semester: 7,
    branch: "CSE",
    credits: 3
  },
  {
    id: 39,
    name: "Cryptography and Network Security",
    code: "BCS073",
    semester: 7,
    branch: "CSE",
    credits: 3
  },
  {
    id: 40,
    name: "Design & Development of Applications",
    code: "BCS074",
    semester: 7,
    branch: "CSE",
    credits: 3
  },
  {
    id: 41,
    name: "Software Testing",
    code: "BCS075",
    semester: 7,
    branch: "CSE",
    credits: 3
  },
  {
    id: 42,
    name: "Distributed Systems",
    code: "BCS076",
    semester: 7,
    branch: "CSE",
    credits: 3
  },
  {
    id: 43,
    name: "Deep Learning",
    code: "BCS077",
    semester: 7,
    branch: "CSE",
    credits: 3
  },
  {
    id: 44,
    name: "Service Oriented Architecture",
    code: "BCS078",
    semester: 7,
    branch: "CSE",
    credits: 3
  },
  {
    id: 45,
    name: "Quantum Computing",
    code: "BCS079",
    semester: 7,
    branch: "CSE",
    credits: 3
  },
  {
    id: 46,
    name: "Mobile Computing",
    code: "BCS080",
    semester: 7,
    branch: "CSE",
    credits: 3
  },
  {
    id: 47,
    name: "Internet of Things",
    code: "BCS081",
    semester: 7,
    branch: "CSE",
    credits: 3
  },
  {
    id: 48,
    name: "Cloud Computing",
    code: "BCS082",
    semester: 7,
    branch: "CSE",
    credits: 3
  },
  {
    id: 49,
    name: "HSMC-1/HSMC-2",
    code: "KHM701",
    semester: 7,
    branch: "COMMON",
    credits: 3
  },
  {
    id: 50,
    name: "Open Elective-II",
    code: "KOE071",
    semester: 7,
    branch: "OPEN",
    credits: 3
  },
  {
    id: 51,
    name: "MOOCs",
    code: "BSS701",
    semester: 7,
    branch: "COMMON",
    credits: 2
  },
  {
    id: 52,
    name: "HSMC-2 /HSMC-1",
    code: "KHM801",
    semester: 8,
    branch: "COMMON",
    credits: 3
  },
  {
    id: 53,
    name: "Open Elective-III",
    code: "KOE081",
    semester: 8,
    branch: "OPEN",
    credits: 3
  },
  {
    id: 54,
    name: "Open Elective-IV",
    code: "KOE082",
    semester: 8,
    branch: "OPEN",
    credits: 3
  }
];

export default SubjectsData;