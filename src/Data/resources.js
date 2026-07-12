// Fallback local resource database mapping slugs to active download links
const resources = {
  // Semester 1
  "engineering-physics": {
    notes: "https://drive.google.com/drive/folders/1tGPFHlxEThuBICkpIciBn_CgHKZtZo74?usp=sharing",
    pyqs: "https://drive.google.com/drive/folders/12PltJmVJDePxvjnbUvzXBwdwg6RCJznA?usp=sharing",
    syllabus: "https://drive.google.com/file/d/1nserm2eHXrlqzh_ApObr109zL6aN_uhq/view?usp=drive_link"
  },
  "engineering-mathematics-i": {
    notes: "https://drive.google.com/drive/folders/1tGPFHlxEThuBICkpIciBn_CgHKZtZo74?usp=drive_link",
    pyqs: "https://drive.google.com/drive/folders/12PltJmVJDePxvjnbUvzXBwdwg6RCJznA?usp=drive_link",
    syllabus: "https://drive.google.com/file/d/1UzNUQMuMkiSkSUAjZIO7Eqiked-KyRqX/view?usp=drive_link"
  },
  "fundamentals-of-electronics-engineering": {
    notes: "https://drive.google.com/drive/folders/1PmP5ZJWpL6JxvXMD5Pc5E_x3NYchWVur?usp=drive_link",
    pyqs: "https://drive.google.com/drive/folders/1wfvEOG9lbeKycm_Ye0hlIjX9y68bmikI?usp=drive_link",
    syllabus: "https://drive.google.com/file/d/1UzNUQMuMkiSkSUAjZIO7Eqiked-KyRqX/view?usp=drive_link"
  },
  "fundamentals-of-mechanical-engineering": {
    notes: "https://drive.google.com/drive/folders/1qbkC1rERWzz8_JSEVRe81rfJfcvMbNa_?usp=drive_link",
    pyqs: "https://drive.google.com/drive/folders/1WZ5OeICjlOoxSkiCVecjzJ625C8jnoFw?usp=drive_link",
    syllabus: "https://drive.google.com/file/d/1UzNUQMuMkiSkSUAjZIO7Eqiked-KyRqX/view?usp=drive_link"
  },
  "soft-skills": {
    notes: "https://drive.google.com/drive/folders/1DV4O6jC7Zb7Y_urQgARGMN1FTQAnJbPe?usp=drive_link",
    pyqs: "https://drive.google.com/drive/folders/1uL-R6Cc4ri-6Y1OIMyEApNsxks0rQHHQ?usp=drive_link",
    syllabus: "https://drive.google.com/file/d/1UzNUQMuMkiSkSUAjZIO7Eqiked-KyRqX/view?usp=drive_link"
  },

  // Semester 2
  "engineering-chemistry": {},
  "engineering-mathematics-ii": {},
  "fundamentals-of-electrical-engineering": {},
  "programming-for-problem-solving": {},
  "environment-and-ecology": {},
  "sports-and-yoga": {},

  // Semester 3
  "material-science": {},
  "technical-communication": {},
  "data-structure": {},
  "computer-organization-and-architecture": {},
  "discrete-structures-&-theory-of-logic": {},
  "discrete-structures-theory-of-logic": {},
  "cyber-security": {},

  // Semester 4
  "mathematics-iv": {},
  "universal-human-values-and-professional-ethics": {},
  "operating-system": {},
  "theory-of-automata-and-formal-languages": {},
  "object-oriented-programming-with-java": {},
  "python-programming": {},

  // Semester 5
  "database-management-system": {},
  "web-technology": {},
  "design-and-analysis-of-algorithm": {},
  "object-oriented-system-design-with-c++": {},
  "application-of-soft-computing": {},
  "constitution-of-india": {},

  // Semester 6
  "essence-of-indian-traditional-knowledge": {},
  "idea-to-business-model": {},
  "software-engineering": {},
  "compiler-design": {},
  "blockchain-architecture-design": {},
  "computer-networks": {
    notes: "https://drive.google.com/file/d/1ypAP_Yixa43UJ_YjAVSK-1JUIhKX3WyT/view?usp=sharing",
    pyqs: "https://www.aktuonline.com/",
    syllabus: "https://www.aktuonline.com/"
  },

  // Semester 7
  "hsmc-1/hsmc-2": {},
  "artificial-intelligence": {},
  "natural-language-processing": {},
  "high-performance-computing": {},
  "cryptography-and-network-security": {},
  "design-&-development-of-applications": {},
  "software-testing": {},
  "distributed-systems": {},
  "deep-learning": {},
  "service-oriented-architecture": {},
  "quantum-computing": {},
  "mobile-computing": {},
  "internet-of-things": {},
  "cloud-computing": {},
  "open-elective-ii": {},
  "moocs": {},

  // Semester 8
  "hsmc-2-/hsmc-1": {},
  "open-elective-iii": {},
  "open-elective-iv": {}
};

export default resources;