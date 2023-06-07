ControllerButtonEvent.Released.onEvent(controller.A, function () {
    Mario.setImage(assets.image`Mario_0`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile5`, function (sprite, location) {
    if (sprite.tileKindAt(TileDirection.Top, assets.tile`myTile5`)) {
        tiles.setTileAt(location, assets.tile`myTile0`)
        tiles.setWallAt(tiles.getTileLocation(0, 0), true)
        coin = sprites.create(img`
            . e e 4 5 . . . 
            e 4 5 5 5 5 . . 
            4 5 5 4 5 5 5 . 
            4 5 4 5 5 5 5 . 
            4 5 4 5 5 5 5 . 
            4 5 5 4 5 5 5 . 
            e 4 5 5 5 5 . . 
            . e 4 5 5 . . . 
            `, SpriteKind.Food)
        tiles.placeOnTile(coin, location)
        coin.x += -15
        sprites.destroy(coin, effects.rings, 1000)
        info.changeScoreBy(20)
    } else {
        tiles.setWallAt(location, true)
    }
})
function CallEnemyDump (col: number, row: number, vx: number) {
    Gooamba = sprites.create(assets.image`myImage0`, SpriteKind.Enemy)
    tiles.placeOnTile(Gooamba, tiles.getTileLocation(col, row))
    Gooamba.setBounceOnWall(true)
    Gooamba.setVelocity(vx, 0)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.x > 10) {
        sprites.destroy(otherSprite, effects.halo, 500)
        info.changeScoreBy(20)
    } else {
        info.changeLifeBy(-1)
        pause(2000)
    }
})
let Gooamba: Sprite = null
let coin: Sprite = null
let Mario: Sprite = null
info.setLife(3)
info.setScore(0)
scene.setBackgroundColor(9)
tiles.setCurrentTilemap(tilemap`level1`)
Mario = sprites.create(img`
    . . . . 2 2 2 2 2 2 . . . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . . e e e e d e . . . . . . 
    . . . e e d e d d e . . . . . . 
    . . . e e d d d d d d d . . . . 
    . . . e e e d d e e e . . . . . 
    . . . . . d d d d d . . . . . . 
    . . . . e e 2 e e e . . . . . . 
    . . . e e e 2 e e 2 e e . . . . 
    . . e e e 2 2 2 2 2 e e . . . . 
    . . e e e 2 2 2 2 2 2 e . . . . 
    . . d d 2 2 2 2 2 2 2 d . . . . 
    . . . d 2 d 2 2 2 d 2 d . . . . 
    . . . 2 2 2 2 2 2 2 2 . . . . . 
    . . . 2 2 2 . . . 2 2 . . . . . 
    . . e e e e . . . e e e . . . . 
    `, SpriteKind.Player)
controller.moveSprite(Mario, 100, 0)
tiles.placeOnTile(Mario, tiles.getTileLocation(0, 13))
scene.cameraFollowSprite(Mario)
Mario.ay = 300
CallEnemyDump(8, 13, 100)
CallEnemyDump(32, 13, 100)
