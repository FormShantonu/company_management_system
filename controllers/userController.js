import * as userService from "../services/user.service.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const createUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      data: {
        userId: user._id,
        companyId: user.companyId,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

export const getUser = asyncHandler(async (req, res, next) => {
  try {
    const [user] = await userService.getUserDetails(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});
