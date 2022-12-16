import express from "express";
import {
    registerUser,
    assignTask,
    unassignTask,
    commonTask
} from "../controllers/UserController.js";

const router = express.Router();

router.post('/api/register', registerUser);
router.post('/api/assign', assignTask);
router.post('/api/unassign', unassignTask);
router.get('/api/tasks/common', commonTask);

export default router;