const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

router.get('/', gradeController.findAll);
router.get('/enrollment/:enrollmentId', gradeController.findByEnrollment);
router.post('/', roleMiddleware(['admin', 'professor']), gradeController.create);
router.put('/:id', roleMiddleware(['admin', 'professor']), gradeController.update);
router.delete('/:id', roleMiddleware(['admin']), gradeController.remove);

module.exports = router;
