import { slugify } from '~/utils/formatters';
import { boardModel } from '~/models/boardModel';
import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';
import { cloneDeep } from 'lodash';

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    };

    const createdBoard = await boardModel.createNew(newBoard);
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);
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

    const resBoard = cloneDeep(board);
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString());
    });

    //Xóa mảng cards khỏi board ban đầu
    delete resBoard.cards;

    return resBoard;
  } catch (error) {
    throw new error;
  }
};

export const boardService = {
  createNew,
  getDetails
};
