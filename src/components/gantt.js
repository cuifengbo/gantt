import * as PIXI from 'pixi.js';
import projectbox from './projectbox.js';//项目盒模型
import stagebox from './stagebox.js';//阶段盒模型
import conf from './conf.js';//设置参数【行高表格样式等】
import data from './data.js';
import moment from 'moment'

var ganttApp = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x000000, resolution: window.devicePixelRatio || 1,
});
var leftbarbackground = new PIXI.Graphics();
leftbarbackground.lineStyle(1,0x333333,1);
leftbarbackground.beginFill(0x111111);
leftbarbackground.drawRect(0,0,conf.leftBarWidth,ganttApp.view.height);
leftbarbackground.endFill();
ganttApp.stage.addChild(leftbarbackground);

ganttApp.stage.addChild(projectbox(5,5,30,30));
var tasks = [];//原始数据中任务的列表
var tasklists = [];//阶段列表
var project = null;//项目数据
var startdate //工程最早开始日期
var enddate //工程结束日期
const minboxwidth = 40;
const maxtablewidth = 800;
for (var i =0 ; i<data.data.length;i++){
    switch(data.data[i].type){
        case "task":// 普通任务盒子
            tasks.push(data.data[i]);
            if(startdate){
                if(moment(data.data[i].start_date).isBefore(startdate)){//如果该项目启动时间在最小起始时间之前，更换项目起始时间为当前值
                    console.log("findbefore");
                    startdate = moment(data.data[i].start_date);
                }
            }else{//第一条任务时初始化工程开始日期
                startdate = moment(data.data[i].start_date);
                enddate = moment(data.data[i].start_date).add(data.data[i].duration, 'd');
            }
            if(enddate.isBefore(moment(data.data[i].start_date).add(data.data[i].duration, 'd'))){//如果该项目结束时间在最大结束时间之后，更换项目结束时间
                enddate = moment(data.data[i].start_date).add(data.data[i].duration, 'd');
            }
        break;
        case "tasklist"://阶段盒子
            var obj = {};
            obj.list = [];
            obj.self = data.data[i];
            tasklists.push(obj);
        break;
        case "project":
            project = data.data[i];
        break;
        default:
            console.log(data.data[i].type);
        break;
    }
}
console.log(tasks,tasklists,project);
for(var j= 0;j<tasks.length;j++){
    for(var k = 0; k<tasklists.length;k++){
        if(tasks[j].parent== tasklists[k].self.id){
            tasklists[k].list.push(tasks[j]);
        }
    }
}
function init(){
    var container = new PIXI.Container();
   // container.addChild()
    var linenow = 0;
    for (var i=0;i<tasklists.length;i++){
        container.addChild(stagebox(0,linenow*conf.lineHeight,minboxwidth,conf.lineHeight));
        linenow++;
        for(var j = 0; j<tasklists[i].list.length;j++){
            container.addChild(projectbox(moment(tasklists[i].list[j].start_date).diff(startdate,'d')*conf.gridWidth,linenow*conf.lineHeight,conf.gridWidth*tasklists[i].list[j].duration,conf.lineHeight));
            
          
            console.log(tasklists[i].list[j].id);
            linenow++;
        }
    }
    ganttApp.stage.addChild(container);
}
init();



console.log(tasks,tasklists,project);
console.log(startdate);
console.log(
    startdate.get('year'),
    startdate.get('month'),
    startdate.get('date')
)
console.log(
    enddate.get('year'),
    enddate.get('month'),
    enddate.get('date')
)
// var box = new PIXI.Graphics ();
// //box.lineStyle(1.5, 0x99CCFF, 1);
// box.beginFill(0xFF9933);
// box.drawRoundedRect(0, 0, 84, 36, 10)
// box.endFill();
// box.x = 48;
// box.y = 190;
// ganttApp.stage.addChild(box);
// box.width = 200;


export default ganttApp.view;