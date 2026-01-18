import { _decorator, Component, Node, view, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LogoScaler')
export class LogoScaler extends Component {
    @property({ tooltip: "Screen height where scaling starts" })
    minHeight: number = 600;

    @property({ tooltip: "Screen height where logo is full size" })
    maxHeight: number = 1280;

    @property({ tooltip: "Smallest scale value" })
    minScale: number = 0.6;

    @property({ tooltip: "Normal scale value" })
    maxScale: number = 1.0;

    update() {  
        const frameSize = view.getFrameSize();
        const currentHeight = frameSize.height;

        // Calculate scale factor between 0 and 1
        let t = (currentHeight - this.minHeight) / (this.maxHeight - this.minHeight);
        t = Math.max(0, Math.min(1, t)); // Clamp value

        const newScale = this.minScale + (this.maxScale - this.minScale) * t;
        this.node.setScale(new Vec3(newScale, newScale, newScale));
    }
}
