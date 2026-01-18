import { _decorator, Component, Node, Color, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LabelEffect')
export class LabelEffect extends Component {
    
    @property(Label)
    public label: Label = null;
    @property(Boolean)
    public enableTextFlash: boolean = true;
    
    @property(Color)
    public flashColor1: Color = new Color(255, 255, 255, 255); // White

    @property(Color)
    public flashColor2: Color = new Color(255, 100, 100, 255); // Red

    @property
    public flashSpeed: number = 1; // Speed of flashing (higher = faster)

    private flashTime: number = 0;

    start() {

    }

    update(deltaTime: number) {
        if (this.enableTextFlash) {
            this.updateTextFlash(deltaTime);
        }
    }

    private updateTextFlash(deltaTime: number) {
        this.flashTime += deltaTime * this.flashSpeed;
        
        // Normalize time between 0 and 1 for color interpolation
        const normalizedTime = (Math.sin(this.flashTime * Math.PI) + 1) / 2;
        
        // Interpolate between two colors
        const flashColor = Color.lerp(new Color(), this.flashColor1, this.flashColor2, normalizedTime);
        this.label.color = flashColor;
    }
}


