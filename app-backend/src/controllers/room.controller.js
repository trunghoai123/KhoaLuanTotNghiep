const RoomService = require("../services/room.service");

class RoomController{

    addRoom = async (req, res, next) => {
        try {
            const result = await RoomService.addRoom(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }

    updateRoom = async (req, res, next) => {
        try {
            const result = await RoomService.updateRoom(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }
    deleteRoom = async (req, res, next) => {
        try {
            const result = await RoomService.deleteRoom(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }

    getAllRoom = async (req, res, next) => {
        try {
            const result = await RoomService.getAllRoom();
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    } 
    getRoomById = async (req, res, next) => {
        try {
            const result = await RoomService.getRoomById(req.params.roomId);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }

    getRoomMatchTimeAndSeat = async (req, res, next) => {
        try {
            const result = await RoomService.getRoomMatchTimeAndSeat(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    } 
}

module.exports = new RoomController()