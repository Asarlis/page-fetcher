const request = require('request');
const fs = require('fs');
const readline = require('readline')
const domain = process.argv[2]; // url to be downloaded
const file = process.argv[3];   // path to new/updated file

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


request(domain, (error, response, body) => {
  if (error) {
        console.log('error:', error);
      }
  fs.writeFile(`${file}`, body, (error)=> {

    if(error){
      console.log("This path is invalid", error);
      rl.close()
    } 
    if (fs.existsSync(file)) {
      rl.question("Would you like to overwrite this file? y / n  ", (answer) =>{
        if (answer === "n"){
          console.log("File was not overwritten");
          rl.close();
        }
        if (answer === "y") {
        console.log(`Downloaded and saved ${response.headers["content-length"]} bytes to ${file}`)
        rl.close();
      }
    })
  }
  })
})

