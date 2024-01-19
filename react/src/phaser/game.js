import React, { useEffect } from 'react';
import Phaser from 'phaser';

import Container from '../com/Container';

import initScene from './src/scenes/initScene';
import loadingScene from './src/scenes/loadingScene';
import landingScene from './src/scenes/landingScene';
import formScene from './src/scenes/formScene';
import ipcScene from './src/scenes/ipcScene';
import dungeonScene from './src/scenes/dungeonScene';

import gameConfig from './src/gameConfig';


let game;
const phaserConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0, },
            debug: false
        }
    },
    parent: 'phaser-game',
    render: { pixelArt: true, antialias: false, autoResize: false },
    scene: [landingScene, dungeonScene]//, formScene, ipcScene, dungeonScene]
};


export default function Game(props) {

    gameConfig.currentAddress = props.dungeonAddrs;//.toUpperCase();
    useEffect(() => {
        game = new Phaser.Game(phaserConfig);
    }, []);


    return (
        <Container>
            <div className="game-container">
                <div id="phaser-game" />
            </div>
        </Container>
      );
}

