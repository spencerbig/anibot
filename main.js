//ani bot
const Discord = require('discord.js');
const axios = require("axios");

const uri = "https://animechanapi.xyz/api/quotes/random";
const apiKey = '/ahahahahaaha i accidentally posted the key here but i made a new one u thought aha';


//discord bot client 
const client = new Discord.Client();
const prefix = '!';

//node . to turn bot online
client.once('ready', () => {
    console.log('Ani Bot is ONLINE!');
});


client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //splice the command can use " " or + operator
    const args = message.content.slice(prefix.length).split(/ +/);
    const riotName = args.slice(2).join(" ");
    const command = args.shift().toLowerCase();

    //access league name and encryptedID
    const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${riotName}?api_key=` + apiKey;
    let getName = async () => {
        let response = await axios.get(url);
        //access data first array element and then can use inner elements
        let name = response.data.name;

        return name;
    };

    let getEncryptedID = async () => {
        let response = await axios.get(url);
        //access data first array element and then can use inner elements
        let level = response.data.id;

        return level;
    };


    //name commands and outputs
    if (command === 'ani') {
        if (!args.length) {
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FF338A')
                .addField(`Try the following commands`, `!ani: inspo, omg, rank (username), flex (username)`)
                .setImage(`https://cdn.wallpapersafari.com/47/11/P6kDNQ.jpg`)
                .setFooter('ani ani', 'https://www.dlf.pt/dfpng/middlepng/151-1512407_zero-two-png-zero-two-anime-02-transparent.png');

            return message.channel.send(exampleEmbed);
            //${message.author}
        }

        else if (args[0] === 'inspo') {
            let getQuote = async () => {
                let response = await axios.get(uri);
                let quote = response.data.data[0].quote;

                return quote;
            };

            let getCharacter = async () => {
                let response = await axios.get(uri);
                let char = response.data.data[0].character;

                return char;
            };

            let quoteData = await getQuote();
            let charData = await getCharacter();

            console.log(quoteData);
            console.log(charData);

            message.channel.send(require('util').inspect(quoteData));
            message.channel.send(require('util').inspect(charData).replace(/'/g, ''));

        }

        else if (args[0] === 'omg') {

            //https://stackoverflow.com/questions/64661151/how-do-i-get-a-random-image-from-my-local-file-and-place-it-on-embed-in-discord
            var fs = require('fs');
            var files = fs.readdirSync('./images');
            let chosenFile = files[Math.floor(Math.random() * files.length)];

            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('~OMG~')
                .setDescription('random zero-two-uwu swag')
                //must attach files location and then set image for local images
                .attachFiles(`./images/${chosenFile}`)
                .setImage(`attachment://${chosenFile}`)

            message.channel.send(exampleEmbed);


        } else if (args[0] === 'rank') {

            let encryptedId = await getEncryptedID().catch(err => {
                console.error(err)
                return new Error('Error getting EncryptedID')
            });

            const url2 = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedId}?api_key=` + apiKey;

            let getRank = async () => {
                let response = await axios.get(url2).catch(err => {
                    console.error(err)
                    return new Error('Error getting rank data')
                });

                //access data first array element and then can use inner elements
                if (response.data[0].queueType == "RANKED_SOLO_5x5") {
                    //use [0] for flex and [1] for 5v5 RANK
                    let regRank = await response.data[0];

                    let tier = response.data[0].tier;
                    let rank = response.data[0].rank;
                    let wins = response.data[0].wins;
                    let lp = response.data[0].leaguePoints;
                    let qType = response.data[0].queueType;


                    console.log(regRank);

                    //reurn as an object
                    return {
                        tier,
                        rank,
                        wins,
                        lp,
                        qType
                    }
                } else if (response.data[1].queueType == "RANKED_SOLO_5x5") {
                    let regRank = await response.data[1];

                    let tier = response.data[1].tier;
                    let rank = response.data[1].rank;
                    let wins = response.data[1].wins;
                    let lp = response.data[1].leaguePoints;
                    let qType = response.data[1].queueType;


                    console.log(regRank);

                    //reurn as an object
                    return {
                        tier,
                        rank,
                        wins,
                        lp,
                        qType
                    }
                }
            };

            //rank info
            let rankData = await getRank().catch(err => {
                console.error(err)
                return new Error('Error using getRank()')
            });

            //name
            try {
                lolName = await getName();
            } catch (error) {
                console.log('Promise unfulfilled. Could not get league name :(')
            }

            //get Icon
            function getLeagueIcon() {
                if (rankData.tier == "IRON" & rankData.rank == "IV") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Iron_4.png/revision/latest/scale-to-width-down/130?cb=20181229234928';
                }
                else if (rankData.tier == "IRON" & rankData.rank == "III") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/9/95/Season_2019_-_Iron_3.png/revision/latest/scale-to-width-down/130?cb=20181229234927';
                }
                else if (rankData.tier == "IRON" & rankData.rank == "II") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/5f/Season_2019_-_Iron_2.png/revision/latest/scale-to-width-down/130?cb=20181229234927';
                }
                else if (rankData.tier == "IRON" & rankData.rank == "I") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/0/03/Season_2019_-_Iron_1.png/revision/latest/scale-to-width-down/130?cb=20181229234926';
                }
                else if (rankData.tier == "BRONZE" & rankData.rank == "IV") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/5a/Season_2019_-_Bronze_4.png/revision/latest/scale-to-width-down/130?cb=20181229234913';
                }
                else if (rankData.tier == "BRONZE" & rankData.rank == "III") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/8/81/Season_2019_-_Bronze_3.png/revision/latest/scale-to-width-down/130?cb=20181229234912';
                }
                else if (rankData.tier == "BRONZE" & rankData.rank == "II") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/a/ac/Season_2019_-_Bronze_2.png/revision/latest/scale-to-width-down/130?cb=20181229234911';
                }
                else if (rankData.tier == "BRONZE" & rankData.rank == "I") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/f/f4/Season_2019_-_Bronze_1.png/revision/latest/scale-to-width-down/130?cb=20181229234910';
                }
                else if (rankData.tier == "SILVER" & rankData.rank == "IV") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/52/Season_2019_-_Silver_4.png/revision/latest/scale-to-width-down/130?cb=20181229234938';
                }
                else if (rankData.tier == "SILVER" & rankData.rank == "III") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/1/19/Season_2019_-_Silver_3.png/revision/latest/scale-to-width-down/130?cb=20181229234937';
                }
                else if (rankData.tier == "SILVER" & rankData.rank == "II") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/56/Season_2019_-_Silver_2.png/revision/latest/scale-to-width-down/130?cb=20181229234936';
                }
                else if (rankData.tier == "SILVER" & rankData.rank == "I") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Silver_1.png/revision/latest/scale-to-width-down/130?cb=20181229234936';
                }
                else if (rankData.tier == "GOLD" & rankData.rank == "IV") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/c/cc/Season_2019_-_Gold_4.png/revision/latest/scale-to-width-down/130?cb=20181229234922';
                }
                else if (rankData.tier == "GOLD" & rankData.rank == "III") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/a/a6/Season_2019_-_Gold_3.png/revision/latest/scale-to-width-down/130?cb=20181229234921';
                }
                else if (rankData.tier == "GOLD" & rankData.rank == "II") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/8/8a/Season_2019_-_Gold_2.png/revision/latest/scale-to-width-down/130?cb=20181229234921';
                }
                else if (rankData.tier == "GOLD" & rankData.rank == "I") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/9/96/Season_2019_-_Gold_1.png/revision/latest/scale-to-width-down/130?cb=20181229234920';
                }
                else if (rankData.tier == "PLATINUM" & rankData.rank == "IV") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/a/ac/Season_2019_-_Platinum_4.png/revision/latest/scale-to-width-down/130?cb=20181229234934';
                }
                else if (rankData.tier == "PLATINUM" & rankData.rank == "III") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/2/2b/Season_2019_-_Platinum_3.png/revision/latest/scale-to-width-down/130?cb=20181229234934';
                }
                else if (rankData.tier == "PLATINUM" & rankData.rank == "II") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/a/a3/Season_2019_-_Platinum_2.png/revision/latest/scale-to-width-down/130?cb=20181229234933';
                }
                else if (rankData.tier == "PLATINUM" & rankData.rank == "I") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/74/Season_2019_-_Platinum_1.png/revision/latest/scale-to-width-down/130?cb=20181229234932';
                }
                else if (rankData.tier == "DIAMOND" & rankData.rank == "IV") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/e/ec/Season_2019_-_Diamond_4.png/revision/latest/scale-to-width-down/130?cb=20181229234919';
                }
                else if (rankData.tier == "DIAMOND" & rankData.rank == "III") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/d/dc/Season_2019_-_Diamond_3.png/revision/latest/scale-to-width-down/130?cb=20181229234918';
                }
                else if (rankData.tier == "DIAMOND" & rankData.rank == "II") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Diamond_2.png/revision/latest/scale-to-width-down/130?cb=20181229234918';
                }
                else if (rankData.tier == "DIAMOND" & rankData.rank == "I") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/9/91/Season_2019_-_Diamond_1.png/revision/latest/scale-to-width-down/130?cb=20181229234917';
                }
                else if (rankData.tier == "MASTER") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/1/11/Season_2019_-_Master_1.png/revision/latest/scale-to-width-down/130?cb=20181229234929';
                }
                else if (rankData.tier == "GRANDMASTER") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/76/Season_2019_-_Grandmaster_1.png/revision/latest/scale-to-width-down/130?cb=20181229234923';
                }
                else if (rankData.tier == "CHALLENGER") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/5f/Season_2019_-_Challenger_1.png/revision/latest/scale-to-width-down/130?cb=20181229234913';

                }
            }



            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FF338A')
                .setTitle(`${lolName}'s ${rankData.qType} Rank is`)
                .addField(`${rankData.tier} ${rankData.rank}`, `${rankData.wins} wins ${rankData.lp} lp`)
                .setImage(getLeagueIcon())
                .setFooter('ani ani', 'https://www.dlf.pt/dfpng/middlepng/151-1512407_zero-two-png-zero-two-anime-02-transparent.png');

            message.channel.send(exampleEmbed);

        } else if (args[0] === 'flex') {

            let encryptedId = await getEncryptedID().catch(err => {
                console.error(err)
                return new Error('Error getting EncryptedID')
            });

            const url2 = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedId}?api_key=` + apiKey;

            let getRank = async () => {
                let response = await axios.get(url2).catch(err => {
                    console.error(err)
                    return new Error('Error getting rank data')
                });

                //access data first array element and then can use inner elements
                if (response.data[0].queueType == "RANKED_FLEX_SR") {
                    //use [0] for flex and [1] for 5v5 RANK
                    let regRank = await response.data[0];

                    let tier = response.data[0].tier;
                    let rank = response.data[0].rank;
                    let wins = response.data[0].wins;
                    let lp = response.data[0].leaguePoints;
                    let qType = response.data[0].queueType;


                    console.log(regRank);

                    //reurn as an object
                    return {
                        tier,
                        rank,
                        wins,
                        lp,
                        qType
                    }
                } else if (response.data[1].queueType == "RANKED_FLEX_SR") {
                    let regRank = await response.data[1];

                    let tier = response.data[1].tier;
                    let rank = response.data[1].rank;
                    let wins = response.data[1].wins;
                    let lp = response.data[1].leaguePoints;
                    let qType = response.data[1].queueType;


                    console.log(regRank);

                    //reurn as an object
                    return {
                        tier,
                        rank,
                        wins,
                        lp,
                        qType
                    }
                }
            };

            //rank info
            let rankData = await getRank().catch(err => {
                console.error(err)
                return new Error('Error using getRank()')
            });

            //name
            try {
                lolName = await getName();
            } catch (error) {
                console.log('Promise unfulfilled. Could not get league name :(')
            }
            //get Icon
            function getLeagueIcon() {
                if (rankData.tier == "IRON" & rankData.rank == "IV") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Iron_4.png/revision/latest/scale-to-width-down/130?cb=20181229234928';
                }
                else if (rankData.tier == "IRON" & rankData.rank == "III") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/9/95/Season_2019_-_Iron_3.png/revision/latest/scale-to-width-down/130?cb=20181229234927';
                }
                else if (rankData.tier == "IRON" & rankData.rank == "II") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/5f/Season_2019_-_Iron_2.png/revision/latest/scale-to-width-down/130?cb=20181229234927';
                }
                else if (rankData.tier == "IRON" & rankData.rank == "I") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/0/03/Season_2019_-_Iron_1.png/revision/latest/scale-to-width-down/130?cb=20181229234926';
                }
                else if (rankData.tier == "BRONZE" & rankData.rank == "IV") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/5a/Season_2019_-_Bronze_4.png/revision/latest/scale-to-width-down/130?cb=20181229234913';
                }
                else if (rankData.tier == "BRONZE" & rankData.rank == "III") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/8/81/Season_2019_-_Bronze_3.png/revision/latest/scale-to-width-down/130?cb=20181229234912';
                }
                else if (rankData.tier == "BRONZE" & rankData.rank == "II") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/a/ac/Season_2019_-_Bronze_2.png/revision/latest/scale-to-width-down/130?cb=20181229234911';
                }
                else if (rankData.tier == "BRONZE" & rankData.rank == "I") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/f/f4/Season_2019_-_Bronze_1.png/revision/latest/scale-to-width-down/130?cb=20181229234910';
                }
                else if (rankData.tier == "SILVER" & rankData.rank == "IV") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/52/Season_2019_-_Silver_4.png/revision/latest/scale-to-width-down/130?cb=20181229234938';
                }
                else if (rankData.tier == "SILVER" & rankData.rank == "III") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/1/19/Season_2019_-_Silver_3.png/revision/latest/scale-to-width-down/130?cb=20181229234937';
                }
                else if (rankData.tier == "SILVER" & rankData.rank == "II") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/56/Season_2019_-_Silver_2.png/revision/latest/scale-to-width-down/130?cb=20181229234936';
                }
                else if (rankData.tier == "SILVER" & rankData.rank == "I") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Silver_1.png/revision/latest/scale-to-width-down/130?cb=20181229234936';
                }
                else if (rankData.tier == "GOLD" & rankData.rank == "IV") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/c/cc/Season_2019_-_Gold_4.png/revision/latest/scale-to-width-down/130?cb=20181229234922';
                }
                else if (rankData.tier == "GOLD" & rankData.rank == "III") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/a/a6/Season_2019_-_Gold_3.png/revision/latest/scale-to-width-down/130?cb=20181229234921';
                }
                else if (rankData.tier == "GOLD" & rankData.rank == "II") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/8/8a/Season_2019_-_Gold_2.png/revision/latest/scale-to-width-down/130?cb=20181229234921';
                }
                else if (rankData.tier == "GOLD" & rankData.rank == "I") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/9/96/Season_2019_-_Gold_1.png/revision/latest/scale-to-width-down/130?cb=20181229234920';
                }
                else if (rankData.tier == "PLATINUM" & rankData.rank == "IV") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/a/ac/Season_2019_-_Platinum_4.png/revision/latest/scale-to-width-down/130?cb=20181229234934';
                }
                else if (rankData.tier == "PLATINUM" & rankData.rank == "III") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/2/2b/Season_2019_-_Platinum_3.png/revision/latest/scale-to-width-down/130?cb=20181229234934';
                }
                else if (rankData.tier == "PLATINUM" & rankData.rank == "II") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/a/a3/Season_2019_-_Platinum_2.png/revision/latest/scale-to-width-down/130?cb=20181229234933';
                }
                else if (rankData.tier == "PLATINUM" & rankData.rank == "I") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/74/Season_2019_-_Platinum_1.png/revision/latest/scale-to-width-down/130?cb=20181229234932';
                }
                else if (rankData.tier == "DIAMOND" & rankData.rank == "IV") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/e/ec/Season_2019_-_Diamond_4.png/revision/latest/scale-to-width-down/130?cb=20181229234919';
                }
                else if (rankData.tier == "DIAMOND" & rankData.rank == "III") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/d/dc/Season_2019_-_Diamond_3.png/revision/latest/scale-to-width-down/130?cb=20181229234918';
                }
                else if (rankData.tier == "DIAMOND" & rankData.rank == "II") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Diamond_2.png/revision/latest/scale-to-width-down/130?cb=20181229234918';
                }
                else if (rankData.tier == "DIAMOND" & rankData.rank == "I") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/9/91/Season_2019_-_Diamond_1.png/revision/latest/scale-to-width-down/130?cb=20181229234917';
                }
                else if (rankData.tier == "MASTER") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/1/11/Season_2019_-_Master_1.png/revision/latest/scale-to-width-down/130?cb=20181229234929';
                }
                else if (rankData.tier == "GRANDMASTER") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/76/Season_2019_-_Grandmaster_1.png/revision/latest/scale-to-width-down/130?cb=20181229234923';
                }
                else if (rankData.tier == "CHALLENGER") {
                    return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/5f/Season_2019_-_Challenger_1.png/revision/latest/scale-to-width-down/130?cb=20181229234913';

                }
            }


            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FF338A')
                .setTitle(`${lolName}'s ${rankData.qType} Rank is`)
                .addField(`${rankData.tier} ${rankData.rank}`, `${rankData.wins} wins ${rankData.lp} lp`)
                .setImage(getLeagueIcon())
                .setFooter('ani ani', 'https://www.dlf.pt/dfpng/middlepng/151-1512407_zero-two-png-zero-two-anime-02-transparent.png');

            message.channel.send(exampleEmbed);

        }
    }
});


//login access to bot application -- keep at EOF
client.login('/ahahahahaaha i accidentally posted the key here but i made a new one u thought aha');
