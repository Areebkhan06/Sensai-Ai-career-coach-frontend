// formFields.js

export const EXPERIENCE_FIELDS = [
  { name: "title", label: "Job Title / Position", type: "text" },
  { name: "company", label: "Company Name", type: "text" },
  { name: "startDate", label: "Start Date", type: "month" },
  { name: "endDate", label: "End Date", type: "month" },
  { name: "description", label: "Description", type: "textarea" },
];

export const EDUCATION_FIELDS = [
  { name: "course", label: "Course / Degree", type: "text" },
  { name: "school", label: "School / College", type: "text" },
  { name: "startDate", label: "Start Year", type: "month" },
  { name: "endDate", label: "End Year", type: "month" },
  { name: "description", label: "Description", type: "textarea" },
];

export const PROJECT_FIELDS = [
  { name: "title", label: "Project Title", type: "text" },
  { name: "tech", label: "Technologies Used", type: "text" },
  { name: "description", label: "Project Description", type: "textarea" },
];

// Optional: export all together in one object
export const FORM_FIELDS = {
  experience: EXPERIENCE_FIELDS,
  education: EDUCATION_FIELDS,
  projects: PROJECT_FIELDS,
};
