import axios from "axios";

const API_URL = "http://localhost:8080/api/accounts";

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const getAllAccounts = () => {
    return api.get("");
};

export const createAccount = (account) => {
    return api.post("", account);
};

export const updateAccount = (id, account) => {
    return api.put(`/${id}`, account);
};

export const deleteAccount = (id) => {
    return api.delete(`/${id}`);
};

export const depositMoney = (id, amount) => {
    return api.post(`/${id}/deposit?amount=${amount}`);
};

export const withdrawMoney = (id, amount) => {
    return api.post(`/${id}/withdraw?amount=${amount}`);
};

export const transferMoney = (fromId, toId, amount) => {
    return api.post(`/transfer?fromId=${fromId}&toId=${toId}&amount=${amount}`);
};
export const getMyAccount = () => {
    return api.get("/my-account");
};
export const getMyTransactions = () => {
    return api.get("/transactions");
};