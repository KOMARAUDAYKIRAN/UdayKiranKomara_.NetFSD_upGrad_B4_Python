const storageService = (() => {

  function getHeaders() {
    const token = authService.getToken();
    return {
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : ""
    };
  }

  return {

    getAll: async (params) => {
      const query = new URLSearchParams(params).toString();

      const res = await fetch(`${CONFIG.API_BASE_URL}/employees?${query}`, {
        headers: getHeaders()
      });

      return res.json();
    },

    getById: async (id) => {
      const res = await fetch(`${CONFIG.API_BASE_URL}/employees/${id}`, {
        headers: getHeaders()
      });
      return res.json();
    },

    add: async (data) => {
      const res = await fetch(`${CONFIG.API_BASE_URL}/employees`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data)
      });

      return res.json();
    },

    update: async (id, data) => {
      const res = await fetch(`${CONFIG.API_BASE_URL}/employees/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data)
      });

      return res.json();
    },

    remove: async (id) => {
      await fetch(`${CONFIG.API_BASE_URL}/employees/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
    }

  };

})();