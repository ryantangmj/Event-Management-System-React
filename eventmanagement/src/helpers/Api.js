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
    }).then((response) => {
      if (!response.ok) {
        return response
          .json()
          .then((body) =>
            Promise.reject(new Error(body.error || "Something went wrong"))
          );
      }
      return response.json();
    });
  },
};

export default Api;
