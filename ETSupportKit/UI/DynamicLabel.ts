import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DynamicLabel')
export class DynamicLabel extends Component {
    @property({ type: [String], tooltip: 'Array of texts to display' })
    public texts: string[] = [];

    private _label: Label | null = null;

    start() {
        // Get the Label component
        this._label = this.node.getComponent(Label);
    }

    /**
     * Shows the label text with the specified index from texts array
     * @param index Index of the text to show from texts array
     */
    public Show(index: number) {
        if (index < 0 || index >= this.texts.length) {
            return;
        }

        this._label.string = this.texts[index];
    }

    update(deltaTime: number) {
        
    }
}


