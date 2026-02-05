import { _decorator, Component, Node, sys } from 'cc';
import { super_html_playable } from './SuperHtml/super_html_playable';
const { ccclass, property } = _decorator;
const playableAds = new super_html_playable();
@ccclass('AdsSetup')
export class AdsSetup extends Component {
    @property
    public gameUrl: string = "https://example.com";
    start() {
       playableAds.set_google_play_url(this.gameUrl);
   }
    public touchDownloadButton()
    {
        sys.openURL(this.gameUrl);
        playableAds.download();
    }
}


