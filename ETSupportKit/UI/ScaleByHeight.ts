import { _decorator, Canvas, Component, director, screen, view } from 'cc';
const { ccclass } = _decorator;

@ccclass('ScaleByHeight')
export class ScaleByHeight extends Component {
    private canvas: Canvas = null;

    start() {
        this.canvas = this.getComponent(Canvas);
        if (!this.canvas) {
            this.canvas = this.node.getComponent(Canvas);
        }
        
        if (this.canvas) {
            this.updateCanvasScale();
            screen.on('window-resize', this.updateCanvasScale, this);
        }
    }

    updateCanvasScale() {
        if (!this.canvas) return;
        
        const visibleSize = view.getVisibleSize();
        const designSize = view.getDesignResolutionSize();
        const scale = visibleSize.height / designSize.height;
        
        this.node.setScale(scale, scale, 1);
    }

    onDestroy() {
        screen.off('window-resize', this.updateCanvasScale, this);
    }
}
