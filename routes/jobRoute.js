import { createJob, getAllJob, deleteJob, updateJob, showStats } from "../controllers/jobController.js";
import express from 'express'


const router = express.Router();

router
    .route('/')
    .post(createJob)
    .get(getAllJob)
router
    .route('/:id')
    .get(showStats)
    .patch(updateJob)
    .delete(deleteJob)



export default router