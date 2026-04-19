const employeeService = (() => {

    // GET ALL (with pagination + filters)
    async function getAll(params) {
        return await storageService.getAll(params);
    }

    // GET BY ID
    async function getById(id) {
        return await storageService.getById(id);
    }

    // ADD
    async function add(data) {
        return await storageService.add(data);
    }

    // UPDATE
    async function update(id, data) {
        return await storageService.update(id, data);
    }

    // DELETE
    async function remove(id) {
        return await storageService.remove(id);
    }

    return {
        getAll,
        getById,
        add,
        update,
        remove
    };

})();