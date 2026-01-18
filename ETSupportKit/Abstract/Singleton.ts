import { Component } from 'cc';

export abstract class Singleton<T extends Component> extends Component {
    public static instance: any = null; // will hold the instance
    protected onLoad(): void {
        this.LoadSingleton();
    }

    protected LoadSingleton() {
        const cls = this.constructor as any;
        if (cls.instance) {
            console.warn(`${cls.name} instance already exists, destroying duplicate.`);
            this.destroy();
            return false;
        }
        cls.instance = this;
        return true;
    }
}