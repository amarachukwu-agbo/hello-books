import { toast } from 'react-toastify';

class Notify {
  static notifyError(error) {
    toast.error(error, { autoClose: 2000, closeButton: false });
  }

  static notifyInfo(info) {
    toast(info, { autoClose: 2000, closeButton: false });
  }

  static notifySuccess(message) {
    toast.info(message, { autoClose: 2000, closeButton: false });
  }
}

export default Notify;
