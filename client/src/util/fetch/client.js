import Cookies from "js-cookie";

let url = "/api/v1";
if (process.env.NODE_ENV === "development") {
  url = "http://localhost:5000/api/v1";
}

async function client(endpoint, { body, header, ...customConfig } = {}) {
  const token = Cookies.get("token");
  const headers = header ? header : { "content-type": "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  console.log(`${url}/${endpoint}`);
  return await fetch(`${url}/${endpoint}`, config);
}

export default client;
