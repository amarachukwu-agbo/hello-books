// import necessary module
import jsonfile from 'jsonfile';

/* Function writes to a json file
@param data is the data to be written to the file
@param file is the file path */
const writeData = (file, data) => {
  jsonfile.writeFileSync(file, data, { spaces: 2, EOL: '\r\n' });
};

export default writeData;