import { _decorator, Component, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpriteAnimator')
export class SpriteAnimator extends Component {
    @property(Sprite)
    targetSprite: Sprite = null;

    @property([SpriteFrame])
    spriteFrames: SpriteFrame[] = [];

    @property
    speedInterval: number = 0.1;

    @property
    isIncreasing: boolean = true;

    @property
    isLoop: boolean = true;

    @property
    delayBeforeStart: number = 0;

    private currentFrameIndex: number = 0;
    private elapsedTime: number = 0;
    private isFinished: boolean = false;
    private delayTimer: number = 0;
    private hasStarted: boolean = false;

    start() {
        if (!this.targetSprite) {
            this.targetSprite = this.getComponent(Sprite);
        }

        if (this.spriteFrames.length > 0 && this.targetSprite) {
            this.currentFrameIndex = this.isIncreasing ? 0 : this.spriteFrames.length - 1;
            this.targetSprite.spriteFrame = this.spriteFrames[this.currentFrameIndex];
        }

        this.delayTimer = 0;
        this.hasStarted = false;
    }

    update(deltaTime: number) {
        if (this.spriteFrames.length === 0 || !this.targetSprite || this.isFinished) {
            return;
        }

        // Handle delay before starting animation
        if (!this.hasStarted) {
            this.delayTimer += deltaTime;
            if (this.delayTimer >= this.delayBeforeStart) {
                this.hasStarted = true;
            } else {
                return;
            }
        }

        this.elapsedTime += deltaTime;

        if (this.elapsedTime >= this.speedInterval) {
            this.elapsedTime = 0;
            this.updateFrame();
        }
    }

    private updateFrame() {
        if (this.isIncreasing) {
            this.currentFrameIndex++;
            if (this.currentFrameIndex >= this.spriteFrames.length) {
                if (this.isLoop) {
                    this.currentFrameIndex = 0;
                } else {
                    this.currentFrameIndex = this.spriteFrames.length - 1;
                    this.isFinished = true;
                    return;
                }
            }
        } else {
            this.currentFrameIndex--;
            if (this.currentFrameIndex < 0) {
                if (this.isLoop) {
                    this.currentFrameIndex = this.spriteFrames.length - 1;
                } else {
                    this.currentFrameIndex = 0;
                    this.isFinished = true;
                    return;
                }
            }
        }

        this.targetSprite.spriteFrame = this.spriteFrames[this.currentFrameIndex];
    }

    public play() {
        this.enabled = true;
        this.isFinished = false;
        this.elapsedTime = 0;
        this.delayTimer = 0;
        this.hasStarted = false;
    }

    public stop() {
        this.enabled = false;
    }

    public reset() {
        this.currentFrameIndex = this.isIncreasing ? 0 : this.spriteFrames.length - 1;
        if (this.spriteFrames.length > 0 && this.targetSprite) {
            this.targetSprite.spriteFrame = this.spriteFrames[this.currentFrameIndex];
        }
        this.elapsedTime = 0;
        this.isFinished = false;
        this.delayTimer = 0;
        this.hasStarted = false;
    }
}


