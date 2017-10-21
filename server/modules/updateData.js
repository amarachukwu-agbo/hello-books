// import necessary modules
import readData from './readData';
import writeData from './writeData';

/* Function updates and reads a json file 
@param data is the data to be written to the file
@param file is the file path */
const updateData = (file, data) => {
  writeData(file, data);
  return readData(file);
};

export default updateData;