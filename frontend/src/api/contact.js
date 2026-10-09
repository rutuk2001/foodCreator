import api from "./axios";

export const submitContact = (payload) => api.post("/contact", payload);
export const getContacts = () => api.get("/contact");
