const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/soaresmiltinho');

  const imageList = await page.evaluate(() => {
    //toda essa função será executada no browser => ou seja, utiliza da própria DOM para fazer o garimpo de dados;

    //pegar todas as imagens do perfil (posts)
    const nodeList = document.querySelectorAll('article img');
    //transformar o NodeList em Array
    const imageArray = [...nodeList];
    //transformar os nodes (elementos HTML) em objetos JS
    const imageList = imageArray.map(({ src }) => ({
      src
    }));
    //colocar para fora da função => retirar os dados do browser para o nosso backend

    return imageList;
  });

  //escrever os dados em um arquivo local (json)
  fs.writeFile('instagram.json', JSON.stringify(imageList, null, 2), err => {
    if (err) throw new Error('Something went wrong');

    console.log('Script has ended');
  });

  await browser.close();
})();
