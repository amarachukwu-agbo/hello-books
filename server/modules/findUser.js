// import necessary module
import readData from './readData';

/* Function finds the index of a user in users.json file
@param userId is the id of the user */
const findUserIndex = (userId) => {
  const data = readData('./data/users.json');
  const index = data.users.findIndex(user => user.id === userId);
  return index;
};
export default findUserIndex;