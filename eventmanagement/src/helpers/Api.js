const SERVER_PREFIX = "http://localhost:8080/CRM-war/webresources";

const Api = {
  createAccount(data) {
    return fetch(`${SERVER_PREFIX}/account`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

export default Api;
