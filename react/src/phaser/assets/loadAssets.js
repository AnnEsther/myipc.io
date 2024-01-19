var loadAssets = {
    "landingScene" :
    {
        "logoAnim" : {
            "type" : "spritesheet",
            "path" : "assets/sprites/logo_4X19.png",
            "data" : {
                "frameWidth" : 450,
                "frameHeight" : 469,
                "endFrame" : 73
            }
        },
        "logo" : {
            "type" : "image",
            "path" : "assets/sprites/logo.png",
            "data" : {}
        }
    },
    "form" : 
    {
        "inputform": {
            "type" : "html",
            "path" : "src/html/inputform.html",
            "data" : { }
        },
        "mapData_floors": {
            "type" : "json",
            "path" : "assets/data/MapOutput18x18.json",
            "data" : { }
        },
        "click": {
            "type" : "audio",
            "path" : "assets/Sounds/btnClick.wav",
            "data" : { }
        }
    },
    "ipcScene" : 
    {
        "ipcSprites" : {
            "type" : "ipcSprites",
            "path" : "assets/IPC Sprite Sheets/",
            "data" : { 
                "frameWidth": 320,
                "frameHeight": 320,
                "endFrame" : 6 }
        },
        "upBtn" : {
            "type" : "spritesheet",
            "path" : "assets/sprites/upBtn.png",
            "data" :  {
                "frameWidth" : 193,
                "frameHeight" : 71,
                "endFrame" : 2
            }
        },
        "startBtn" : {
            "type" : "spritesheet",
            "path" : "assets/sprites/startBtn.png",
            "data" :  {
                "frameWidth" : 193,
                "frameHeight" : 71,
                "endFrame" : 2
            }
        },
        "dataBase": {
            "type" : "json",
            "path" : "assets/data/IPC_metadata_db.json",
            "data" : { }
        }
    },
    "dungeon" :
    {
        "mapData": {
            "type" : "json",
            "path" : "assets/data/map.json",
            "data" : { }
        },
        "loop1": {
            "type" : "audio",
            "path" : "assets/Sounds/CreepyDungeon.wav",
            "data" : { }
        },
        "loop2": {
            "type" : "audio",
            "path" : "assets/Sounds/Dungeon2.wav",
            "data" : { }
        },
        "graph": {
            "type" : "image",
            "path" : "assets/sprites/dungeonTiles.png",
            "data" : { }
        },
        "dungeonData" : {
            "type" : "object",
            "path" : "",
            "data" : { }
        },
        "hole" : {
            "type" : "image",
            "path" : "assets/sprites/hole.png",
            "data" : { }
        },
        "minimaps" : {
            "type" : "minimaps",
            "path" : "assets/MiniMaps/",
            "data" : { }
        }
    }
    
};

export default loadAssets;