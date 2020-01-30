let cheerio = require('cheerio');
let node = require('fs'); 
let axios = require('axios');


axios.get('https://cdn.adimo.co/clients/Adimo/test/index.html')
    .then((response) => {
            const body = response.data;
            const $ = cheerio.load(body); 
            let cheeses = [];
            $('.item').each(function(i, elem) {
                cheeses[i] = {
                    cheese: $(this).find('h1').text().trim(),//get the h1 tag inside of .item and trim
                    url: $(this).children('img').attr('src'), //json url = img src
                    oldPrice: $(this).children('.oldPrice').text().trim(),//get the old price
                    newPrice: $(this).find('.price').text().trim()//new price
                }      
            });
            node.writeFile('cheese.json', JSON.stringify(cheeses, null, 1), 
                        (err)=> console.log('potent cheddar bro'))
}, (error) => console.log(err) );