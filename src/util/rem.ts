// rem等比适配配置文件
// 基准大小
const baseSize = 10

// 设置 rem 函数
function setRem() {
    //高保真设计比例
    let baseW = 1920
    let baseH = 1080
    let w = document.documentElement.clientWidth;
    let h = document.documentElement.clientHeight

    let isMin = (baseW / baseH - w / h) > 0
    let fs = isMin ? w / baseW : h / baseH
    document.documentElement.style.fontSize = baseSize * fs + 'px';
}

// 初始化
setRem()
// 改变窗口大小时重新设置 rem
function resize() {
    let resizeEvt = 'osrientationchange' in window ? 'orientationchange' : 'resize';
    if (!document.addEventListener) return;
    window.addEventListener(resizeEvt, setRem, false);
    document.addEventListener('DOMContentLoaded', setRem, false);
}
window.addEventListener('resize', resize)
