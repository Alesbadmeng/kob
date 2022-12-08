import { GameObject } from "./GameObject"; //export就用{} 如果是export default就不用{}
import { Snake } from "./Snake";
import { Wall } from "./Wall";

export class GameMap extends GameObject{
        constructor(ctx, parent) { //相当于gamemap的结构体
            super();
    
            this.ctx = ctx;
            this.parent = parent;
            this.L = 0;

            this.rows = 13;
            this.cols = 14;
            
            this.inner_walls_count = 20;
            this.walls = [];

            this.snakes = [
                new Snake({id: 0,color:"#4876EC", r: this.rows-2 , c: 1},this),

                new Snake({id: 1,color:"#F94848", r: 1, c: this.cols-2},this),
            ];

    }
    //flooyd 检查连通性的算法
    check_connectivity(g,sx,sy,tx,ty){
         if(sx == tx&&sy == ty) return true;
         g[sx][sy] = true;

         let dx = [-1,0,1,0],dy = [0,1,0,-1];
         for(let i= 0;i<4;i++){
            let x = sx + dx[i],y = sy + dy[i];
            if(!g[x][y]&&this.check_connectivity(g,x,y,tx,ty))
                return true;
         }
         return  false;
    }

    create_walls(){
        const g = [];
        for(let r = 0;r<this.rows;r++){
             g[r] = [];
            for(let c = 0;c<this.cols;c++){
                g[r][c] = false;//初始化
            }
        }   
        //给四周加上障碍物
        //给左右加上墙
        for(let r = 0;r<this.rows;r++){
            g[r][0] = g[r][this.cols-1] = true;
        }
        //给上下加上墙
        for(let c= 0;c<this.cols;c++){
            g[0][c] = g[this.rows-1][c] = true;
        }

        //创建随机障碍物
        for(let i =0;i<this.inner_walls_count/2;i++){
            for(let j =0;j<10000;j++){
                let r = parseInt(Math.random()*this.rows);//random产生[0,1)的随机值,就是随机取一个r
                let c = parseInt(Math.random()*this.cols);
                if(g[r][c]||g[this.rows-r-1][this.cols-c-1]) continue;
                //左下角格与右上角格不能有墙
                if(r == this.rows-2&&c == 1 ||r ==1&& c==this.cols-2)
                continue;

                g[r][c] = g[this.rows-r-1][this.cols-c-1] = true;
                break;
            }
        }

        //检查连通
        const copy_g = JSON.parse(JSON.stringify(g));
        if(!this.check_connectivity(copy_g,this.rows-2,1,1,this.cols-2)) 
            return false; 

        for(let r =0;r<this.rows;r++){
            for(let c= 0;c<this.cols;c++){
                if(g[r][c]){ //如果只为true就能加墙
                    this.walls.push(new Wall(r,c,this));
                }
            }
        }

        return true;
    }  

    add_listening_events(){
        this.ctx.canvas.focus();//要使用canvas的聚焦能力 需要设置设置 tabindex 属性

        const [snake0,snake1] = this.snakes;    
        this.ctx.canvas.addEventListener("keydown",e => {
            if(e.key==="w") snake0.set_direction (0);
            else if(e.key === "d") snake0.set_direction (1);
            else if(e.key ===  "s") snake0.set_direction  (2);
            else if(e.key === "a") snake0.set_direction (3);
            else if(e.key === "ArrowUp") snake1.set_direction(0);
            else if(e.key ==="ArrowRight") snake1.set_direction(1);
            else if(e.key ==="ArrowDown") snake1.set_direction(2);
            else if(e.key ==="ArrowLeft") snake1.set_direction(3);
        });//从键盘获取输入，输出

    }

    start(){
        for(let i =0;i<10000;i++){//循环10000次
            if(this.create_walls());//判断是否创建 create_walls函数返回了true和flase
            break;
        }

        this.add_listening_events();
    }

    update_size(){
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    check_ready(){ //判断俩条蛇是否已经准备好进入下一步
        for(const sanke of this.snakes){
            if(sanke.status!=="idle") return false;
            if(sanke.direction === -1 ) return false;   
        }
        return true;
    }

    next_step(){ //让两条蛇进入下一步   
        for(const snake of this.snakes){
            snake.next_step();
        }
    }

    check_valid(cell){
        for(const wall of this.walls){
            if(wall.r === cell.r&&wall.c ===cell.c)
            return false;
        }

        for(const snake of this.snakes){
            let k = snake.cells.length;
            if(!snake.check_tail_increasing()){
                k--;
            }
            for(let i=0;i<k;i++){
                if(snake.cells[i].r === cell.r&& snake.cells[i].c ===cell.c)
                return false;
            }
        }
        return true;
    }

    update(){
        this.update_size();
        if(this.check_ready()){
            this.next_step();
        }
        this.render();//渲染
    }

    render() {
        const color_even = "#AAD751",color_odd = "#A2D149";
        for(let r = 0;r<this.rows;r++){
            for(let c = 0;c<this.cols;c++){
                if((r+c)%2==0){
                    this.ctx.fillStyle = color_even;
                }else{
                    this.ctx.fillStyle = color_odd;
                }
                this.ctx.fillRect(c*this.L,r*this.L,this.L,this.L);
            }
        }    
    }
}
