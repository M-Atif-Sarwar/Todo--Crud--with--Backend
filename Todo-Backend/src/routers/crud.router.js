import { Router } from "express";
import { AddData, deleteItem, getAllData, updateTodo } from "../controllers/data.controller.js";

const router=Router()

router.route('/AddData').post(AddData)
router.route('/todo-data').get(getAllData)
router.route('/todo-update').put(updateTodo)
router.route('/:id').delete(deleteItem)


export default router