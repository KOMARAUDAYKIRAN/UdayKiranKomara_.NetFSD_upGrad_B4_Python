let tasks = [];

/* ---------------- CALLBACK VERSION ---------------- */
export const addTaskCallback = (task, callback) => {
    setTimeout(() => {
        tasks.push(task);
        callback(`Task added: ${task}`);
    }, 500);
};

/* ---------------- PROMISE VERSION ---------------- */
export const addTaskPromise = (task) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            tasks.push(task);
            resolve(` Task added: ${task}`);
        }, 500);
    });
};

/* ---------------- ASYNC/AWAIT FUNCTIONS ---------------- */
export const addTask = async (task) => {
    const msg = await addTaskPromise(task);
    return msg;
};

export const deleteTask = async (task) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            tasks = tasks.filter(t => t !== task);
            resolve(`Task deleted: ${task}`);
        }, 500);
    });
};

export const listTasks = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tasks);
        }, 500);
    });
};