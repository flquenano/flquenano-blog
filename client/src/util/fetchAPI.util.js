import Cookies from "js-cookie";

const apiHost = "http://localhost:5000/api/v1";

async function request(
  url,
  secured = false,
  data = "",
  method = "GET",
  params = ""
) {
  const myHeaders = new Headers();
  Cookies.set(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWEyZDBkYTc1MDM3MTc3YzY1OWZkMSIsImlhdCI6MTU4ODgwNzIxNywiZXhwIjoxNTg5NDEyMDE3fQ.Xp3ydF5-ksMa2Vhqs-JNIVEai10tlRBSAQxyFb6eNQ8"
  );
  if (secured) {
    myHeaders.append("Authorization", `Bearer ${Cookies.get("token")}`);
  }

  let options = {
    method,
    mode: "cors",
    cache: "no-cache",
    headers: myHeaders
  };

  if (data) {
    options = {
      ...options,
      body: data
    };
  }

  if (params) {
    if (method === "GET") {
      if (method === "GET") {
        url += "?" + objToQueryString(params);
      } else {
        options.body = JSON.stringify(params);
      }
    }
  }

  const response = await fetch(apiHost + url, options);

  const result = await response.json();
  return result;
}

function fetchError(status) {}

// Transform an Object to a Query string
const objToQueryString = (obj) =>
  Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");

const get = (url, secured) => request(url, secured);
const create = (url, secured, data, params) =>
  request(url, secured, data, "POST", params);
const patch = (url, secured, data) => request(url, secured, data, "PATCH");
const remove = (url) => request(url, "DELETE");

export default {
  get,
  create,
  patch,
  remove
};
