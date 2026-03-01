import { _decorator, Component, view, Widget } from 'cc';
const { ccclass } = _decorator;

@ccclass('ScaleWidget')
export class ScaleWidget extends Component {
	updateAlignment() {
		const visibleSize = view.getVisibleSize();
		const widget = this.getComponent(Widget);
		if (!widget) return;
		if (visibleSize.width > visibleSize.height) {
			(widget as any).isAlignHorizontalCenter = true;
			(widget as any).isAlignLeft = false;
			(widget as any).isAlignRight = false;
		}
        else
        {
			(widget as any).isAlignHorizontalCenter = false;
			(widget as any).isAlignLeft = true;
			(widget as any).isAlignRight = true;

        }

		widget.updateAlignment();

	}
}


