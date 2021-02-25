const axios = require("axios")
const fs = require('fs')
const moment = require('moment');


let members = [ {name:"bell",uid:487550002,roomid:21811136},
                {name:"lily",uid:421347849,roomid:21415012},
                {name:"memory",uid:487551829,roomid:21955596}]

for (let i = 0;i<members.length;i++) {
    // console.log(i)
    getInfo(members[i])
}

function getInfo(member) {
     axios.get(`https://api.bilibili.com/x/relation/stat?vmid=${member.uid}`)
         .then(res => {
             // console.log(i)
             let fan = res.data.data.follower
             // console.log(fan)

             axios.get(`https://api.live.bilibili.com/xlive/app-room/v2/guardTab/topList?page=1&page_size=1&ruid=${member.uid}&roomid=${member.roomid}`)
                 .then(res => {
                     let guard = res.data.data.info.num
                     // console.log(guard)

                     let info = ""
                     const formatDate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
                     info += formatDate + ",";
                     info += fan + ",";
                     info += guard + "\n"
                     // console.log(info)

                     fs.appendFile(`./data/${member.name}.csv`, info, err => {
                         if (err) console.log(err);
                     })
                 })
         })
}

