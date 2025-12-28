// src/services/equipment.ts
import api from "./api";

export interface EquipmentPayload {
  name: string;
  category: string;
}

export const getEquipment = async () => {
  const res = await api.get("/equipment"); // => /api/gear/equipment
  return res.data;
};

export const addEquipment = async (data: EquipmentPayload) => {
  const res = await api.post("/equipment", data);
  return res.data;
};

export const deleteEquipment = async (id: string) => {
  await api.delete(`/equipment/${id}`);
};
