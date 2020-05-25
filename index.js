const {BrowserWindow} = require('electron').remote;
var w = BrowserWindow.getFocusedWindow();

var osu = require('node-os-utils')

q.get('#minimize').on('click',e=>w.minimize());
q.get('#close').on('click',e=>w.close());

let cpu = s => {
  document.querySelector('.cpu .circle').style.strokeDasharray = Math.round(s*75/100) + ', 100';
  document.querySelector('#cpuPercent').textContent = Math.round(s) + '%';
}

let ram = s => {
  document.querySelector('.ram .circle').style.strokeDasharray = Math.round(s*75/100) + ', 100';
  document.querySelector('#ramPercent').textContent = Math.round(s) + '%';
}

setInterval(()=>{
  osu.cpu.free()
    .then(cp => {
      cpu(100-cp);
    });
  osu.mem.info()
    .then(mp => {
      ram(100-mp.freeMemPercentage);
    });
},1000);
