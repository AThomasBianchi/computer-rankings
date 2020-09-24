const puppeteer = require('puppeteer');
const fs = require('fs');
const URL = 'https://fantasy.espn.com/football/league/schedule?leagueId=59910&teamId=10';

(async () => {
  try {
    var browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: 'networkidle0' });

    let results = await page.evaluate(() => {
      
      let scores = document.querySelectorAll('.Table__TBODY .result-column');
      let results = []

      for (let i = 0; i < scores.length; i++) {
        results.push(i);
        // results.push(scores[i].innerHTML.trim());
        // let matchup = Math.ceil((i + 1) / 18);
        // if (!results[matchup]) results[matchup] = {};
        // results[matchup][teams[i].innerHTML] = parseFloat(scores[i].innerText);
      }
      return results;
    });

    console.log(results);
    await browser.close();
    // // fs.writeFile('results.json', JSON.stringify(results), function (err) {
    //   if (err) throw err;
    //   console.log('Results saved');
    // })
  } catch (err) {
    console.log(error(err));
    await browser.close();

  }
})();

