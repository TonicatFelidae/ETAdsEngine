import { _decorator, Component, AudioSource, AudioClip, Prefab, Vec3, instantiate } from 'cc';
import { Singleton } from './Abstract/Singleton';
const { ccclass, property } = _decorator;

export enum SoundType {
    BG = 0,   // Background music
    EF = 1,   // Sound effects
    UI = 2    // UI sounds
}

@ccclass('SoundGeneral')
export class SoundGeneral extends Singleton<SoundGeneral> {
    // Multiple AudioSources, one per type
    @property([AudioSource])
    private audioSources: AudioSource[] = [];

    // Array of arrays: audioClips[type][clipId]
    @property([AudioClip])
    private bgClips: AudioClip[] = [];
    @property([AudioClip])
    private efClips: AudioClip[] = [];
    @property([AudioClip])
    private uiClips: AudioClip[] = [];

    // Prefab for 3D sound effect
    @property(Prefab)
    private _pp_effect3D: Prefab = null;

    onLoad() {
        super.onLoad();

        // Ensure we have AudioSources for each type
        const typesCount = Object.keys(SoundType).length / 2; // enum has keys + values
        for (let i = 0; i < typesCount; i++) {
            if (!this.audioSources[i]) {
                this.audioSources[i] = this.addComponent(AudioSource);
            }
        }
    }

    /**
     * Play a sound clip
     * @param type BG / EF / UI (enum)
     * @param clipId index of clip in the array for that type
     */
    public Play(type: SoundType, clipId: number, volumn: number = 1, loop: boolean = false) {
        let clip = this.GetClip(type,clipId);
        this.audioSources[type].clip = clip;
        this.audioSources[type].volume = volumn;
        this.audioSources[type].loop = loop;
        this.audioSources[type].stop();
        this.audioSources[type].play();
    }
    public PlayRandom(type: SoundType, min: number, max: number) {
        if (max <= min) {
            console.warn(`SoundGeneral: Invalid range for Play: min=${min}, max=${max}`);
            return;
        }
        const range = max - min;
        const randomIndex = min + Math.floor(Math.random() * range);
        this.Play(type, randomIndex);
    }
    private GetClip(type: SoundType, clipId: number): AudioClip | null {
        let clips: AudioClip[] | null = null;
        
        switch (type) {
            case SoundType.BG: clips = this.bgClips; break;
            case SoundType.EF: clips = this.efClips; break;
            case SoundType.UI: clips = this.uiClips; break;
        }
    
        // Validate
        if (!clips || clipId < 0 || clipId >= clips.length) {
            console.warn(`SoundGeneral: invalid clip access, type=${type}, clipId=${clipId}`);
            return null;
        }
    
        return clips[clipId];
    }
    /**
     * Stop audio by type
     * @param type BG / EF / UI
     */
    public Stop(type: SoundType) {
        if (this.audioSources[type]) {
            this.audioSources[type].stop();
        }
    }
    public PlayEF3D(type: SoundType, clipId: number, position: Vec3 = null) {
        if (!this._pp_effect3D) {
            console.warn('SoundGeneral: No 3D sound prefab assigned.');
            return;
        }
        let clip = this.GetClip(type,clipId);
        if (!clip) {
            console.warn('SoundGeneral: No AudioClip provided for PlayEF3D.');
            return;
        }

        // Create instance of the sound effect prefab
        const effectNode = instantiate(this._pp_effect3D);

        // Set position (default to SoundGeneral node position)
        effectNode.setWorldPosition(position ?? this.node.getWorldPosition());

        // Attach to the same parent as SoundGeneral to keep hierarchy clean
        this.node.parent?.addChild(effectNode);

        // Get AudioSource from the prefab
        const audioSource = effectNode.getComponent(AudioSource);
        if (!audioSource) {
            console.warn('SoundGeneral: Prefab has no AudioSource component.');
            effectNode.destroy();
            return;
        }

        // Assign and play
        audioSource.clip = clip;
        audioSource.play();

        // Automatically destroy when sound finishes
        const duration = clip.getDuration();
        setTimeout(() => {
            if (effectNode && effectNode.isValid) {
                effectNode.destroy();
            }
        }, duration * 1000);
    }
    public PlayRandomEF3D(min: number, max: number, position: Vec3 = null) {
        if (max <= min) {
            console.warn(`SoundGeneral: Invalid range for PlayRandomEF3D: min=${min}, max=${max}`);
            return;
        }
        const range = max - min;
        const randomIndex = min + Math.floor(Math.random() * range);
        this.PlayEF3D(SoundType.EF, randomIndex, position);
    }
}