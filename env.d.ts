export {};

declare global {
    namespace NodeJs {
        interface ProcessEnv {
            PRIVATE_KEY: string;
        }
    }
}