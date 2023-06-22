const { Pel_Elpha, Users } = require('../models');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const data = await Pel_Elpha.findAll({ include: [{ model: Users, attributes: ['nama', 'username'] }] });

            return res.status(200).json({
                status: true,
                message: 'success',
                data: data,
            });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const { nama, lama_bermain, telp } = req.body;
            const { user } = req;

            const createData = await Pel_Elpha.create({
                nama,
                lama_bermain,
                telp,
                user_id: user.id,
            });

            return res.status(201).json({
                status: true,
                message: 'Data Created!',
                data: createData,
            });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params;

            const update = await Pel_Elpha.update(req.body, { where: { id } });
            if (update[0] == 0) {
                return res.status(404).json({ status: false, message: 'Gagal Update!', data: null });
            }

            return res.status(200).json({ status: true, messsage: 'success', data: null });
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;

            const destroy = await Pel_Elpha.destroy({ where: { id } });

            if (!destroy) {
                return res.status(404).json({ status: false, message: `data with id ${id} not found!`, data: null });
            }

            return res.status(200).json({ status: true, message: 'success', data: null });
        } catch (error) {
            next(error);
        }
    },
};
