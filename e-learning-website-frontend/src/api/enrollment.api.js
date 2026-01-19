const API_URL = import.meta.env.VITE_API_URL;

export const getMyEnrollments = async (token) => {
  const res = await fetch(`${API_URL}/api/enrollments/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch enrollments");
  }

  return res.json();
};
