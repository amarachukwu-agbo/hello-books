// import necessary module
import jsonfile from 'jsonfile';

/* Function returns the content of a json file
@param file is the file path */
const readData = (file => jsonfile.readFileSync(file));
export default readData;
