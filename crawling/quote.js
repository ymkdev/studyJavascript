import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function scrapeQuotepage(pageNum){
    const url = `https://quotes.toscrape.com/page/${pageNum}/`;
    const resp = await axios.get(url);
    const html = await resp.data;
    const $ = cheerio.load(html);

    const quoteTag = $('.quote');
    const arr = []; 

    for (let i=0; i<quoteTag.length; i++){
        const quote = $(quoteTag[i]).find('.text').text();
        const authorName = $(quoteTag[i]).find('.quthor').text();
        // tag 배열 
        const tags = $(quoteTag[i]).find('.tag');
        const tagValues = tags.map((i, elem)=>{
            return $(elem).text();
        }).get();
        arr.push({quote, quthorName, tags:tagValues});
    }
    return arr;
}

(async ()=>{
    let result =[];
    for (let i=1; i<=10; i++){
        const arr = await scrapeQuotepage(i);
        result = [
            ...result,
            ...arr
        ]
    }
    const data = JSON.stringify(result);
    fs.writeFile('result.json', data, (err)=>{});
})();