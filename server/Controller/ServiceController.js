import Service from '../Model/Service.js';
import User from '../Model/User.js';
import { io } from '../server.js';


export const createNewServiceOrderController = async (req, res, next) => {
    try {
        const { title, description, category, image } = req.body;

        if (!title) {
            return res.status(400).send({
                success: false,
                message: 'title is required'
            });
        }
        if (!description) {
            return res.status(400).send({
                success: false,
                message: 'description is required'
            });
        }
        if (!category) {
            return res.status(400).send({
                success: false,
                message: 'category is required'
            });
        }

        const user = await User.findById(req.user._id);

        const newServiceRequest = await new Service({ title, category, phone: user.phone, userId: user._id })
        if (!newServiceRequest) {
            return res.status(409).send({
                success: false,
                message: 'Something went wrong with creating new service order',
                error
            });
        }

        newServiceRequest.save();


       io.emit('update','test');

        return res.status(201).send({
            success: true,
            message: 'Service request created',
            newServiceRequest
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Something went wrong with creating new service order',
            error
        });
    }
}


export const getAllServiceOrderRequestsController = async (req, res, next) => {
    try {
        const serviceOrderRequests = await Service.find({}).sort({ createdAt: -1 });
        if (serviceOrderRequests) {
            return res.status(200).send({
                success: true,
                message: 'All service requests fetched',
                serviceOrderRequests
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Something went wrong with fetching service order',
            error
        });
    }
}


export const getSingleServiceOrderRequestDetailsController = async (req, res, next) => {
    try {
        const serviceOrderRequest = await Service.findById(req.params.id).populate({ path: 'userId', select: '-password -createdAt -updatedAt -__v' });

        if (serviceOrderRequest) {
            return res.status(200).send({
                success: true,
                message: 'Service request fetched',
                serviceOrderRequest
            })
        }
        else {
            return res.status(400).send({
                success: false,
                message: 'No service request exist with this id',
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Something went wrong with fetching single service order',
            error
        });
    }
}


export const attendSingleServiceOrderRequestController = async (req, res, next) => {
    try {
        const serviceOrderRequest = await Service.findByIdAndUpdate(req.params.id, { status: 'Assigned To', attendantUserId: req.user._id }, { new: true });

        if (serviceOrderRequest) {
            return res.status(201).send({
                success: true,
                message: 'Service order request is being attended',
                serviceOrderRequest
            });
        }
        else {
            return res.status(400).send({
                success: false,
                message: 'No service request exist with this id',
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Something went wrong with fetching single service order',
            error
        });
    }
}


export const completeSingleServiceOrderRequestController = async (req, res, next) => {
    try {
        const serviceOrderRequest = await Service.findByIdAndUpdate(req.params.id, { status: 'Completed' }, { new: true });

        if (serviceOrderRequest) {
            return res.status(201).send({
                success: true,
                message: 'Service order request is being attended',
                serviceOrderRequest
            });
        }
        else {
            return res.status(400).send({
                success: false,
                message: 'No service request exist with this id',
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Something went wrong with fetching single service order',
            error
        });
    }
}