import { GameLoop } from './src/GameLoop';
import { DOWN, Input, LEFT, RIGHT, SPACE, UP } from './src/Input';
import { resources } from './src/Resources';
import { Sprite } from './src/Sprite';
import { Vector2 } from './src/Vector2';
import { gridCells } from './src/helpers/grid';
import './style.css'


const canvas = document.querySelector('#game-canvas');
const ctx = canvas.getContext('2d');

const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180)
})

const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180)
})

const hero = new Sprite({
    resource: resources.images.hero,
    frameSize: new Vector2(32, 32),
    hFrames: 3,
    vFrames: 8,
    frame: 1,
    position: new Vector2(gridCells(6), gridCells(5))
})

const shadow = new Sprite({
    resource: resources.images.shadow,
    frameSize: new Vector2(32, 32),

})



const draw = () => {
    skySprite.drawImage(ctx, 0, 0);
    groundSprite.drawImage(ctx, 0, 0);

    const heroOffset = new Vector2(-8, -21);
    const heroPosX = hero.position.x + heroOffset.x;
    const heroPosY = hero.position.y + 1 + heroOffset.y;

    shadow.drawImage(ctx, heroPosX, heroPosY);
    hero.drawImage(ctx, heroPosX, heroPosY);
}
const input = new Input();
const update = () => {
    if(input.direction === DOWN){
        hero.position.y++;
        hero.frame = 0;
    }
    if(input.direction === UP){
        hero.position.y--;
        hero.frame = 6;
    }
    if(input.direction === RIGHT){
        hero.position.x++;
        hero.frame = 3;
    }
    if(input.direction === LEFT){
        hero.position.x--;
        hero.frame = 9;
    }
    if(input.direction === SPACE){
        hero.position.y-=.50;
        setTimeout(() => {
            hero.position.y+=.50;
        }, 300);
      
    }
    console.log(input.direction);
}

const gameLoop = new GameLoop(update, draw)
gameLoop.start();

