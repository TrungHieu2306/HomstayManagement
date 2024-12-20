const Service = require("../models/service");

const serviceController = {
    // Get all services
    getAllService: async (req, res) => {
        try {
            console.log('get all service')
            const services = await Service.find({})
            return res.json(services);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    // create service
    createService: async (req, res) => {
        const newservice = new Service({
            name: req.body.name,
            desc: req.body.desc,
            price: req.body.price,
            imgs: req.body.imgs,
            quantity: req.body.quantity,
        });

        try {
            const serviceTemp = await Service.findOne({ name: req.body.name });
            if (!serviceTemp) {
                const service = await newservice.save();
                return res.json(service);
            }
            return res.json("");
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    // delete service by id
    deleteService: async (req, res) => {
        console.log("delete service");
        // console.log(req.params.id)
        try {
            const servicedel = await Service.findByIdAndDelete(req.params.id);
            res.send("delete service successfully");
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },

    // update service by id
    // updateService: async (req, res) => {
    //     try {
    //         console.log("update service");
    //         const serviceUpdate = await Service.findByIdAndUpdate(req.params.id, {
    //             name: req.body.name,
    //             desc: req.body.desc,
    //             price: req.body.price,
    //             imgs: req.body.imgs,
    //             quantity: req.body.quantity,
    //         })
    //         const result = await Service.find({})
    //         return res.json(result);
    //     } catch (error) {
    //         return res.status(400).json({ message: error });
    //     }
    // },

    updateService: async (req, res) => {
        try {
            console.log("Updating service details");
            const serviceUpdate = await Service.findByIdAndUpdate(
                req.params.id,
                {
                    name: req.body.name,
                    desc: req.body.desc,
                    price: req.body.price,
                    imgs: req.body.imgs,
                    quantity: req.body.quantity,
                },
                { new: true } // Return updated document
            );
            const result = await Service.find({});
            return res.json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    reduceServiceQuantity: async (req, res) => {
        const { reductionAmount } = req.body; // Only reductionAmount from body
        const serviceId = req.params.id; // Use ID from URL

        try {
            console.log("Reducing service quantity");
            const service = await Service.findById(serviceId);

            if (!service) {
                return res.status(404).json({ message: "Service not found" });
            }

            if (service.quantity < reductionAmount) {
                return res.status(400).json({ message: "Not enough quantity available" });
            }

            service.quantity -= reductionAmount;
            await service.save();

            return res.json({ message: "Quantity updated", quantity: service.quantity });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    getServiceById: async (req, res) => {
        try {
            console.log("get service by id");
            const service = await Service.findOne({ _id: req.params.id })
            return res.json(service);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },

}
module.exports = serviceController;