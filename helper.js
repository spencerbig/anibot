
//check
//fix json object data attainment
//use case if not one or the other solo/flex rank.
//use case neither of them and no ranked has been played this season.



//https.get(url2, (resp) => {
//     let data = '';

//     // A chunk of data has been recieved.
//     resp.on('data', (chunk) => {
//       data += chunk;
//     });

//     // The whole response has been received. Print out the result.
//     resp.on('end', () => {
//       console.log('Your summoner league rank is: ')
//       console.log((JSON.parse(data).summonerLevel));

//       var encryptedId = JSON.parse(data).id;


//       message.channel.send("Your summoner level is: ");
//       message.channel.send((JSON.parse(data).summonerLevel));

//     });

//   }).on("error", (err) => {
//     console.log("Error: " + err.message);
//   });

// message.channel.send(`Your rank is: ${rankData.tier} ${rankData.rank}`);
// message.channel.send(`${rankData.wins} wins ${rankData.lp} lp`);

// message.channel.send({ files: [{ attachment: `./images/${chosenFile}` }]});


