import { _decorator, Component, RenderTexture, Camera, screen, Sprite, SpriteFrame, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RenderTextureFixer')
export class RenderTextureFixed extends Component {
    @property(RenderTexture)
    renderTexture: RenderTexture | null = null;

    @property(Camera)
    targetCamera: Camera | null = null;
    start() {
        if (!this.renderTexture || !this.targetCamera) {
            console.error('[RenderTextureFixed] Missing RenderTexture or Camera reference!');
            return;
        }

        this._setupRenderTexture();
    }

    private _setupRenderTexture() {
        const size = screen.windowSize;

        this.renderTexture.reset({
            width: size.width,
            height: size.height,
        });

    }
}