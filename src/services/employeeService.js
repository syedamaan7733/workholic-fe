// This is where you would set up your API calls with axios or fetch
// I'll use mock data for demonstration

import axios from "axios";
import { authToken } from "./token.service";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock data
const employees = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    position: "Frontend Developer",
    department: "Engineering",
    salary: 85000,
    hireDate: "2021-06-15",
    status: "Active",
    imageUrl: "/api/placeholder/150/150",
    address: "123 Main St, Anytown, USA",
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "(555) 987-6543",
    },
    skills: ["React", "JavaScript", "CSS", "HTML"],
    projects: ["Website Redesign", "Mobile App"],
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "(555) 234-5678",
    position: "Product Manager",
    department: "Product",
    salary: 95000,
    hireDate: "2020-03-10",
    status: "Active",
    imageUrl: "/api/placeholder/150/150",
    address: "456 Oak Ave, Somewhere, USA",
    emergencyContact: {
      name: "Bob Smith",
      relationship: "Brother",
      phone: "(555) 876-5432",
    },
    skills: ["Product Strategy", "Agile", "Market Research"],
    projects: ["Product Launch 2023", "Customer Feedback System"],
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.j@example.com",
    phone: "(555) 345-6789",
    position: "Backend Developer",
    department: "Engineering",
    salary: 87000,
    hireDate: "2022-01-20",
    status: "On Leave",
    imageUrl: "/api/placeholder/150/150",
    address: "789 Pine St, Elsewhere, USA",
    emergencyContact: {
      name: "Sarah Johnson",
      relationship: "Wife",
      phone: "(555) 765-4321",
    },
    skills: ["Node.js", "Python", "SQL", "MongoDB"],
    projects: ["API Development", "Database Migration"],
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Garcia",
    email: "emily.g@example.com",
    phone: "(555) 456-7890",
    position: "UX Designer",
    department: "Design",
    salary: 82000,
    hireDate: "2021-09-05",
    status: "Active",
    imageUrl: "/api/placeholder/150/150",
    address: "321 Maple Rd, Cityville, USA",
    emergencyContact: {
      name: "Luis Garcia",
      relationship: "Father",
      phone: "(555) 654-3210",
    },
    skills: ["UI/UX", "Figma", "User Research", "Prototyping"],
    projects: ["Mobile App Redesign", "Design System"],
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Wilson",
    email: "david.w@example.com",
    phone: "(555) 567-8901",
    position: "DevOps Engineer",
    department: "Engineering",
    salary: 92000,
    hireDate: "2019-11-12",
    status: "Active",
    imageUrl: "/api/placeholder/150/150",
    address: "567 Cedar Ln, Townsburg, USA",
    emergencyContact: {
      name: "Karen Wilson",
      relationship: "Mother",
      phone: "(555) 543-2109",
    },
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    projects: ["Cloud Migration", "Infrastructure Automation"],
  },
  {
    id: "6",
    firstName: "Sarah",
    lastName: "Lee",
    email: "sarah.l@example.com",
    phone: "(555) 678-9012",
    position: "Data Scientist",
    department: "Data",
    salary: 98000,
    hireDate: "2020-07-23",
    status: "Active",
    imageUrl: "/api/placeholder/150/150",
    address: "890 Birch Dr, Villagetown, USA",
    emergencyContact: {
      name: "Mike Lee",
      relationship: "Husband",
      phone: "(555) 432-1098",
    },
    skills: ["Python", "R", "Machine Learning", "SQL", "Tableau"],
    projects: ["Customer Analytics", "Predictive Modeling"],
  },
  {
    id: "7",
    firstName: "Robert",
    lastName: "Brown",
    email: "robert.b@example.com",
    phone: "(555) 789-0123",
    position: "Sales Manager",
    department: "Sales",
    salary: 90000,
    hireDate: "2018-05-14",
    status: "Active",
    imageUrl: "/api/placeholder/150/150",
    address: "234 Elm St, Hamletville, USA",
    emergencyContact: {
      name: "Patricia Brown",
      relationship: "Wife",
      phone: "(555) 321-0987",
    },
    skills: ["Negotiation", "CRM", "Sales Strategy", "Team Leadership"],
    projects: ["Enterprise Sales Program", "Sales Team Expansion"],
  },
  {
    id: "8",
    firstName: "Jennifer",
    lastName: "Martinez",
    email: "jennifer.m@example.com",
    phone: "(555) 890-1234",
    position: "HR Specialist",
    department: "Human Resources",
    salary: 75000,
    hireDate: "2021-02-28",
    status: "Active",
    imageUrl: "/api/placeholder/150/150",
    address: "456 Walnut Ave, Suburbia, USA",
    emergencyContact: {
      name: "Carlos Martinez",
      relationship: "Father",
      phone: "(555) 210-9876",
    },
    skills: [
      "Recruiting",
      "Employee Relations",
      "Benefits Administration",
      "HRIS",
    ],
    projects: ["Employee Onboarding Revamp", "Benefits Program Update"],
  },
  {
    id: "9",
    firstName: "Thomas",
    lastName: "Taylor",
    email: "thomas.t@example.com",
    phone: "(555) 901-2345",
    position: "Full Stack Developer",
    department: "Engineering",
    salary: 89000,
    hireDate: "2020-10-17",
    status: "Terminated",
    imageUrl: "/api/placeholder/150/150",
    address: "789 Spruce St, Techville, USA",
    emergencyContact: {
      name: "Amanda Taylor",
      relationship: "Sister",
      phone: "(555) 109-8765",
    },
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
    projects: ["E-commerce Platform", "Internal Tools"],
  },
  {
    id: "10",
    firstName: "Lisa",
    lastName: "Rodriguez",
    email: "lisa.r@example.com",
    phone: "(555) 012-3456",
    position: "Marketing Specialist",
    department: "Marketing",
    salary: 76000,
    hireDate: "2022-03-15",
    status: "Active",
    imageUrl: "/api/placeholder/150/150",
    address: "123 Aspen Cir, Marketville, USA",
    emergencyContact: {
      name: "Miguel Rodriguez",
      relationship: "Brother",
      phone: "(555) 098-7654",
    },
    skills: ["Digital Marketing", "Content Creation", "SEO", "Social Media"],
    projects: ["Brand Refresh", "Social Media Campaign"],
  },
  {
    id: "11",
    firstName: "James",
    lastName: "Anderson",
    email: "james.a@example.com",
    phone: "(555) 123-4567",
    position: "Financial Analyst",
    department: "Finance",
    salary: 83000,
    hireDate: "2019-08-22",
    status: "Active",
    imageUrl: "/api/placeholder/150/150",
    address: "567 Willow Ln, Numberville, USA",
    emergencyContact: {
      name: "Mary Anderson",
      relationship: "Wife",
      phone: "(555) 987-6543",
    },
    skills: ["Financial Modeling", "Excel", "Data Analysis", "Forecasting"],
    projects: ["Annual Budget", "Cost Reduction Initiative"],
  },
  {
    id: "12",
    firstName: "Patricia",
    lastName: "Clark",
    email: "patricia.c@example.com",
    phone: "(555) 234-5678",
    position: "QA Engineer",
    department: "Engineering",
    salary: 78000,
    hireDate: "2021-11-08",
    status: "On Leave",
    imageUrl: "/api/placeholder/150/150",
    address: "890 Poplar Dr, Testville, USA",
    emergencyContact: {
      name: "Daniel Clark",
      relationship: "Husband",
      phone: "(555) 876-5432",
    },
    skills: ["Manual Testing", "Automated Testing", "Selenium", "JIRA"],
    projects: ["Quality Assurance Framework", "Regression Testing"],
  },
  {
    id: "13",
    firstName: "Richard",
    lastName: "Lewis",
    email: "richard.l@example.com",
    phone: "(555) 345-6789",
    position: "Project Manager",
    department: "Project Management",
    salary: 92000,
    hireDate: "2020-04-30",
    status: "Active",
    imageUrl: "/api/placeholder/150/150",
    address: "234 Birch Ave, Planville, USA",
    emergencyContact: {
      name: "Elizabeth Lewis",
      relationship: "Wife",
      phone: "(555) 765-4321",
    },
    skills: [
      "Project Planning",
      "Agile",
      "Risk Management",
      "Stakeholder Management",
    ],
    projects: ["System Migration", "Process Improvement"],
  },
  {
    id: "14",
    firstName: "Michelle",
    lastName: "Walker",
    email: "michelle.w@example.com",
    phone: "(555) 456-7890",
    position: "Content Writer",
    department: "Marketing",
    salary: 72000,
    hireDate: "2022-02-10",
    status: "Active",
    imageUrl: "/api/placeholder/150/150",
    address: "456 Pine Cir, Wordville, USA",
    emergencyContact: {
      name: "Joseph Walker",
      relationship: "Father",
      phone: "(555) 654-3210",
    },
    skills: ["Copywriting", "Content Strategy", "SEO Writing", "Editing"],
    projects: ["Blog Revamp", "Product Documentation"],
  },
  {
    id: "15",
    firstName: "Charles",
    lastName: "Hall",
    email: "charles.h@example.com",
    phone: "(555) 567-8901",
    position: "Systems Administrator",
    department: "IT",
    salary: 80000,
    hireDate: "2019-12-05",
    status: "Terminated",
    imageUrl: "/api/placeholder/150/150",
    address: "789 Oak St, Systemville, USA",
    emergencyContact: {
      name: "Dorothy Hall",
      relationship: "Mother",
      phone: "(555) 543-2109",
    },
    skills: ["Windows Server", "Linux", "Active Directory", "Networking"],
    projects: ["Server Upgrade", "Network Security Enhancements"],
  },
  {
    id: "16",
    firstName: "Laura",
    lastName: "Harris",
    email: "laura.h@example.com",
    phone: "(555) 678-9012",
    position: "UI Developer",
    department: "Engineering",
    salary: 84000,
    hireDate: "2021-07-19",
    status: "Active",
    imageUrl: "/api/placeholder/150/150",
    address: "123 Cedar St, Frontendville, USA",
    emergencyContact: {
      name: "William Harris",
      relationship: "Husband",
      phone: "(555) 432-1098",
    },
    skills: ["HTML", "CSS", "JavaScript", "UI Frameworks", "Responsive Design"],
    projects: ["Homepage Redesign", "Design System Implementation"],
  },
  {
    id: "17",
    firstName: "Steven",
    lastName: "Young",
    email: "steven.y@example.com",
    phone: "(555) 789-0123",
    position: "Customer Success Manager",
    department: "Customer Success",
    salary: 79000,
    hireDate: "2020-09-23",
    status: "Active",
    imageUrl: "/api/placeholder/150/150",
    address: "567 Elm Dr, Satisfactionville, USA",
    emergencyContact: {
      name: "Linda Young",
      relationship: "Wife",
      phone: "(555) 321-0987",
    },
    skills: [
      "Customer Relations",
      "Account Management",
      "Problem Solving",
      "CRM Software",
    ],
    projects: ["Customer Retention Program", "Onboarding Improvement"],
  },
  {
    id: "18",
    firstName: "Karen",
    lastName: "King",
    email: "karen.k@example.com",
    phone: "(555) 890-1234",
    position: "Database Administrator",
    department: "Engineering",
    salary: 88000,
    hireDate: "2019-06-17",
    status: "On Leave",
    imageUrl: "/api/placeholder/150/150",
    address: "890 Maple Ave, Dataville, USA",
    emergencyContact: {
      name: "Robert King",
      relationship: "Husband",
      phone: "(555) 210-9876",
    },
    skills: [
      "SQL",
      "Oracle",
      "PostgreSQL",
      "Database Optimization",
      "Data Modeling",
    ],
    projects: ["Database Performance Tuning", "Data Migration"],
  },
  {
    id: "19",
    firstName: "Daniel",
    lastName: "Scott",
    email: "daniel.s@example.com",
    phone: "(555) 901-2345",
    position: "Network Engineer",
    department: "IT",
    salary: 86000,
    hireDate: "2021-04-12",
    status: "Active",
    imageUrl: "/api/placeholder/150/150",
    address: "234 Spruce Rd, Networkville, USA",
    emergencyContact: {
      name: "Jennifer Scott",
      relationship: "Wife",
      phone: "(555) 109-8765",
    },
    skills: ["Cisco", "Network Security", "Routing", "Switching", "Firewalls"],
    projects: ["Network Expansion", "Security Implementation"],
  },
  {
    id: "20",
    firstName: "Nancy",
    lastName: "Green",
    email: "nancy.g@example.com",
    phone: "(555) 012-3456",
    position: "Accountant",
    department: "Finance",
    salary: 75000,
    hireDate: "2022-01-10",
    status: "Active",
    imageUrl: "/api/placeholder/150/150",
    address: "456 Aspen St, Accountville, USA",
    emergencyContact: {
      name: "George Green",
      relationship: "Father",
      phone: "(555) 098-7654",
    },
    skills: [
      "Accounting",
      "Bookkeeping",
      "Financial Reporting",
      "Tax Preparation",
    ],
    projects: ["Annual Audit", "Financial System Update"],
  },
  {
    id: "21",
    firstName: "Mark",
    lastName: "Adams",
    email: "mark.a@example.com",
    phone: "(555) 123-4567",
    position: "Business Analyst",
    department: "Business",
    salary: 81000,
    hireDate: "2020-08-05",
    status: "Terminated",
    imageUrl: "/api/placeholder/150/150",
    address: "789 Willow St, Businessville, USA",
    emergencyContact: {
      name: "Susan Adams",
      relationship: "Wife",
      phone: "(555) 987-6543",
    },
    skills: [
      "Requirements Gathering",
      "Process Mapping",
      "Data Analysis",
      "Stakeholder Management",
    ],
    projects: ["Process Optimization", "System Requirements"],
  },
];

// export const URL = "http://localhost:8080/api/v1";
export const URL = "https://workoholic-api-x5rg.vercel.app/api/v1";

export const getEmployees = async () => {
  try {
    const response = await axios.get(`${URL}/emp/getAll`);
    console.log(response);
    return [...response.data.employees];
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeeById = async (id) => {
  const response = await axios.get(`${URL}/emp/${id}`);
  console.log(response);
  // if (!employee) {
  //   throw new Error("Employee not found");
  // }

  return response.data;
};

export const createEmployee = async (employeeData) => {
  const token = authToken.getToken();
  const response = await axios.post(`${URL}/emp/create`, employeeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
  s;
};

export const updateEmployee = async (id, employeeData) => {
  const token = authToken.getToken();

  const response = await axios.patch(`${URL}/emp/${id}`, employeeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteEmployee = async (id) => {
  // console.log("from service", id);
  const token = authToken.getToken();

  const response = await axios.delete(`${URL}/emp/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// file upload
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("images", file);

    const response = await axios.post(
      "https://saleem-footwear-api.vercel.app/api/v1/upload-img-test",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return response.data.images;
  } catch (error) {
    console.log(error);
  }
};
