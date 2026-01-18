import { _decorator, Component, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpriteSwapper')
export class SpriteSwapper extends Component {
    @property(Sprite)
    targetSprite: Sprite = null;

    @property([SpriteFrame])
    spriteFrames: SpriteFrame[] = [];

    start() {
        if (!this.targetSprite) {
            this.targetSprite = this.getComponent(Sprite);
        }
    }

    public show(index: number) {
        if (!this.targetSprite) {
            console.warn('SpriteSwapper: targetSprite is not assigned');
            return;
        }

        if (index < 0 || index >= this.spriteFrames.length) {
            console.warn(`SpriteSwapper: index ${index} is out of bounds (0-${this.spriteFrames.length - 1})`);
            return;
        }

        if (!this.spriteFrames[index]) {
            console.warn(`SpriteSwapper: spriteFrame at index ${index} is null`);
            return;
        }

        this.targetSprite.spriteFrame = this.spriteFrames[index];
    }
}


