import { _decorator, Component, Node, Label, tween, Vec3 } from 'cc';
import { SoundGeneral, SoundType } from '../ETSupportKit/SoundGeneral';
const { ccclass, property } = _decorator;

@ccclass('FlyingRewardTarget')
export class FlyingRewardTarget extends Component {
    @property(Label)
    valueLabel: Label = null;  // UI label to display the current value

    private _value: number = 0;

    /**
     * Called when a coin prefab reaches this target.
     * Increments the value and updates the label.
     */
    public OnCoinArrive(rewardPerCoin: number) {
        this._value += rewardPerCoin;
        this.UpdateLabel();

        // Small pop animation for feedback
        this.PlayPopAnimation();
        SoundGeneral.instance.Play(SoundType.UI, 2);

        //console.log('Target received reward:', rewardPerCoin, 'Total:', this._value);
    }

    private UpdateLabel() {
        if (this.valueLabel) {
            this.valueLabel.string = `${this._value}`;
        }
    }

    private PlayPopAnimation() {
        if (!this.node) return;

        // Scale up slightly then back to normal
        this.node.setScale(new Vec3(1, 1, 1));
        tween(this.node)
            .to(0.1, { scale: new Vec3(1.2, 1.2, 1) })
            .to(0.1, { scale: new Vec3(1, 1, 1) })
            .start();
    }

    /** Optionally reset value */
    public ResetValue() {
        this._value = 0;
        this.UpdateLabel();
    }

    /** Get current value if needed */
    public GetValue(): number {
        return this._value;
    }
}
