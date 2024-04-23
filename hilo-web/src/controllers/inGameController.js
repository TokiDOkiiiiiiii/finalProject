//Post req = username, password, score || res = rank
//Post req = username, password, upgradeType
//Get req = username, password || res = Whole JSON
const User = require('../models/User');

module.exports = {
    updateUserData: async (req, res) => {
        try {
            var listRank = await User.find({},{Score : true, _id : false, username :true}, {sort : {Score : -1}});
            var rank = 0;
            console.log(listRank);
            for (var i = 0; i < listRank.length; i++){
                if (req.body.Score >= listRank[i].Score){
                    rank = rank + i + 1;
                    break;
                }
                if (req.body.username === listRank[i].username){
                    rank--;
                }
            }
            // console.log(rank);
            console.log('affimative');
            await User.findOneAndUpdate({username : req.body.username, password : req.body.password}, 
                {   Score : req.body.Score, 
                    rollingTime : req.body.rollingTime,
                    highMul : req.body.highMul,
                    lowMul : req.body.lowMul,
                    hiloMul : req.body.hiloMul,
                    baseAdd : req.body.baseAdd,
                    autoDice : req.body.autoDice,
                    Ranking : rank
                });
            console.log(rank);
            req.body.Ranking = rank;
            res.cookie('sessionId', req.body);
            //console.log(rank ,req.body.Ranking);
            
            res.status(200).json(req.body);
            console.log("cookie change");
        }
        catch (e) {
            res.status(501).json({ error: "Not Implemented" });
        }
    }
};