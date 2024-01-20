import React, { useEffect } from 'react';
import Phaser from 'phaser';

import Container from '../com/Container';

import landingScene from './src/landingScene.js';
import dungeonScene from './src/dungeonScene.js';
import gameConfig from './src/gameConfig.js';




export default function Game(props) {

    gameConfig.currentAddress = props.dungeonAddrs;//.toUpperCase();
    useEffect(() => {
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

