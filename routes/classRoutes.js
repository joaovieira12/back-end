const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

router.get('/', classController.findAll);
router.get('/:id', classController.findById);
router.post('/', roleMiddleware(['admin']), classController.create);
router.put('/:id', roleMiddleware(['admin']), classController.update);
router.delete('/:id', roleMiddleware(['admin']), classController.remove);

module.exports = router;
