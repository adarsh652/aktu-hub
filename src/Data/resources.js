// Fallback local resource database mapping slugs to active download links
const resources = {
  // Semester 1
  "engineering-physics": {
    notes: "https://drive.google.com/file/d/1ypAP_Yixa43UJ_YjAVSK-1JUIhKX3WyT/view?usp=sharing",
    pyqs: "https://www.aktuonline.com/btech.html#physics",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2425/Common_Syllabus_1st_Year_2024-25.pdf",
    labFiles: "https://github.com/topics/aktu-physics-lab"
  },
  "engineering-mathematics-i": {
    notes: "https://www.geeksforgeeks.org/engineering-mathematics-tutorials/",
    pyqs: "https://www.aktuonline.com/btech.html#maths",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2425/Common_Syllabus_1st_Year_2024-25.pdf"
  },
  "fundamentals-of-electronics-engineering": {
    notes: "https://www.tutorialspoint.com/basic_electronics/index.htm",
    pyqs: "https://www.aktuonline.com/btech.html#electronics",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2425/Common_Syllabus_1st_Year_2024-25.pdf",
    labFiles: "https://github.com/topics/basic-electronics"
  },
  "fundamentals-of-mechanical-engineering": {
    notes: "https://www.engineeringtoolbox.com/",
    pyqs: "https://www.aktuonline.com/btech.html#mechanical",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2425/Common_Syllabus_1st_Year_2024-25.pdf"
  },
  "soft-skills": {
    notes: "https://www.skillsyouneed.com/",
    pyqs: "https://www.aktuonline.com/btech.html#english",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2425/Common_Syllabus_1st_Year_2024-25.pdf"
  },

  // Semester 2
  "engineering-chemistry": {
    notes: "https://www.chemistryworld.com/",
    pyqs: "https://www.aktuonline.com/btech.html#chemistry",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2425/Common_Syllabus_1st_Year_2024-25.pdf",
    labFiles: "https://github.com/topics/chemistry-lab"
  },
  "engineering-mathematics-ii": {
    notes: "https://www.geeksforgeeks.org/engineering-mathematics-tutorials/",
    pyqs: "https://www.aktuonline.com/btech.html#maths",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2425/Common_Syllabus_1st_Year_2024-25.pdf"
  },
  "fundamentals-of-electrical-engineering": {
    notes: "https://www.electrical4u.com/",
    pyqs: "https://www.aktuonline.com/btech.html#electrical",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2425/Common_Syllabus_1st_Year_2024-25.pdf",
    labFiles: "https://github.com/topics/electrical-lab"
  },
  "programming-for-problem-solving": {
    notes: "https://www.learn-c.org/",
    pyqs: "https://www.aktuonline.com/btech.html#programming",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2425/Common_Syllabus_1st_Year_2024-25.pdf",
    labFiles: "https://github.com/topics/c-programming"
  },
  "environment-and-ecology": {
    notes: "https://www.nature.com/subjects/environmental-sciences",
    pyqs: "https://www.aktuonline.com/btech.html#evs",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2425/Common_Syllabus_1st_Year_2024-25.pdf"
  },
  "sports-and-yoga": {
    notes: "https://www.yogaalliance.org/",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2425/Common_Syllabus_1st_Year_2024-25.pdf"
  },

  // Semester 3
  "material-science": {
    notes: "https://www.sciencedaily.com/news/matter_energy/materials_science/",
    pyqs: "https://www.aktuonline.com/btech.html",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus1920/B.Tech.%202nd%20Year%20CSE%20Syllabus.pdf"
  },
  "technical-communication": {
    notes: "https://www.societyfortechnicalcommunication.org/",
    pyqs: "https://www.aktuonline.com/btech.html",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus1920/B.Tech.%202nd%20Year%20CSE%20Syllabus.pdf"
  },
  "data-structure": {
    notes: "https://www.geeksforgeeks.org/data-structures/",
    pyqs: "https://www.aktuonline.com/btech.html#ds",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus1920/B.Tech.%202nd%20Year%20CSE%20Syllabus.pdf",
    labFiles: "https://github.com/topics/data-structures-algorithms"
  },
  "computer-organization-and-architecture": {
    notes: "https://www.geeksforgeeks.org/computer-organization-and-architecture-tutorials/",
    pyqs: "https://www.aktuonline.com/btech.html#coa",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus1920/B.Tech.%202nd%20Year%20CSE%20Syllabus.pdf"
  },
  "discrete-structures-&-theory-of-logic": {
    notes: "https://www.geeksforgeeks.org/discrete-mathematics-tutorials/",
    pyqs: "https://www.aktuonline.com/btech.html#discrete",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus1920/B.Tech.%202nd%20Year%20CSE%20Syllabus.pdf"
  },
  "discrete-structures-theory-of-logic": {
    notes: "https://www.geeksforgeeks.org/discrete-mathematics-tutorials/",
    pyqs: "https://www.aktuonline.com/btech.html#discrete",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus1920/B.Tech.%202nd%20Year%20CSE%20Syllabus.pdf"
  },
  "cyber-security": {
    notes: "https://www.sans.org/cyber-security-resources/",
    pyqs: "https://www.aktuonline.com/btech.html#cyber",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus1920/B.Tech.%202nd%20Year%20CSE%20Syllabus.pdf"
  },

  // Semester 4
  "mathematics-iv": {
    notes: "https://www.khanacademy.org/math",
    pyqs: "https://www.aktuonline.com/btech.html#maths",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus1920/B.Tech.%202nd%20Year%20CSE%20Syllabus.pdf"
  },
  "universal-human-values-and-professional-ethics": {
    notes: "https://www.uhv.org.in/",
    pyqs: "https://www.aktuonline.com/btech.html",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus1920/B.Tech.%202nd%20Year%20CSE%20Syllabus.pdf"
  },
  "operating-system": {
    notes: "https://www.geeksforgeeks.org/operating-systems/",
    pyqs: "https://www.aktuonline.com/btech.html#os",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus1920/B.Tech.%202nd%20Year%20CSE%20Syllabus.pdf",
    labFiles: "https://github.com/topics/operating-system-labs"
  },
  "theory-of-automata-and-formal-languages": {
    notes: "https://www.geeksforgeeks.org/theory-of-computation-tutorials/",
    pyqs: "https://www.aktuonline.com/btech.html#tafl",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus1920/B.Tech.%202nd%20Year%20CSE%20Syllabus.pdf"
  },
  "object-oriented-programming-with-java": {
    notes: "https://docs.oracle.com/javase/tutorial/",
    pyqs: "https://www.aktuonline.com/btech.html#java",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus1920/B.Tech.%202nd%20Year%20CSE%20Syllabus.pdf",
    labFiles: "https://github.com/topics/java-labs"
  },
  "python-programming": {
    notes: "https://docs.python.org/3/tutorial/",
    pyqs: "https://www.aktuonline.com/btech.html#python",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus1920/B.Tech.%202nd%20Year%20CSE%20Syllabus.pdf",
    labFiles: "https://github.com/topics/python-labs"
  },

  // Semester 5
  "database-management-system": {
    notes: "https://www.geeksforgeeks.org/dbms/",
    pyqs: "https://www.aktuonline.com/btech.html#dbms",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus2021/B.Tech%20CSE%203rd%20Year.pdf",
    labFiles: "https://github.com/topics/dbms-labs"
  },
  "web-technology": {
    notes: "https://developer.mozilla.org/en-US/",
    pyqs: "https://www.aktuonline.com/btech.html#webtech",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus2021/B.Tech%20CSE%203rd%20Year.pdf",
    labFiles: "https://github.com/topics/web-development"
  },
  "design-and-analysis-of-algorithm": {
    notes: "https://www.geeksforgeeks.org/fundamentals-of-algorithms/",
    pyqs: "https://www.aktuonline.com/btech.html#daa",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus2021/B.Tech%20CSE%203rd%20Year.pdf"
  },
  "object-oriented-system-design-with-c++": {
    notes: "https://www.learncpp.com/",
    pyqs: "https://www.aktuonline.com/btech.html",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus2021/B.Tech%20CSE%203rd%20Year.pdf",
    labFiles: "https://github.com/topics/cpp-labs"
  },
  "application-of-soft-computing": {
    notes: "https://www.sciencedirect.com/topics/computer-science/soft-computing",
    pyqs: "https://www.aktuonline.com/btech.html",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus2021/B.Tech%20CSE%203rd%20Year.pdf"
  },
  "constitution-of-india": {
    notes: "https://www.india.gov.in/my-government/constitution-india",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus2021/B.Tech%20CSE%203rd%20Year.pdf"
  },

  // Semester 6
  "essence-of-indian-traditional-knowledge": {
    notes: "https://www.ayush.gov.in/",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus2021/B.Tech%20CSE%203rd%20Year.pdf"
  },
  "idea-to-business-model": {
    notes: "https://www.ycombinator.com/library",
    pyqs: "https://www.aktuonline.com/btech.html",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus2021/B.Tech%20CSE%203rd%20Year.pdf"
  },
  "software-engineering": {
    notes: "https://www.geeksforgeeks.org/software-engineering/",
    pyqs: "https://www.aktuonline.com/btech.html#se",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus2021/B.Tech%20CSE%203rd%20Year.pdf"
  },
  "compiler-design": {
    notes: "https://www.geeksforgeeks.org/compiler-design-tutorials/",
    pyqs: "https://www.aktuonline.com/btech.html#compiler",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus2021/B.Tech%20CSE%203rd%20Year.pdf",
    labFiles: "https://github.com/topics/compiler-labs"
  },
  "blockchain-architecture-design": {
    notes: "https://ethereum.org/en/developers/",
    pyqs: "https://www.aktuonline.com/btech.html",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus2021/B.Tech%20CSE%203rd%20Year.pdf"
  },
  "computer-networks": {
    notes: "https://drive.google.com/file/d/1ypAP_Yixa43UJ_YjAVSK-1JUIhKX3WyT/view?usp=sharing",
    pyqs: "https://www.aktuonline.com/btech.html#cn",
    syllabus: "https://aktu.ac.in/pdf/syllabus/syllabus2021/B.Tech%20CSE%203rd%20Year.pdf",
    labFiles: "https://github.com/topics/computer-networks-lab"
  },

  // Semester 7
  "hsmc-1/hsmc-2": {
    notes: "https://aktu.ac.in/",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2223/Syllabus_BTech_4thYear_22-23.pdf"
  },
  "artificial-intelligence": {
    notes: "https://www.geeksforgeeks.org/artificial-intelligence-tutorials/",
    pyqs: "https://www.aktuonline.com/btech.html#ai",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2223/Syllabus_BTech_4thYear_22-23.pdf",
    labFiles: "https://github.com/topics/artificial-intelligence"
  },
  "natural-language-processing": {
    notes: "https://www.nltk.org/",
    pyqs: "https://www.aktuonline.com/btech.html",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2223/Syllabus_BTech_4thYear_22-23.pdf"
  },
  "high-performance-computing": {
    notes: "https://hpc.llnl.gov/",
    pyqs: "https://www.aktuonline.com/btech.html",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2223/Syllabus_BTech_4thYear_22-23.pdf"
  },
  "cryptography-and-network-security": {
    notes: "https://www.geeksforgeeks.org/cryptography-introduction/",
    pyqs: "https://www.aktuonline.com/btech.html#security",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2223/Syllabus_BTech_4thYear_22-23.pdf"
  },
  "design-&-development-of-applications": {
    notes: "https://developer.android.com/",
    pyqs: "https://www.aktuonline.com/btech.html",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2223/Syllabus_BTech_4thYear_22-23.pdf"
  },
  "software-testing": {
    notes: "https://www.softwaretestingmaterial.com/",
    pyqs: "https://www.aktuonline.com/btech.html",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2223/Syllabus_BTech_4thYear_22-23.pdf"
  },
  "distributed-systems": {
    notes: "https://www.geeksforgeeks.org/distributed-systems/",
    pyqs: "https://www.aktuonline.com/btech.html",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2223/Syllabus_BTech_4thYear_22-23.pdf"
  },
  "deep-learning": {
    notes: "https://www.deeplearningbook.org/",
    pyqs: "https://www.aktuonline.com/btech.html",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2223/Syllabus_BTech_4thYear_22-23.pdf"
  },
  "service-oriented-architecture": {
    notes: "https://www.w3.org/TR/ws-arch/",
    pyqs: "https://www.aktuonline.com/btech.html",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2223/Syllabus_BTech_4thYear_22-23.pdf"
  },
  "quantum-computing": {
    notes: "https://qiskit.org/learn",
    pyqs: "https://www.aktuonline.com/btech.html",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2223/Syllabus_BTech_4thYear_22-23.pdf"
  },
  "mobile-computing": {
    notes: "https://www.tutorialspoint.com/mobile_computing/index.htm",
    pyqs: "https://www.aktuonline.com/btech.html",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2223/Syllabus_BTech_4thYear_22-23.pdf"
  },
  "internet-of-things": {
    notes: "https://www.oracle.com/internet-of-things/what-is-iot/",
    pyqs: "https://www.aktuonline.com/btech.html",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2223/Syllabus_BTech_4thYear_22-23.pdf"
  },
  "cloud-computing": {
    notes: "https://aws.amazon.com/what-is-cloud-computing/",
    pyqs: "https://www.aktuonline.com/btech.html#cloud",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2223/Syllabus_BTech_4thYear_22-23.pdf"
  },
  "open-elective-ii": {
    notes: "https://aktu.ac.in/",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2223/Syllabus_BTech_4thYear_22-23.pdf"
  },
  "moocs": {
    notes: "https://www.swayam.gov.in/",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2223/Syllabus_BTech_4thYear_22-23.pdf"
  },

  // Semester 8
  "hsmc-2-/hsmc-1": {
    notes: "https://aktu.ac.in/",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2223/Syllabus_BTech_4thYear_22-23.pdf"
  },
  "open-elective-iii": {
    notes: "https://aktu.ac.in/",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2223/Syllabus_BTech_4thYear_22-23.pdf"
  },
  "open-elective-iv": {
    notes: "https://aktu.ac.in/",
    syllabus: "https://aktu.ac.in/pdf/syllabus/Syllabus2223/Syllabus_BTech_4thYear_22-23.pdf"
  }
};

export default resources;