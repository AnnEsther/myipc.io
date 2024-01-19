
import Phaser from "phaser";
import logoAnim from "../../assets/sprites/logo_4X19.png";
import logo from "../../assets/sprites/logo.png";
import gameConfig from "../gameConfig";
import DungeonData from "../objects/DungeonData";
import config from "../../../config";
import mapData from "./src/phaser/assets/data/map.js";



export default class landingScene extends Phaser.Scene {
    constructor() {
        super('landingScene');
    }
    preload() {
        this.load.image("logo", logo);
        this.load.spritesheet("logoAnim", logoAnim, 
        {
            "frameWidth" : 450,
            "frameHeight" : 469,
            "endFrame" : 73
        });
        this.load.json("mapData", mapData);

    }
    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0);

        this.centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        
        this.anims.create({
            key: 'playLogoAnim',
            frames: this.anims.generateFrameNumbers('logoAnim', { start: 0, end: 72}),
            frameRate: 35,
            repeat: 0
        });

        this.logoAnim = this.add.sprite(this.centerX, this.centerY, 'logoAnim').play('playLogoAnim');
        var logo = this.add.image(this.centerX, this.centerY, 'logo');

        this.logoAnim.y = this.centerY - (this.logoAnim.height * 0.25);
        logo.y = this.logoAnim.y + (this.logoAnim.height * 0.5) + (logo.height * 0.5);

        var background = new Phaser.Display.Color(0, 44, 43);
        this.cameras.main.setBackgroundColor(background);

        var ratio = this.cameras.main.width / logo.width;

        logo.setScale(ratio);

        //START REQUEST TO ETHERIUM WALLET
        const req = new XMLHttpRequest();
        req.addEventListener("load", this.reqListener, this);
        req.open("GET", config.IPCDB_WEB3_PROVIDER + "/getNFTs?owner=" + gameConfig.currentAddress + "&contractAddresses[]=" +config.IPCDB_WEB3_CONTRACTADDR);
        gameConfig.currentScene = this;
        req.send();
    

        // this.logoAnim.on(Phaser.Animations.Events.ANIMATION_COMPLETE,
        //     function () {
        //         //this.logoAnim.anims.stop();
        //         this.cameras.main.fadeOut(100, 0, 0, 0);
        
        //         this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        //             // var data = {
        //             //     "loadScene" : "form"
        //             // };
        //             // this.scene.start('dungeon', null);
        //             //this.scene.start('loading');
        //             //this.scene.start('testing', { i : 0});
        //         });
        // }, this);

    }

    reqListener() 
    {
        var result;
        var params;
        var ownedIPCs = [];
        //CHECK IF REPONSE IS JSON
        if(!isValidJSON(this.responseText))
        {
            console.log("ERROR!")
        }
        else
        {
            // PARSE JSON
            result = JSON.parse(this.responseText);
            
            // GET ALL IPCs
            for(var i = 0; i < result['ownedNfts'].length; i++)
            {
                // CHECK IF SMART CONTRACT MATCHES
                //if(result['ownedNfts'][i]['contract']['address'].localeCompare(gameConfig.contractAdress) == 0)
                {
                    // PARSING IPC ID FROM HEX
                    ownedIPCs.push(parseInt(result['ownedNfts'][i]['id']['tokenId'], 16));
                }
            }
            // CHECK IF IPCs EXIST IN WALLET
            if(ownedIPCs.length == 0)
            {
                console.log("You have 0 IPCs in your wallet!")
            }
            else
            {
                params = {
                    dungeonAddress: gameConfig.currentAddress.toUpperCase(),
                    levelData: gameConfig.currentAddress.toUpperCase().match(/.{1,2}/g),
                    "ownedIPCs" : ownedIPCs,
                    index: 0
                };  
        
                //TO REMOVE 0x
                params.levelData.shift();
                
                params["dungeonData"] = new DungeonData(this, params.levelData);
                //gameConfig.scene.scene.cameras.main.fadeOut(500, 0, 0, 0);
                
                //gameConfig.scene.start('loadingScene', params);
                
        
                //gameConfig.currentAddress = "";
        
                gameConfig.currentScene.scene.start('dungeon', params);
            }
        }
      }

}

const isValidJSON = obj => {
    try {
      JSON.parse(obj);
      return true;
    } catch (e) {
      return false;
    }
  };