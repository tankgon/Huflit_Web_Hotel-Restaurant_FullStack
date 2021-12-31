const Room = require("../models/Room");
class GetDetailController{
    getDetailRoom(req,res){
        //connect db id ROOM => AJAX => DETAIL ROOM
        const idRoom = req.param['idRoom']
        //res array room detail

    }
}
module.exports = new GetDetailController();