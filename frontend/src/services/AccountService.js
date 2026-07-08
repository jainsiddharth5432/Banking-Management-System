import axios from "axios";

const API_URL = "http://localhost:8080/api/accounts";

export const getAllAccounts = () => {
    return axios.get(API_URL);
};

export const createAccount = (account) => {
    return axios.post(API_URL, account);
};

export const updateAccount = (id, account) => {
    return axios.put(`${API_URL}/${id}`, account);
};

export const deleteAccount = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
export const depositMoney = (id, amount) => {
    return axios.post(
        `http://localhost:8080/api/accounts/${id}/deposit?amount=${amount}`
    );
};
export const withdrawMoney = (id, amount) => {
    return axios.post(
        `${API_URL}/${id}/withdraw?amount=${amount}`
    );
};
export const transferMoney = (fromId, toId, amount) => {
    return axios.post(
        `${API_URL}/transfer?fromId=${fromId}&toId=${toId}&amount=${amount}`
    );
};