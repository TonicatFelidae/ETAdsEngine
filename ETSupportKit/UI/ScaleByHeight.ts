import { _decorator, Canvas, Component, Node, screen, view, Widget } from 'cc';
import { ScaleWidget } from './ScaleWidget';
const { ccclass, property } = _decorator;

@ccclass('ScaleByHeight')
export class ScaleByHeight extends Component {
    
    scaleTarget: Node | null = null;

    private canvas: Canvas | null = null;

    start() {
        this.canvas = this.getComponent(Canvas);
        if (!this.canvas) {
            this.canvas = this.node.getComponent(Canvas);
        }
                this.scaleTarget = this.node;
        
        if (this.canvas) {
            this.updateCanvasScale();
            screen.on('window-resize', this.updateCanvasScale, this);
        }
    }

    updateCanvasScale() {
        if (!this.canvas || !this.scaleTarget) return;
        
        const visibleSize = view.getVisibleSize();
        const designSize = view.getDesignResolutionSize();
        const scale = visibleSize.height / designSize.height;
        
        this.scaleTarget.setScale(scale, scale, 1);
        this.refreshWidgets(this.scaleTarget);
    }

    private refreshWidgets(root: Node) {
        const widget = root.getComponent(ScaleWidget);
        if (widget) {
            widget.updateAlignment();
        }

        for (const child of root.children) {
            this.refreshWidgets(child);
        }
    }

    onDestroy() {
        screen.off('window-resize', this.updateCanvasScale, this);
    }
}
