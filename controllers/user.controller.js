const { Users } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

module.exports = {
    register: async (req, res, next) => {
        try {
            const { nama, email, username, password } = req.body;

            if (!nama || !email || !username || !password) {
                return res.status(400).json({
                    status: false,
                    message: 'field required!',
                    data: null,
                });
            }

            const Hashpassword = await bcrypt.hash(password, 10);

            await Users.create({ nama, email, username, password: Hashpassword, level: 'user' });

            return res.status(200).json({
                status: true,
                message: 'success',
                data: null,
            });
        } catch (error) {
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {
            const { username, password } = req.body;

            const find = await Users.findOne({ where: { username } });
            if (!find) {
                return res.status(404).json({ status: false, message: 'Username not valid!', data: null });
            }

            const comparePassword = await bcrypt.compare(password, find.password);
            if (!comparePassword) {
                return res.status(401).json({ status: false, message: 'Password not valid!', data: null });
            }

            const payload = { id: find.id, username: find.username };
            const token = await jwt.sign(payload, SECRET_KEY);

            return res.status(200).json({ status: true, message: 'success', data: token });
        } catch (error) {
            next(error);
        }
    },

    getUser: async (req, res, next) => {
        try {
            const { user } = req;

            const data = await Users.findOne({
                where: { username: user.username },
                attributes: ['nama', 'email', 'username', 'level'],
            });

            return res.status(200).json({
                status: true,
                message: 'success',
                data: data,
            });
        } catch (error) {
            next(error);
        }
    },

    editUser: async (req, res, next) => {
        try {
            const { user } = req;

            const update = await Users.update(req.body, { where: { username: user.username } });
            if (update[0] == 0) {
                return res.status(404).json({ status: false, message: 'Gagal Update!', data: null });
            }

            return res.status(200).json({ status: true, messsage: 'success', data: null });
        } catch (error) {
            next(error);
        }
    },
};
