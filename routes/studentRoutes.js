const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

router.get('/', studentController.findAll);
router.get('/:id', studentController.findById);
router.post('/', roleMiddleware(['admin', 'professor']), studentController.create);
router.put('/:id', roleMiddleware(['admin', 'professor']), studentController.update);
router.delete('/:id', roleMiddleware(['admin']), studentController.remove);

module.exports = router;
