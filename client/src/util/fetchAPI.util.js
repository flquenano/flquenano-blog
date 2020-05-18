import Cookies from "js-cookie";

const apiHost = "http://localhost:5000/api/v1";

async function request(
  url,
  secured = false,
  data = "",
  method = "GET",
  params = "",
  appJson = false
) {
  const myHeaders = new Headers();
  if (secured) {
    myHeaders.append("Authorization", `Bearer ${Cookies.get("token")}`);
  }

  if (appJson) {
    myHeaders.append("Content-Type", "application/json");
  }

  console.log(myHeaders);
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
  const code = response.status;
  let result = await response.json();
  result = {
    ...result,
    code
  };
  return result;
}

function fetchError(status) {}

// Transform an Object to a Query string
const objToQueryString = (obj) =>
  Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");

const get = (url, secured) => request(url, secured);
const create = (url, secured, data, params, appJson) =>
  request(url, secured, data, "POST", params, appJson);
const patch = (url, secured, data) => request(url, secured, data, "PATCH");
const remove = (url, secured) => request(url, secured, "", "DELETE");

export default {
  get,
  create,
  patch,
  remove
};
