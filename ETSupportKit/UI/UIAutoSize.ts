import { _decorator, Component, Node, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIAutoSize')
export class UIAutoSize extends Component {

    @property
    factor = 1.0;

    onEnable() {
        view.on('design-resolution-changed', this.updateSize, this);
        this.updateSize();
    }

    onDisable() {
        view.off('design-resolution-changed', this.updateSize, this);
    }

    updateSize() {
        const width = this.node.getComponent(UITransform).width;
        this.node.getComponent(UITransform).height = width * this.factor;
    }
}