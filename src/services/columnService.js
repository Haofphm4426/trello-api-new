import { columnModel } from '~/models/columnModel';
import { boardModel } from '~/models/boardModel';


const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    };

    const createdColumn = await columnModel.createNew(newColumn);
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId);

    if (getNewColumn) {
      getNewColumn.cards = [];

      await boardModel.pushcolumnOrderIds(getNewColumn);
    }
    return getNewColumn;
  } catch (error) {
    throw new error;
  }
};

export const columnService = {
  createNew
};
