const dashboardService = (() => {

    async function getSummary() {

        const res = await fetch(`${CONFIG.API_BASE_URL}/employees/dashboard`, {
            headers: {
                "Authorization": `Bearer ${authService.getToken()}`
            }
        });

        return await res.json();
    }

    return {
        getSummary
    };

})();