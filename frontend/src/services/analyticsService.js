const API_URL = "http://localhost:5000/api/analytics";

export const getClassAverage = async (classId) => {
  const res = await fetch(`${API_URL}/class/${classId}/average`);
  return res.json();
};

export const getClassAttendance = async (classId) => {
  const res = await fetch(`${API_URL}/class/${classId}/attendance`);
  return res.json();
};

export const getTopStudents = async (classId) => {
  const res = await fetch(`${API_URL}/class/${classId}/top`);
  return res.json();
};

export const getWeakStudents = async (classId) => {
  const res = await fetch(`${API_URL}/class/${classId}/weak`);
  return res.json();
};
