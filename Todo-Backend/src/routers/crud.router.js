import { Router } from "express";
import { AddData } from "../controllers/data.controller.js";

const router=Router()

router.route('/AddData').post(AddData)


export default router