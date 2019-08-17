const gamePlay = {
  key: 'gamePlay',
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
    this.load.image('footer', 'assets/bg/footer.png');
    
    this.load.image('food1', 'assets/advantage/apple.png');
    this.load.image('food2', 'assets/advantage/cookie.png');
    this.load.image('food3', 'assets/advantage/egg.png');
    this.load.image('food4', 'assets/advantage/pizza.png');
    this.load.image('gameover', 'assets/ui/txt-game-over.png');
    this.load.image('tryAgainBtn', 'assets/ui/btn-try-again.png');
    this.load.image('congratulations', 'assets/ui/txt-congratulations.png');
    this.load.image('playAgainBtn', 'assets/ui/btn-play-again.png');
    this.load.spritesheet('user', 'assets/player/player.png', {frameWidth: 144, frameHeight: 120});
    
    this.iskeyJump = true; // 是否可以跳躍
    this.foodArr = [];     // 存放所有食物實體
    this.foodArr2 = [];    // 存放所有食物實體2
    this.foodIdx = 0;      // 食物索引
    this.foodIdx2 = 1;     // 食物索引2
    this.gameStop = false; // 控制遊戲是否停止
    this.bgSpeed = 1.3;    // 速度
    this.TimeStep = 30;    // 遊戲時間
    this.score = 0;        // 得分
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
    this.footer = this.add.tileSprite(400, 580, 800, 50, 'footer');

    //設定人物位置與加入物理效果
    this.player = this.physics.add.sprite(150, 150, 'user');
    this.player.setCollideWorldBounds(true); //角色邊界限制
    this.player.setBounce(1); //設定彈跳值
    this.player.setScale(scale); //設定顯示大小
    
    //設定文字
    this.timeText = this.add.text(25, 570, `TIME: ${this.TimeStep}`, { fontSize: '22px', fill: '#FFFFFF' })
    this.scoreText = this.add.text(660, 570, `SCORE: ${this.score}`, { fontSize: '22px', fill: '#FFFFFF' })

    // 遊戲計時器
    let gametime = setInterval(() => {
      this.TimeStep--;
      this.timeText.setText(`TIME: ${this.TimeStep}`);
      this.scoreText.setText(`SCORE: ${this.score}`);
      if (this.TimeStep < 20 && this.TimeStep > 10 ) {
        this.bgSpeed = 1.6;
      } else if (this.TimeStep < 10 && this.TimeStep > 0 ) {
        this.bgSpeed = 3;
      } else if (this.TimeStep <= 0) {
        this.gameStop = true;
        clearInterval(gametime);
        let congratulations = this.add.image(cw / 2, ch / 2 - 50, 'congratulations');
        congratulations.setScale(0.8);
        let playAgainBtn = this.add.image(cw / 2, ch / 2 + 40, 'playAgainBtn');
        playAgainBtn.setScale(0.6);
        playAgainBtn.setInteractive();
        playAgainBtn.on('pointerdown', () => this.scene.start('gameStart'));
      }
    }, 1000);

    
    // 動畫影格
    keyFrame(this);

    // 加入物理效果
    const addPhysics = GameObject =>{
      this.physics.add.existing(GameObject);
      GameObject.body.immovable = true;
      GameObject.body.moves = false;
    }

    // 食物的座標資訊
    const foodPos = [
      { name: 'food1', x: cw + 200, y: 320},
      { name: 'food2', x: cw + 200, y: ch / 2 - 30 },
      { name: 'food3', x: cw + 200, y: 70},
      { name: 'food4', x: cw + 200, y: 90},
    ]

    // 吃到食物後加分
    const hittest = () => { this.score += 1; }
        
    // 產生食物
    for (let i = 0; i < 10; i++) {
      let BoolIdx = getRandom(3, 0);
      let BoolIdx2 = getRandom(3, 0);
      this['food'+ i] = this.add.tileSprite(foodPos[BoolIdx].x, foodPos[BoolIdx].y, 100, 100, foodPos[BoolIdx].name);
      this['foodB'+ i] = this.add.tileSprite(foodPos[BoolIdx2].x, foodPos[BoolIdx2].y, 100, 100, foodPos[BoolIdx2].name);
      this.foodArr.push(this['food'+ i]);
      this.foodArr2.push(this['foodB'+ i]);
      addPhysics(this['food'+i]);
      addPhysics(this['foodB'+i]);
      this.physics.add.collider(this.player, this['food'+i], hittest);
      this.physics.add.collider(this.player, this['foodB'+i], hittest);
    }

    // 地板加入物理效果
    addPhysics(this.footer);

    // 地板跟人物碰撞綁定
    this.physics.add.collider(this.player, this.footer);

    //播放動畫
    this.player.anims.play('run', true);
  },
  update() {
    
    if(this.gameStop) return;

    this.bg1.tilePositionX += 1 * this.bgSpeed;
    this.bg2.tilePositionX += 1.2 * this.bgSpeed;
    this.bg3.tilePositionX += 1.4 * this.bgSpeed;
    this.bg4.tilePositionX += 1.6 * this.bgSpeed;
    this.bg5.tilePositionX += 1.8 * this.bgSpeed;
    this.bg6.tilePositionX += 2 * this.bgSpeed;
    this.bg7.tilePositionX += 2.2 * this.bgSpeed;
    this.bg8.tilePositionX += 2.4 * this.bgSpeed;
    this.bg9.tilePositionX += 2.6 * this.bgSpeed;
    this.bg10.tilePositionX += 2.8 * this.bgSpeed;
    this.footer.tilePositionX += 3 * this.bgSpeed;

    this.foodArr[this.foodIdx].x -= 3 * this.bgSpeed;

    if(this.TimeStep < 10 && this.TimeStep > 0 ){
      this.foodArr2[this.foodIdx2].x -= 3 * this.bgSpeed;
    }

    // 檢測食物是否超出邊界然後返回
    for (let i = 0; i < this.foodArr.length; i++) {
      if(this.foodArr[i].x <= -100){
        this.foodArr[i].x = cw + 200;
        this.foodIdx = getRandom(this.foodArr.length - 1, 0);
      }
      if(this.foodArr2[i].x <= -100){
        this.foodArr2[i].x = cw + getRandom(400, 200);
        this.foodIdx2 = getRandom(this.foodArr2.length - 1, 0);
      }
    }

     // 啟動鍵盤事件
    let cursors = this.input.keyboard.createCursorKeys();
    if (cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.player.setSize(144, 120, 0); //碰撞邊界
      this.player.anims.play('speed', true);
      this.player.flipX = false;
    } else if (cursors.left.isDown) {
      this.player.setVelocityX(-300);
      this.player.anims.play('speed', true);
      this.player.flipX = true;
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('run', true);
      this.player.setSize(110, 90, 0); //碰撞邊界
      this.player.flipX = false;
    }
    if (cursors.up.isDown) {
      if (this.iskeyJump) {
        this.iskeyJump = false;
        this.player.setVelocityY(-300);
      }
    } else {
      this.iskeyJump = true;
    }
  }
}