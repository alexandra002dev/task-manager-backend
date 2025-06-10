export declare const userCadastro: (name: string, email: string, password: string) => Promise<any>;
export declare const userLogin: (email: string, password: string) => Promise<{
    token: string;
    user: {
        id: any;
        name: any;
        email: any;
    };
}>;
