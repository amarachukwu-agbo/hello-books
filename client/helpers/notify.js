import { toast } from 'react-toastify';

class Notify {
  static notifyError(error) {
    toast.error(error, { autoClose: 2000, closeButton: false });
  }

  static notifyInfo(info) {
    toast.info(info, { autoClose: 2000, closeButton: false });
  }

  static notifySuccess(message) {
    toast.success(message, { autoClose: 2000, closeButton: false });
  }
}

export default Notify;
