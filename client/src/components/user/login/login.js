import Cookies from "js-cookie";

const emailSignIn = async ({ email, password }) => {
  try {
    console.log(JSON.stringify({ email, password }));
    // Default options are marked with *
    const response = await fetch("http://localhost:5000/api/v1/user/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify({ email, password }) // body data type must match "Content-Type" header
    });
    if (response.status < 399) {
      const res = await response.json();
      await Cookies.set("token", res.token);
      return { status: true, data: res };
    } else {
      return { status: false, msg: "Failed to Login" };
    }
  } catch (error) {
    console.log(error);
    return { status: false, error };
  }
};

export default emailSignIn;
