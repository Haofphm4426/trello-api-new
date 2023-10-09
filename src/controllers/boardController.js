import { StatusCodes } from 'http-status-codes';

const createNew = async (req, res) => {
  try {
    console.log(req.body);
    res.status(StatusCodes.OK).json({ message: 'POST from Validation: API create new board' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    });
  }
};

export const boardController = {
  createNew
};