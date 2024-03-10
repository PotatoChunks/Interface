### 获取组件

```js
this.node.getComponent(Label);//Label组件名称
```

设置/获取节点坐标

```js
this.node.setPosition(360,-640,0);
let p = new Vec3(-360,0,0);
this.node.setPosition(p)
//可以传入x,y值 也可以传入 一个三维向量
//尽量复用Vec3变量 防止产生垃圾
this.node.getPosition(p);
p.x+=360;
this.node.setPosition(p);
```

### 事件

[参考官方文档](https://docs.cocos.com/creator/manual/zh/engine/event/event-node.html) 

移动端和pc端都会触发的事件

| 枚举对象定义                  | 事件触发的时机                   |
| ----------------------------- | -------------------------------- |
| `Node.EventType.TOUCH_START ` | 当手指触点落在目标节点区域内时   |
| `Node.EventType.TOUCH_MOVE`   | 当手指在屏幕上移动时             |
| `Node.EventType.TOUCH_END`    | 当手指在目标节点区域内离开屏幕时 |
| `Node.EventType.TOUCH_CANCEL` | 当手指在目标节点区域外离开屏幕时 |

```js
start() {
    //开启监听
    this.node.on(Node.EventType.TOUCH_START,this.onTouchStart,this);
    //关闭事件监听
    //this.node.off(Node.EventType.TOUCH_START,this.onTouchStart,this)
}
onTouchStart(event:EventTouch){
    let vp = event.getUILocation();
    console.log(vp);
}
```

#### 节点触摸事件方法

[触摸事件`EventTouch`](https://docs.cocos.com/creator/manual/zh/engine/event/event-api.html#%E8%8A%82%E7%82%B9%E8%A7%A6%E6%91%B8%E4%BA%8B%E4%BB%B6-api) 

```js
start(){
    this.node.on(Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
}
onTouchMove(event:EventTouch){
    //获取当前触点距离上一次触点移动在 UI 窗口内相对于左下角的距离对象，对象包含 x 和 y 属性
    let p = event.getUIDelta();
    this.node.getPosition(this._v3);
    this._v3.x+=p.x;
    this._v3.y+=p.y;
    this.node.setPosition(this._v3);
}
```

键盘输入事件
[输入事件系统](https://docs.cocos.com/creator/manual/zh/engine/event/event-input.html) 
输入事件的枚举
`KeyCode` 

```js
input.on(Input.EventType.KEY_DOWN,(event:EventKeyboard) => {
    //键盘按下事件
},this)
```



### 坐标转换

转换本地坐标和世界坐标
要获取`uiTransform` 控件

```js
onTouchStart(event:EventTouch){
    //获取 UI 坐标系下的触点位置
    let vp = event.getUILocation();
    console.log(vp);
    //UI 变换组件
    let transform = this.node.getComponent(UITransform);

    //将一个 UI 节点世界坐标系下点转换到另一个 UI 节点 (局部) 空间坐标系
    let nodePos = transform.convertToNodeSpaceAR(new Vec3(vp.x,vp.y,0));
    console.log(nodePos);
}
```

### 缓动系统

[缓动接口](https://docs.cocos.com/creator/manual/zh/tween/tween-interface.html) 

```js
let obj = {
    n: 0
}
//一秒内将 n从0加到100
tween(obj)
    .to(1, { n: 100 }, {
    onUpdate(target, ratio) {
        console.log(obj.n)
    }
})
    .start();
```

循环动画
更改动画曲线

```js
const obj = {
    n: 0
}
tween(obj)
//0.5秒内从0到200
    .to(0.5, { n: 200 }, {
    onUpdate: (target, ratio) => {
        console.log(obj.n)
    },
    //动画曲线
    easing: 'quadOut'
	})
//0.5秒内从200到0
    .to(0.5, { n: 0 }, {
    onUpdate: (target, ratio) => {
        //this.lableComp.string = obj.n.toFixed(0) + '';
        //this.pep.setPosition(0,obj.n);
        this.pep.setPosition(0, obj.n);
        if(obj.n===0) this.isClick = false;
    },
    easing: 'quadIn'
	})
//打上下文的缓动动作打包成一个
    .union()
//一直重复执行
	.repeatForever()//repeat 执行几次
    .start();//启动缓动
```

立即停止缓动动画

加标签

```js
tween(obj)
    .tag(123);//添加标签123
Tween.stopAllByTag(123);//根据标签停止
```

接受参数

```typescript
let nT:Tween<object> = tween(obj);//Tween后写改变的对象类型
nT.stop();
```

