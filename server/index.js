

let express = require("express");
let app = express();
var bodyParser = require('body-parser');

let http = require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');


let clientPath = path.join(__dirname, '../client');

let dataPath = path.join(__dirname, 'data.json');

app.use(express.static(clientPath));

app.get('/api/chirps', function(req, res){
    res.sendFile(dataPath);
});
/*    
app.route('/api/chirps')

.get((req,res) =>{
    res.sendFile(dataPath);
})

// .post((req,res) =>{
// */
app.post('/api/chirps', function(req,res){

fs.readFile(dataPath, 'utf8',function (err, data) {
        
          
     // Collect the data sent in the POST request. It will be JSON
                    // * Turn the collected data into a JS object
                    // * Push that JS object onto the array
                    // * Then, convert the array back into JSON and write it back to the data.json file
                    // * Finally, set the response code for ACCEPTED (201) and content type for json
                    // * End the response
        
                    let chirps = JSON.parse(data);
                    
                                    let incomingChirp = '';
                    
                                    req.on('data', function(chunk){
                                        incomingChirp += chunk;
                                    });
                    
                                    req.on('end', function(){
                                        let newChirp = JSON.parse(incomingChirp);
                                        chirps.push(newChirp);
                    
                                        let JSONChirps = JSON.stringify(chirps);
                                        fs.writeFile(dataPath, JSONChirps, function(err) {
                                            res.writeHead(201);
                                            res.end();
                                        });
                                    })
                                })
                           })
                        
                    

app.listen(3000);