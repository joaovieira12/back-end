const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

router.get('/', enrollmentController.findAll);
router.get('/:id', enrollmentController.findById);
router.get('/student/:studentId', enrollmentController.findByStudent);
router.post('/', roleMiddleware(['admin']), enrollmentController.create);
router.put('/:id', roleMiddleware(['admin']), enrollmentController.updateStatus);
router.delete('/:id', roleMiddleware(['admin']), enrollmentController.remove);

module.exports = router;
