import { _decorator, Component, Node, Prefab, sys } from 'cc';
import { super_html_playable } from './SuperHtml/super_html_playable';
const { ccclass, property } = _decorator;
const playableAds = new super_html_playable();
@ccclass('AdsSetup')
export class AdsSetup extends Component {
    @property
    public isAutoSetup: boolean = true;
    @property
    public gameUrl: string = "https://example.com";
    @property
    public gameUrlIOS: string = "https://example.com";
    
    start() {
        if (this.isAutoSetup) {
            this.setup(this.gameUrl, this.gameUrlIOS);
        }
    }

    public setup(gameUrl: string, gameUrlIOS: string) {
        playableAds.set_google_play_url(gameUrl);
        playableAds.set_app_store_url(gameUrlIOS);
    }
    
    public touchDownloadButton()
    {
        sys.openURL(this.gameUrl);
        playableAds.download();
    }
    public gameEnd()
    {
        playableAds.game_end();
    }
}


