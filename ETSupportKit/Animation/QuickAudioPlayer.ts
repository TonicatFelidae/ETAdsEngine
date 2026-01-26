import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('QuickAudioPlayer')
export class QuickAudioPlayer extends Component {
    @property({ type: AudioClip, tooltip: 'Audio sound clip to play' })
    public audioSound: AudioClip | null = null;

    private _audioSource: AudioSource | null = null;
    
    start() {
        // Get or add AudioSource component
        this._audioSource = this.node.getComponent(AudioSource);
        if (!this._audioSource) {
            this._audioSource = this.node.addComponent(AudioSource);
        }
    }

    /**
     * Plays the audio sound
     */
    public play() {
        if (this._audioSource && this.audioSound) {
            this._audioSource.clip = this.audioSound;
            this._audioSource.play();
        } else {
            console.warn('QuickAudioPlayer: AudioSource or audioSound not available');
        }
    }

    /**
     * Play sound - animation event friendly method
     * This method can be called from animation events
     */
    public playSound() {
        this.play();
    }

    /**
     * Play sound with volume control
     * @param volume Volume level (0-1)
     */
    public playWithVolume(volume: number = 1.0) {
        if (this._audioSource && this.audioSound) {
            this._audioSource.clip = this.audioSound;
            this._audioSource.volume = Math.max(0, Math.min(1, volume));
            this._audioSource.play();
        } else {
            console.warn('QuickAudioPlayer: AudioSource or audioSound not available');
        }
    }

    update(deltaTime: number) {
        
    }
}


