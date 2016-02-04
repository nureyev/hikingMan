Enemy = function(game) {

  //call all enemies that will come in game
  this.game = game;
  this.bird = null;
  this.stump = null;
  this.boulder = null;
  this.bunny = null;
  this.deer = null;
  this.wolf = null;
  this.fire = null;
  this.pinkUnicorn = null;
  this.heart = null;
  this.bigCloud = null;
  this.birdChirp = null;
  this.bunnyHop = null;
  this.growl = null;
  this.flame = null;

};

Enemy.prototype = {
  preload: function(){
     this.game.load.atlas('enemy', 'assets/image/theSprites.png', 'assets/image/theSprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
     this.game.load.image('cloud', 'assets/images/cloud.png');
     this.game.load.image('pinkUnicorn', 'assets/images/unicorn.png');
     this.game.load.image('heart', 'assets/images/Heart.png');
  },

  create: function(){

    // set up stats
    var style1 = { font: "20px Bangers", fill: "#ff0"};
    var t1 = this.game.add.text(10, 20, "Points:", style1);
    var t2 = this.game.add.text(10, 45, "Remaining Hits:", style1);
    t1.fixedToCamera = true;
    t2.fixedToCamera = true;

    var style2 = { font: "20px Bangers", fill: "rgb(165, 15, 172)"};
    this.pointsText = this.game.add.text(80, 20, "", style2);
    this.hitsText = this.game.add.text(130, 45, "", style2);
    this.refreshStats();
    this.pointsText.fixedToCamera = true;
    this.hitsText.fixedToCamera = true;

    // add all the enemies
    this.pinkUnicorn = this.game.add.group();
    this.pinkUnicorn.enableBody = false;
    this.pinkUnicorn.physicsBodyType = Phaser.Physics.ARCADE;
    this.pinkUnicorn.createMultiple(3, 'pinkUnicorn');
    this.pinkUnicorn.setAll('anchor.x', 0.5);
    this.pinkUnicorn.setAll('anchor.y', 0.5);

    this.heart = this.game.add.group();
    this.heart.enableBody = true;
    this.heart.physicsBodyType = Phaser.Physics.ARCADE;
    this.heart.createMultiple(3, 'heart');
    this.heart.setAll('anchor.x', 0.5);
    this.heart.setAll('anchor.y', 0.5);

    this.bird = this.game.add.group();
    this.bird.enableBody = true;
    this.bird.physicsBodyType = Phaser.Physics.ARCADE;
    this.bird.createMultiple(5, 'enemy');
    this.bird.setAll('anchor.x', 0.5);
    this.bird.setAll('anchor.y', 0.5);
    this.bird.callAll('animations.add', 'animations', 'iago', ['bird1', 'bird2', 'bird3', 'bird4'], 7, true);

    this.stump = this.game.add.group();
    this.stump.enableBody = true;
    this.stump.physicsBodyType = Phaser.Physics.ARCADE;
    this.stump.createMultiple(10, 'enemy');
    this.stump.setAll('anchor.x', 0.5);
    this.stump.setAll('anchor.y', 0.5);

    this.boulder = this.game.add.group();
    this.boulder.enableBody = true;
    this.boulder.physicsBodyType = Phaser.Physics.ARCADE;
    this.boulder.createMultiple(10, 'enemy');
    this.boulder.setAll('anchor.x', 0.5);
    this.boulder.setAll('anchor.y', 0.5);

    this.bunny = this.game.add.group();
    this.bunny.enableBody = true;
    this.bunny.physicsBodyType = Phaser.Physics.ARCADE;
    this.bunny.createMultiple(5, 'enemy');
    this.bunny.setAll('anchor.x', 0.5);
    this.bunny.setAll('anchor.y', 0.5);
    this.bunny.callAll('animations.add', 'animations', 'thumper', ['bunny1', 'bunny2', 'bunny3', 'bunny4', 'bunny5', 'bunny6'], 10, true);

    this.deer = this.game.add.group();
    this.deer.enableBody = true;
    this.deer.physicsBodyType = Phaser.Physics.ARCADE;
    this.deer.createMultiple(5, 'enemy');
    this.deer.setAll('anchor.x', 0.5);
    this.deer.setAll('anchor.y', 0.5);
    this.deer.callAll('animations.add', 'animations', 'bambi', ['deer1', 'deer2', 'deer3', 'deer4', 'deer5'], 2, true);

    this.wolf = this.game.add.group();
    this.wolf.enableBody = true;
    this.wolf.physicsBodyType = Phaser.Physics.ARCADE;
    this.wolf.createMultiple(2, 'enemy');
    this.wolf.setAll('anchor.x', 0.5);
    this.wolf.setAll('anchor.y', 0.5);
    this.wolf.callAll('animations.add', 'animations', 'balto', ['wolf1', 'wolf2', 'wolf3', 'wolf4', 'wolf5', 'wolf5', 'wolf5', 'wolf5', 'wolf4', 'wolf3', 'wolf2'], 3, true);

    this.fire = this.game.add.group();
    this.fire.enableBody = true;
    this.fire.physicsBodyType = Phaser.Physics.ARCADE;
    this.fire.createMultiple(2, 'enemy');
    this.fire.setAll('anchor.x', 0.5);
    this.fire.setAll('anchor.y', 0.5);
    this.fire.callAll('animations.add', 'animations', 'flameboy', ['fire1', 'fire2', 'fire3'], 10, true);

    this.game.time.events.loop(Phaser.Timer.SECOND * 4, this.spawnObstacle, this);
    this.game.time.events.loop(Phaser.Timer.SECOND * 6, this.spawnEnemy, this);
    this.game.time.events.loop(Phaser.Timer.SECOND * 40, this.spawnHeart, this);

    // set up audio for animals
    this.birdChirp = this.game.add.audio('chirp');
    this.birdChirp.volume = 1.4;
    this.birdChirp.loop = true;

    this.bunnyHop = this.game.add.audio('hop');
    this.bunnyHop.volume = 1.2;
    this.bunnyHop.loop = false;

    this.growl = this.game.add.audio('growl');
    this.growl.volume = 1.5;
    this.growl.loop = false;

    this.flame = this.game.add.audio('fire');
    this.flame.volume = 1.7;
    this.flame.loop = true;

    this.heartSound = this.game.add.audio('heart');
    this.heartSound.volume = 1.5;
    this.heartSound.loop = false;

  },

  update: function(){
    gameGlobal.points += (Phaser.Timer.SECOND / 1000);
    this.refreshStats();

    this.game.world.bringToTop(this.stump);
    this.game.world.bringToTop(this.boulder);
    this.game.world.bringToTop(this.bunny);
    this.game.world.bringToTop(this.deer);
    this.game.world.bringToTop(this.wolf);
    this.game.world.bringToTop(this.fire);
    this.game.world.bringToTop(this.pinkUnicorn);
    this.game.world.bringToTop(this.heart);

    this.game.physics.arcade.overlap(this.bird, player.hiker, this.enemyCollide, null, this);
    this.game.physics.arcade.collide(this.stump, player.hiker, this.obstacleCollide, null, this);
    this.game.physics.arcade.collide(this.boulder, player.hiker, this.obstacleCollide, null, this);
    this.game.physics.arcade.overlap(this.bunny, player.hiker, this.enemyCollide, null, this);
    this.game.physics.arcade.overlap(this.deer, player.hiker, this.enemyCollide, null, this);
    this.game.physics.arcade.overlap(this.wolf, player.hiker, this.enemyCollide, null, this);
    this.game.physics.arcade.overlap(this.fire, player.hiker, this.enemyCollide, null, this);
    this.game.physics.arcade.overlap(this.heart, player.hiker, this.heartCollide, null, this);

    if (gameGlobal.hits === 5) {
      this.birdChirp.stop();
      this.flame.stop();
      this.game.state.start('end');
    }
  },

  spawnObstacle: function(){
    var type = this.game.rnd.integerInRange(1,2);

    if (type === 1) {
      var obstacle = this.stump.getFirstExists(false);
      obstacle.frameName = "stump";
      obstacle.body.immovable = true;
    } else if (type === 2) {
      var obstacle = this.boulder.getFirstExists(false);
      obstacle.frameName = "boulder";
      obstacle.body.immovable = true;
    }

    obstacle.anchor.setTo(0.5, 0.5);
    obstacle.checkWorldBounds = true;
    obstacle.body.allowGravity = false;
    obstacle.outOfBoundsKill = true;
    obstacle.reset(this.game.world.width - 5, 290);
    obstacle.hasCollided = false;
    obstacle.body.velocity.x = -90;
  },

  spawnEnemy: function(){

    var type = this.game.rnd.integerInRange(1, 5);

    if (type === 1) {
      var enemy = this.bird.getFirstExists(false);
      enemy.animations.play('iago');
      enemy.reset(this.game.world.width - 5, 240);
      enemy.body.velocity.x = this.game.rnd.integerInRange(-250, -90);
      this.birdChirp.play();
    } else if (type === 2) {
      var enemy = this.bunny.getFirstExists(false);
      enemy.animations.play('thumper');
      enemy.reset(this.game.world.width - 5, 290);
      enemy.body.velocity.x = this.game.rnd.integerInRange(-250, -90);
      this.bunnyHop.play();
    } else if (type === 3) {
      var enemy = this.deer.getFirstExists(false);
      enemy.animations.play('bambi');
      enemy.reset(this.game.world.width - 5, 290);
      enemy.body.velocity.x = -90;
    } else if (type === 4) {
      var enemy = this.wolf.getFirstExists(false);
      enemy.animations.play('balto');
      enemy.reset(this.game.world.width - 5, 290);
      enemy.body.velocity.x = -90;
      this.growl.play();
    } else if (type === 5) {
      var enemy = this.fire.getFirstExists(false);
      enemy.animations.play('flameboy');
      enemy.reset(this.game.world.width - 5, 290);
      enemy.body.velocity.x = -90;
      this.flame.play();
    }
    enemy.anchor.setTo(0.5, 0.5);
    enemy.body.allowGravity = false;
    enemy.body.immovable = true;
    enemy.checkWorldBounds = true;
    enemy.outOfBoundsKill = true;
    enemy.hasCollided = false;

  },
  spawnHeart: function(){

    var life = this.heart.getFirstExists(false);

    life.anchor.setTo(0.5, 0.5);
    life.checkWorldBounds = true;
    life.body.allowGravity = false;
    life.outOfBoundsKill = true;
    life.reset(this.game.world.width - 5, 200);
    life.hasCollided = false;
    life.body.velocity.x = -90;
  },
  enemyCollide: function(player, enemy){
    if (!enemy.hasCollided) {
      enemy.hasCollided = true;
    }
    enemy.kill();
    gameGlobal.hits++;
    gameGlobal.points += 5;
    this.refreshStats();
  },
  obstacleCollide: function(player, obstacle){
    if (!obstacle.hasCollided) {
      obstacle.hasCollided = true;
    }
  },
  heartCollide:function(player, life){
    if (!life.hasCollided) {
      life.hasCollided = true;
    }
    life.kill();
    gameGlobal.hits--;
    gameGlobal.points += 25;
    this.refreshStats();
  },

  refreshStats: function(){

    // called this to update stats
    this.pointsText.text = gameGlobal.points;
    this.hitsText.text = gameGlobal.maxHits - gameGlobal.hits;
  },
};
