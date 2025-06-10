export declare const getTasks: (userId: number) => Promise<any>;
export declare const createTask: (title: string, userId: number) => Promise<any>;
export declare const deleteTask: (taskId: string, userId: number) => Promise<void>;
export declare const updateTask: (taskId: string, title: string, completed: boolean, userId: number) => Promise<void>;
