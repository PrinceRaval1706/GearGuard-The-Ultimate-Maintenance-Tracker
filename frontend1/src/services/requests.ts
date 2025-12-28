import api from "./api";

export interface RequestPayload {
  title: string;
  equipment: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status?: "Open" | "In Progress" | "Completed";
}

export const getRequests = async () => {
  const res = await api.get("/requests");
  return res.data;
};

export const addRequest = async (data: RequestPayload) => {
  const res = await api.post("/requests", data);
  return res.data;
};

export const updateRequest = async (id: string, status: string) => {
  const res = await api.put(`/requests/${id}`, { status });
  return res.data;
};

export const deleteRequest = async (id: string) => {
  const res = await api.delete(`/requests/${id}`);
  return res.data;
};
