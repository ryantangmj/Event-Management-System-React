const SERVER_PREFIX =
  "http://localhost:8080/EventManagementSystem-war/webresources";

const Api = {
  createAccount(data) {
    return fetch(`${SERVER_PREFIX}/account`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) =>
        response.json().then((body) => ({
          ok: response.ok,
          body,
        }))
      )
      .then(({ ok, body }) => {
        if (ok) {
          return body; // Successful response body
        } else {
          throw new Error(body.error || "Something went wrong"); // Error handling
        }
      });
  },
  authenticateAccount(data) {
    return fetch(`${SERVER_PREFIX}/account/authenticateAccount`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => data.authenticated)
      .catch((error) => {
        console.error("Authentication error:", error);
        return false;
      });
  },
};

export default Api;
