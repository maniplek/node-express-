import { Router } from "express";
import usersRoutes from './users.mjs'
import productsRoutes from './products.mjs'

const router = Router()

router.use(usersRoutes)
router.use(productsRoutes)

export default router;