import { _decorator, Component, Node } from 'cc';
import { Singleton } from '../Abstract/Singleton';
const { ccclass, property } = _decorator;

@ccclass('EventGeneral')
export class EventGeneral extends Singleton<EventGeneral> {

    public timer = 0;
    @property({ tooltip: 'Time show endUI' }) public timeEndUI: number = 20;
    @property({ tooltip: 'Additional ime show endUI after first click' }) public timeEndUIPlus: number = 30;
    _isFirstDowned: boolean = false;
    private _onFirstClickCallback: (() => void) | null = null;
    private _onTimeOutCallback: (() => void) | null = null;
    private _isTimedOut: boolean = false;

    
    start() {
        this.timer = 0;


    }

    /**
     * Set up a callback for the first click event
     * @param callback Function to be called on first click
     */
    public setupOnFirstClick(callback: () => void) {
        this._onFirstClickCallback = callback;
    }

    /**
     * Set up a callback for the timeout event
     * @param callback Function to be called on timeout
     */
    public setupOnTimeOut(callback: () => void) {
        this._onTimeOutCallback = callback;
    }

    update(deltaTime: number) {
        this.timer += deltaTime;
        
        // Check for timeout and invoke callback
        if (!this._isTimedOut && this.timer >= this.timeEndUI) {
            this._isTimedOut = true;
            if (this._onTimeOutCallback) {
                this._onTimeOutCallback();
            }
        }
    }

    onFirstClick()
    {
        if (!this._isFirstDowned)
        {
            this._isFirstDowned = true;
            this.timeEndUI = this.timer + this.timeEndUIPlus; // extend time
            
            // Invoke the first click callback if it's set
            if (this._onFirstClickCallback) {
                this._onFirstClickCallback();
            }
        }

    }
    public get isTimeOut(): boolean {
        return this._isTimedOut;
    }
    
    public set isTimeOut(value: boolean) {
        this._isTimedOut = value;
    }
}

