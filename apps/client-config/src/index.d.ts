import { IPage } from '@nexus/components';
declare module 'client-config' {
    interface Config {
        [key: string]: IPage;
    }
    const config: Config;
    export = config;
}