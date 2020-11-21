const models = require("../models");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

module.exports = {

    post: async (req, res, next) => {

        const {
            userId,
            firstName,
            surname,
            phoneNumber,
            carLicensePlate,
            appointment,
            tag
        } = req.body;

        try {

            const date = new Date(appointment);

            // MOCKING VALUE TO GET ACTUAL HOURS
            date.setHours(date.getHours() + 2);

            const tagByName = await models.ServiceTag.findOne({
                name: tag
            });

            if (!tagByName) {
                res.sendStatus(500);
                return;
            }

            const userById = await models.User.findById(userId);

            if (!userById) {
                res.sendStatus(500);
                return;
            }

            const services = await models.Service.find({
                tag: ObjectId(tagByName._id)
            });

            const isDateBusy = services.some(service => {
               const currentServiceDate = new Date(service.appointment);

               let currentDate = new Date(date);

               if (currentDate.getFullYear() === currentServiceDate.getFullYear() &&
                   currentDate.getMonth() === currentServiceDate.getMonth() &&
                   currentDate.getDate() === currentServiceDate.getDate()){

                   if (currentDate.getTime() > currentServiceDate.getTime()){
                       currentDate.setMinutes(currentDate.getMinutes() - 30);
                       return currentDate.getTime() <= currentServiceDate.getTime();
                   }

                   else {
                       currentDate.setMinutes(currentDate.getMinutes() + 30);
                       return currentDate.getTime() >= currentServiceDate.getTime();
                   }
               }


            });

            if (isDateBusy){
                res.status(500).send({
                    message: "This time is already busy"
                });
                return;
            }

            const createdService =  await models.Service.create({
                user: ObjectId(userId),
                firstName,
                surname,
                phoneNumber,
                carLicensePlate,
                appointment: new Date(date),
                tag: ObjectId(tagByName._id)
            });

            res.send(createdService);
        }

        catch (e) {
            next(e);
        }
    },
};