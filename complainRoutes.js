router.post( 
'/submit', 
authMiddleware.verifyToken, 
complaintController.submitComplaint 
);