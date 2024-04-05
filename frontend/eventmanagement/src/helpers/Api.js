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
      .then((response) => {
        if (!response.ok) {
          throw new Error("Authentication failed");
        }
        return response.json();
      })
      .then((accountData) => {
        // Store the JWT token in localStorage
        localStorage.setItem("jwtToken", accountData.token);
        return accountData;
      })
      .catch((error) => {
        console.error("Authentication error:", error);
        return false;
      });
  },
  createEvent(data) {
    const token = localStorage.getItem("jwtToken");

    return fetch(`${SERVER_PREFIX}/event/createEvent`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
      return response.json();
    });
  },
  getOrgEvents() {
    const token = localStorage.getItem("jwtToken");

    return fetch(`${SERVER_PREFIX}/protected/getOrgEvents`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch organized events");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Request error:", error);
        throw error;
      });
  },
  getRegEvents() {
    const token = localStorage.getItem("jwtToken");

    return fetch(`${SERVER_PREFIX}/protected/getRegEvents`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch organized events");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Request error:", error);
        throw error;
      });
  },
  getAllEvents() {
    const token = localStorage.getItem("jwtToken");

    return fetch(`${SERVER_PREFIX}/event`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch organized events");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Request error:", error);
        throw error;
      });
  },
  getAccount() {
    const token = localStorage.getItem("jwtToken");

    return fetch(`${SERVER_PREFIX}/protected/getAccount`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch account");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Request error:", error);
        throw error;
      });
  },
  updateAccount(accountData) {
    const token = localStorage.getItem("jwtToken");

    return fetch(`${SERVER_PREFIX}/protected/updateAccount`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(accountData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update account");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Request error:", error);
        throw error;
      });
  },
  fetchEventById(id) {
    const token = localStorage.getItem("jwtToken");

    return fetch(`${SERVER_PREFIX}/event/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Request error:", error);
        throw error;
      });
  },
};

export default Api;
