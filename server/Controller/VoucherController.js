import slugify from 'slugify';
import Voucher from '../Model/Voucher.js';

export const createVoucherController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).send({ success: false, message: 'Please enter voucher name ' });

        const checkExisting = await Voucher.findOne({ name });

        if (checkExisting) return res.status(403).send({
            success: false,
            message: 'Category with same name already exist'
        })

        const voucher = await new Voucher({ name, slug: slugify(name) });
        await voucher.save();
        if (!voucher) {
            return res.status(400).send({
                success: false,
                message: 'Something went wrong with creating voucher',
                error
            });
        }
        return res.status(201).send({
            success: true,
            message: 'Voucher created successfully',
            voucher
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Something went wrong with creating voucher',
            error
        });
    }

}

export const getVoucherController = async (req, res) => {
    try {
        const vouchers = await Voucher.find({});
        if (vouchers) {
            return res.status(200).send({
                success: true,
                message: 'Vouchers fetched successfully',
                vouchers
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Something went wrong with fetching vouchers',
            error
        });
    }
}

export const getSingleVoucherController = async (req, res) => {
    try {
        const voucher = await Voucher.findOne({ slug: req.params.slug });
        if (!voucher) {
            return res.status(404).send({
                success: true,
                message: 'Voucher doesnt exist',
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Voucher fetched successfully',
            voucher
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Something went wrong with creating voucher',
            error
        });
    }
}


export const deleteVoucherController = async (req, res) => {
    try {
        const deleteVoucher = await Voucher.findOneAndDelete({ slug: req.params.slug });
        if (!deleteVoucher) {
            return res.status(404).send({
                success: true,
                message: 'Voucher doesnt exist',
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Voucher deleted successfully',
            deleteVoucher
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Something went wrong with deleting voucher',
            error
        });
    }
}