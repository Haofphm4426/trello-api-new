import { slugify } from '~/utils/formatters';
import { boardModel } from '~/models/boardModel';
import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    };

    const createdBoard = await boardModel.createNew(newBoard);
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    return getNewBoard;
  } catch (error) {
    throw new error;
  }
};

const getDetails = async (boardId) => {
  try {

    const board = await boardModel.getDetails(boardId);
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND);
    }

    return board;
  } catch (error) {
    throw new error;
  }
};

export const boardService = {
  createNew,
  getDetails
};