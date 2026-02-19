import { _decorator, Component, view, sys, Widget } from 'cc';
const { ccclass } = _decorator;

@ccclass('SafeArea')
export class SafeArea extends Component {

    start () {

        if (!sys.isMobile || sys.os !== sys.OS.IOS) return;

        const safe = sys.getSafeAreaRect();
        const visible = view.getVisibleSize();
        const design = view.getDesignResolutionSize();

        const scaleX = design.width / visible.width;
        const scaleY = design.height / visible.height;

        const top = (visible.height - (safe.y + safe.height)) * scaleY;
        const bottom = safe.y * scaleY;
        const left = safe.x * scaleX;
        const right = (visible.width - (safe.x + safe.width)) * scaleX;

        const widget = this.getComponent(Widget)!;

        widget.top = top;
        widget.bottom = bottom;
        widget.left = left;
        widget.right = right;

        widget.updateAlignment();
    }
}
