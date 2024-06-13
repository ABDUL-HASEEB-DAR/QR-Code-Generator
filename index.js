/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/


import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([  // objects.
    { message:"type in your url",
      name:"url"},
  ])

  .then((answers) => {
    const url = answers.url;
    var qr_svg = qr.image(url); // default type png can be changed to svg using {type: 'svg'}
    qr_svg.pipe(fs.createWriteStream('qr-image.png')); //generates image qr code with name qr-image.png

    fs.writeFile('URL.txt', url, err => { // for creating text file and save url
        if (err) {
          console.error(err);
        } else {
          console.log('The file has been saved!');  
        }
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

