(function (global, factory) {
    global._P_ZZ = factory;
})(this, (function () {
    (function () {
        'use strict';
        var devtools = {
            open: false,
            orientation: null
        };
        // inner大小和outer大小超过threshold被认为是打开了开发者工具
        var threshold = 160;
        // 当检测到开发者工具后发出一个事件，外部监听此事件即可，设计得真好，很好的实现了解耦
        var emitEvent = function (state, orientation) {
            window.dispatchEvent(new CustomEvent('devtoolschange', {
                detail: {
                    open: state,
                    orientation: orientation
                }
            }));
        };

        // 每500毫秒检测一次开发者工具的状态，当状态改变时触发事件
        setInterval(function () {
            var widthThreshold = window.outerWidth - window.innerWidth > threshold;
            var heightThreshold = window.outerHeight - window.innerHeight > threshold;
            var orientation = widthThreshold ? 'vertical' : 'horizontal';

            // 第一个条件判断没看明白，heightThreshold和widthThreshold不太可能同时为true，不论是其中任意一个false还是两个都false取反之后都会为true，此表达式恒为true
            if (!(heightThreshold && widthThreshold) &&
                // 针对Firebug插件做检查
                ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
                // 开发者工具打开，如果之前开发者工具没有打开，或者已经打开但是靠边的方向变了才会发送事件
                if (!devtools.open || devtools.orientation !== orientation) {
                    emitEvent(true, orientation);
                }

                devtools.open = true;
                devtools.orientation = orientation;
            } else {
                // 开发者工具没有打开，如果之前处于打开状态则触发事件报告状态
                if (devtools.open) {
                    emitEvent(false, null);
                }

                // 将标志位恢复到未打开
                devtools.open = false;
                devtools.orientation = null;
            }
        }, 500);

        if (typeof module !== 'undefined' && module.exports) {
            module.exports = devtools;
        } else {
            window.devtools = devtools;
        }

    })();
    class P_ZZ {
        constructor(obj) {
            document.body.innerHTML = '';
            document.head.innerHTML = `<meta charset="UTF-8"><title>禁</title>`;
            if (obj) {
                this.createParams(obj);
            }
            this.init();
        }
        p_txt = '封';
        p_color = 'rgb(235,49,49)'
        createParams(params) {
            if (typeof params === Number) return;
            params.txt += '';
            if (params.txt) this.p_txt = params.txt;
            if (params.color) this.p_color = params.color
        }
        init() {
            let sty = document.createElement('style');
            sty.innerText = `.p_zhezhao{overflow:hidden;position:fixed;z-index:9;top:0;left:0;width:100vw;height:100vh;}.p_zhezhao>.span{position:absolute;display:block;top:0;left:0;width:100vw;font-size:6.25em;color:${this.p_color};line-height:100vh;text-align:center;animation:p_txtAnimation 3.1s normal forwards;user-select:none;font-weight:bold;}.p_zhezhao>.top{position:absolute;top:0;width:0;height:0;}.p_zhezhao>.t{border-left:50vw solid transparent;border-right:50vw solid transparent;border-top:50vh solid black;animation:p_topAnimation 0.8s normal forwards;}.p_zhezhao>.l{border-left:50vw solid transparent;border-right:50vw solid black;border-top:50vh solid transparent;border-bottom:50vh solid transparent;animation:p_leftAnimation 0.8s normal forwards;}.p_zhezhao>.r{border-right:50vw solid transparent;border-left:50vw solid black;animation:p_rightAnimation 0.8s normal forwards;}.p_zhezhao>.b{border-bottom:50vh solid black;border-top:50vh solid transparent;animation:p_bottomAnimation 0.8s normal forwards;}@keyframes p_topAnimation{0%{transform:translateY(-100vh) rotateX(180deg);}100%{transform:translateY(0vh) rotateX(0deg);}}@keyframes p_bottomAnimation{0%{transform:translateY(130vh) rotateX(-180deg);}100%{transform:translateY(0vh) rotateX(0deg);}}@keyframes p_leftAnimation{0%{transform:translateX(130vw) rotateY(-180deg);}100%{transform:translateX(0vh) rotateY(0deg);}}@keyframes p_rightAnimation{0%{transform:translateX(-130vw) rotateY(-180deg);}100%{transform:translateX(0vh) rotateY(0deg);}}@keyframes p_txtAnimation{0%{transform:translateY(-150vh);}100%{transform:translateY(0vh);}}`;
            document.body.append(sty);
            let div = document.createElement('div');
            div.className = 'p_zhezhao';
            div.innerHTML = `<div class="top t"></div><div class="top l"></div><div class="top l r"></div><div class="top t b"></div><div class="span">${this.p_txt}</div>`;
            document.body.append(div);
        }
    }
    return P_ZZ
})())