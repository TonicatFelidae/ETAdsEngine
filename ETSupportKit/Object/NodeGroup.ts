import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

enum ShowType {
    Normal = 0,
    Addition = 1
}

interface DisplayObject {
    node: Node;
    index: number;
}

@ccclass('NodeGroup')
export class NodeGroup extends Component {
    @property([Node])
    objectArray: Node[] = [];

    private displayObjects: DisplayObject[] = [];

    start() {
        // Initialize display objects array
        this.displayObjects = this.objectArray.map((node, index) => ({
            node: node,
            index: index
        }));
    }

    update(deltaTime: number) {
        
    }

    /**
     * Show object at specified index and hide others (unless showtype is Addition)
     * @param index - Index of the object to show
     * @param showType - Show type (Normal: hide others, Addition: keep others visible)
     */
    public show(index: number, showType: ShowType = ShowType.Normal): void {
        if (index < 0 || index >= this.displayObjects.length) {
            console.warn(`Invalid index: ${index}`);
            return;
        }

        // Show the target object
        this.displayObjects[index].node.active = true;

        // Hide other objects if showType is not Addition
        if (showType !== ShowType.Addition) {
            for (let i = 0; i < this.displayObjects.length; i++) {
                if (i !== index) {
                    this.displayObjects[i].node.active = false;
                }
            }
        }
    }
}


