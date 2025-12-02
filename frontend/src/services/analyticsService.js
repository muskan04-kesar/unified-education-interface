const API_URL = "http://localhost:5000/api/analytics";

export const getClassAverage = async (classId) => {
  const res = await fetch(`${API_URL}/class/${classId}/average`);
  return res.json();
};

export const getClassAttendance = async (classId) => {
  const res = await fetch(`${API_URL}/class/${classId}/attendance`);
  return res.json();
};

export async function getTopStudents(classId) {
  const res = await fetch(`/api/analytics/class/${classId}/top`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function getWeakStudents(classId) {
  const res = await fetch(`/api/analytics/class/${classId}/weak`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}
