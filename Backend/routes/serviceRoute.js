const express = require("express");
const router = express.Router();

const serviceController = require('../controller/serviceController');
// routers
router.get("/getallservices",serviceController.getAllService);
router.post("/createservice",serviceController.createService);
router.delete("/deleteservicebyid/:id",serviceController.deleteService);
router.put("/updateservicebyid/:id",serviceController.updateService);
router.get("/getservicebyid/:id",serviceController.getServiceById);
router.put("/reduceservicequantity/:id", serviceController.reduceServiceQuantity);
module.exports = router;