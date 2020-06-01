import client from "./client";

const post = (endpoint, body) => client(endpoint, { method: "POST", body });
const get = (endpoint) => client(endpoint, { method: "GET" });
const patch = (endpoint, body) => client(endpoint, { method: "PATCH", body });
const remove = (endpoint) => client(endpoint, { method: "DELETE" });

export { post, get, patch, remove };
