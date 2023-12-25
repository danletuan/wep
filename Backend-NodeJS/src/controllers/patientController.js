const doctorService = require("../services/doctorService");
let postBookAppointment = async (req, res) => {
    try {
        let infor = await doctorService.postBookAppointment(req.body);
        return res.status(200).json(infor);
    } catch (e) {

        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the server"
        })
    }
}

let postVerifyBookAppointment = async (req, res) => {
    try {
        let infor = await doctorService.postVerifyBookAppointment(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the server"
        })
    }
}

module.exports = {
    postBookAppointment : postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}