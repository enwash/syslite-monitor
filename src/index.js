const {BrowserWindow} = require('electron').remote;
var w = BrowserWindow.getFocusedWindow();

const fs = require('fs');

let rawdata = fs.readFileSync('./config.json');
let data = JSON.parse(rawdata);

var osu = require('node-os-utils')

q.get('#minimize').on('click',e=>w.minimize());
q.get('#close').on('click',e=>w.close());

let cpu = s => {
  q.get('.cpu .circle').style.strokeDasharray = Math.round(s*75/100) + ', 100';
  q.get('#cpuPercent').textContent = Math.round(s) + '%';
}

let ram = s => {
  q.get('.ram .circle').style.strokeDasharray = Math.round(s*75/100) + ', 100';
  q.get('#ramPercent').textContent = Math.round(s) + '%';
}

if (!data.display.cpu) {
  q.get('.cpu').parentNode.style.display = 'none';
}

if (!data.display.ram) {
  q.get('.ram').parentNode.style.display = 'none';
}

document.documentElement.style.setProperty('--bg', data.colors.bg);
document.documentElement.style.setProperty('--sec', data.colors.fg);
document.documentElement.style.setProperty('--mid', data.colors.mid);

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
