const http = require('http');
const fs = require('fs');
const request = require('request-promise')
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

const config = {
  "pageMaxNum": "10",
  "parseURL": "http://vip.jlsprh.com/index.php?url="
}

class reptilesController {
  async index() {
    const dHTML = await Promise.all(await this.fetchHandler())
    this.ctx.body = await this.parseHTML(dHTML)
  }


  async fetch(url) {
    return request(url, function (err, res, data) {
      return Buffer.concat([new Buffer(data)]).toString();
    })
  }

  async fetchHandler() {
    let promiseList = [];
    for (let i = 1; i <= config.pageMaxNum; i++) {
      promiseList.push(this.fetch(reptilesController.getSourceURL(i)));
    }
    return promiseList;
  }

  static getSourceURL(index) {
    return `http://list.iqiyi.com/www/1/-------------11-${index}-1-iqiyi--.html`
  }

  async parseHTML(html) {
    const dom = new JSDOM(html);
    let aList = dom.window.document.querySelectorAll('div.site-piclist_pic > a');
    aList = Array.from(aList);
    return aList.map((a) => {
      return {
        title: a.title,
        url: `${config.parseURL}${a.href}`
      }
    });
  }

}
