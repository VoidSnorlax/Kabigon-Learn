function animation(mod,target,callback){
    clearInterval(mod.time);
    mod.time=setInterval(function (){
        var step = (target - mod.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if(mod.offsetLeft===target){
            clearInterval(mod.time);
            if(callback){
                callback();
            }
        }
        mod.style.left=mod.offsetLeft+step+'px';
    },40);
}