//Post req = username, password, score || res = rank
//Post req = username, password, upgradeType
//Get req = username, password || res = Whole JSON
const User = require('../models/User');

module.exports = {
    updateUserData: async (req, res) => {
        try {
            //console.log(req);
            await User.findOneAndUpdate({username : req.body.username, password : req.body.password}, 
                {   Score : req.body.Score, 
                    rollingTime : req.body.rollingTime,
                    highMul : req.body.highMul,
                    lowMul : req.body.lowMul,
                    hiloMul : req.body.hiloMul,
                    baseAdd : req.body.baseAdd,
                    autoDice : req.body.autoDice
                });
            const curUser = await User.findOne({username : req.body.username, password : req.body.password});
            console.log(curUser);
            res.cookie('sessionId', curUser);
        }
        catch (e) {
            res.status(501).json({ error: "Not Implemented" });
        }
    }
};