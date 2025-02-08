const express = require("express");
const {
  createRequest,
  getAllRequests,
  getAllPendingRequests,
  getAllRequestsByCity,
  getAllPendingRequestsByCity,
  markRequestComplete,
  cancelRequest,
} = require("../controllers/waterRequest");

const { verifyToken, verifyAdmin, verifyCityAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/',createRequest);
router.get('/', verifyToken, verifyAdmin, getAllRequests);
router.get('/pending', verifyToken, verifyAdmin, getAllPendingRequests);
router.get('/city/:city', verifyToken, verifyCityAdmin, getAllRequestsByCity);
router.get('/city/:city/pending', verifyToken, verifyCityAdmin, getAllPendingRequestsByCity);
router.put('/:id/complete', verifyToken, verifyAdmin, markRequestComplete);
router.put('/:id/cancel', verifyToken, verifyAdmin, cancelRequest);

module.exports = router;
