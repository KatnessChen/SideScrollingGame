const gameStart = {
  key: 'gameStart',
  preload() {
    // 遠景到近景
    this.load.image('bg1', 'assets/bg/plx-1.png');
    this.load.image('bg2', 'assets/bg/plx-2.png');
    this.load.image('bg3', 'assets/bg/plx-3.png');
    this.load.image('bg4', 'assets/bg/plx-4.png');
    this.load.image('bg5', 'assets/bg/plx-5.png');
    this.load.image('bg6', 'assets/bg/plx-6.png');
    this.load.image('bg7', 'assets/bg/plx-7.png');
    this.load.image('bg8', 'assets/bg/plx-8.png');
    this.load.image('bg9', 'assets/bg/plx-9.png');
    this.load.image('bg10', 'assets/bg/plx-10.png');
    this.load.image('title', 'assets/ui/txt-title.png');
    this.load.image('playBtn', 'assets/ui/btn-press-start.png');
    this.load.image('logo', "assets/ui/player-end.png");
  },
  create() {
    this.bg1 = this.add.tileSprite(400, 300, 1300, 950, 'bg1');
    this.bg2 = this.add.tileSprite(400, 300, 1300, 950, 'bg2');
    this.bg3 = this.add.tileSprite(400, 300, 1300, 950, 'bg3');
    this.bg4 = this.add.tileSprite(400, 300, 1300, 950, 'bg4');
    this.bg5 = this.add.tileSprite(400, 300, 1300, 950, 'bg5');
    this.bg6 = this.add.tileSprite(400, 300, 1300, 950, 'bg6');
    this.bg7 = this.add.tileSprite(400, 300, 1300, 950, 'bg7');
    this.bg8 = this.add.tileSprite(400, 300, 1300, 950, 'bg8');
    this.bg9 = this.add.tileSprite(400, 300, 1300, 950, 'bg9');
    this.bg10 = this.add.tileSprite(400, 300, 1300, 950, 'bg10');

    let title = this.add.image(cw / 2, ch / 2 - 30, 'title');
    title.setScale(0.6);

    let playBtn = this.add.image(cw / 2, ch / 2 + 100, 'playBtn');
    playBtn.setScale(0.5);
    playBtn.setInteractive();
    playBtn.on('pointerdown', () => this.scene.start('gamePlay'))

    let logo = this.add.image(cw / 2, ch / 2 + 220, 'logo');
    logo.setScale(0.4);
  },
}