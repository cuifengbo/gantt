function box(_x,_y,_w,_h){
    var box = new PIXI.Graphics();
    box.lineStyle(1,0x333333,1);
    box.beginFill(0x999999);
    box.drawRect(_x,_y,_w,_h);
    box.endFill();
    return box;
}
export default box//项目方块