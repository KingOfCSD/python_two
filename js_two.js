var files=require("fs");
reg = /\n(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})\.[0-9]{1,3})/ig;
main();

function main() {
    var ips = [];
    var log = files.readFileSync("access.log", 'utf8');
    var allIPs = log.match(reg);
    console.log("Количество IP адресов" + allIPs.length);

    for (i = 0; i < allIPs.length; i++)
    {
        var be = false;
        for (j = 0; j < ips.length; j++) {
            if (ips[j] == allIPs[i]) {
                var be = true;
            }
        }
        if (!be) {
            ips.push(allIPs[i]);
        }
    }

    var sub = {};
    for(i=0; i<ips.length; i++) {
        var ip = ips[i].substr(1, ips[i].length);
        var mask = ip.split('.',3).join('.')
        if (!sub[mask]) {
            sub[mask] = {}
            sub[mask].mask = mask;
            sub[mask].ips = [];
            sub[mask].ips.push(ips[i]);
        }
        else {
            sub[mask].ips.push(ips[i]);
        }
    }
    console.log("Всего подсетей: " + Object.keys(sub).length);

    for (var i in sub) {
        if (sub.hasOwnProperty(i)) {
            console.log("Маска: " + sub[i].mask);
            for (j = 0; j < sub[i].ips.length; j++) {
                console.log(sub[i].ips[j]);
            }
            console.log("\n");
        }
    }
}