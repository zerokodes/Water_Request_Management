const { request } = require("express");
const WaterRequest = require("../models/WaterRequest");

exports.createRequest = async (req, res) => {
  try {
    const newRequest = new WaterRequest(req.body);
    await newRequest.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Request created successfully",
        data: newRequest,
        code: 201,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error while creating a request",
        error: error.message,
        code: 500,
      });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await WaterRequest.find();
    if (!requests || requests == 0) {
      return res.status(404).json({
        success: true,
        message: "No request data found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Fetch successful",
      data: requests,
      code: 200,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching requests data",
      error: error.message,
      code: 500,
    });
  }
};

exports.getAllPendingRequests = async (req, res) => {
  try {
    const pendingRequests = await WaterRequest.find({ status: "Pending" });

    if (!pendingRequests || pendingRequests == 0) {
      return res.status(404).json({
        success: true,
        message: "No pending request data found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Fetch successful",
      data: pendingRequests,
      code: 200,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching pending requests data",
      error: error.message,
      code: 500,
    });
  }
};

exports.markRequestComplete = async (req, res) => {
  try {
    const updatedRequest = await WaterRequest.findByIdAndUpdate(
      req.params.id,
      { status: "Completed" },
      { new: true }
    );
    if (!updatedRequest || updatedRequest == 0) {
      return res.status(404).json({
        success: true,
        message: "No pending request data found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Fetch successful",
      data: updatedRequest,
      code: 200,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error marking requests data to completed",
      error: error.message,
      code: 500,
    });
  }
};

exports.getAllRequestsByCity = async (req, res) => {
  try {
    const { city } = req.params;
    const requests = await WaterRequest.find({ city });

    if (!requests || requests == 0) {
      return res.status(200).json({
        success: true,
        message: "No request data found in this city",
        data: []
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetch successful",
      data: requests,
      code: 200,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching requests data in this city",
      error: error.message,
      code: 500,
    });
  }
};

exports.getAllPendingRequestsByCity = async (req, res) => {
  try {
    const { city } = req.params;
    const pendingRequests = await WaterRequest.find({
      city,
      status: "Pending",
    });

    if (!pendingRequests || pendingRequests == 0) {
      return res.status(200).json({
        success: true,
        message: "No pending request data found in this city",
        data:[]
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetch successful",
      data: pendingRequests,
      code: 200,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching pending requests data",
      error: error.message,
      code: 500,
    });
  }
};

exports.cancelRequest = async (req, res) => {
  try {
    const cancelledRequest = await WaterRequest.findByIdAndUpdate(
      req.params.id,
      { status: "Cancelled" },
      { new: true }
    );
    if (!cancelledRequest || cancelledRequest == 0) {
      return res.status(404).json({
        success: true,
        message: "This pending request data can't found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Request cancelled successful",
      data: cancelledRequest,
      code: 200,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error cancelling requests",
      error: error.message,
      code: 500,
    });
  }
};
