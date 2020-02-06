// 引入 superagent 包，用于 Node 服务器发送http请求
const request = require("superagent");
// 导入 cheerio，把字符串解析成 HTML
const cheerio = require("cheerio");
// 导入 path 模块处理路径
// const path = require("path");
const { GistBox } = require('gist-box')

// 获取实时数据
function getWeiboData() {
    return new Promise((resolve, reject) => {
        request
            .get("https://s.weibo.com/top/summary")
            .end((err, res) => {
                if (err) return console.log("数据请求失败，请检查路径");
                // console.log(res.text);
                // 把字符串解析成THML，并可用 jQuery 核心选择器获取内容
                const $ = cheerio.load(res.text);
                // 长度
                var num = [], text = [], url = [], degree = []
                const len = $('.wbs-hotrank .data td.td-01.ranktop').length
                //console.log(len)
                num[0] = 0,
                text[0] = $(".wbs-hotrank .data td.td-02 a")[0].children[0].data
                url[0] = 'https://s.weibo.com/' + $(".wbs-hotrank .data td.td-02 a")[0].children[0].parent.attribs.href
                degree[0] = 0
                for (var i = 0; i < len; i++) {
                    num[i] = $(".wbs-hotrank .data td.td-01.ranktop")[i].children[0].data
                    text[i+1] = $(".wbs-hotrank .data td.td-02 a")[i+1].children[0].data
                    url[i+1] = 'https://s.weibo.com/' + $(".wbs-hotrank .data td.td-02 a")[i+1].children[0].parent.attribs.href
                    degree[i] = $(".wbs-hotrank .data td.td-02 span")[i].children[0].data
                    //console.log(num[i],text[i],degree[i],url[i])
                }
                // 微博排行数据
                const weiboData = {
                    num,
                    text,
                    url,
                    degree,
                    len
                };
                //console.log(mojiData);
                resolve(weiboData);
            });
    });
}

async function test(){

  const weiboData = await getWeiboData()
  const len = weiboData.num.length
  var content = `Pin. [${weiboData.text[0]}](${weiboData.url[0]})<br>`
  for (var i = 0; i < len; i++) {
      content = content + `${weiboData.num[i]}. [${weiboData.text[i+1]}](${weiboData.url[i+1]}) ${weiboData.degree[i]}<br>`
  }
  //console.log(weiboData.text.length)
  console.log(content)

  const GIST_ID = '05525c47a9ff4dff63bdab20b3e98d17'
  const TOKEN =  '818cbd42d5a8400172a4108cb7d68d2c05853b19'
  const box = new GistBox({ id: GIST_ID, token: TOKEN })
  await box.update({
    content
  })
}

test()
