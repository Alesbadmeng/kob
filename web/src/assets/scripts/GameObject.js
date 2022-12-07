const  GAME_OBJECTS = [];

export class GameObject{
    constructor(){
        GAME_OBJECTS.push(this);
        //改帧数与上一帧质之间的间隔
        this.timedelta = 0; 
        this.has_called_start = false;
    }

    start(){ //只执行一次

    }

    update(){//除了第一帧之外，每一帧都执行一次

    }

    on_destory(){ //删除之前执行

    }

    destory(){ //将对象从当前的数组对象数组中删除
        this.on_destory();//删之前调用

        for(let i in GAME_OBJECTS){
            const obj = GAME_OBJECTS[i];
            if(obj === this){ //this为当前指定要删除的对象
                GAME_OBJECTS.splice(i);//从数组删除元素
                break;
            }
        }
    }
}
let last_timestamp; //上一次执行的时间
//函数每秒被调用60次
const step = timestap => { //timestamp为当前函数执行的时刻
    for(let obj of GAME_OBJECTS){ //用 of 遍历的是值 用in遍历的是下标
        if(!obj.has_called_start){
            obj.has_called_start = true;
            obj.start();
        }else{
            obj.timedelta = timestap-last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestap;
    //执行回调
    requestAnimationFrame(step);
}
//浏览器提供的函数requestAnimationFrame（），（）里可以传一个函数 
//在渲染之前执行step函数
requestAnimationFrame(step);
