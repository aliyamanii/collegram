import { toast } from "react-toastify";
import successIcon from "../assets/photos/check-circle.svg";
import errorIcon from "../assets/photos/workflow-status-problem.svg";
import infoIcon from "../assets/photos/info-circle.svg";

export function successToast(massage: string) {
  toast(massage, {
    className:
      "font-secondary text-base bg-green-100 rounded-2xl text-center w-[400px]",
    icon: () => <img src={successIcon} alt="" />,
  });
}

export function errorToast(massage: string) {
  toast(massage, {
    className:
      "font-secondary text-base bg-red-100 rounded-2xl text-center w-[400px]",
    icon: () => <img src={errorIcon} alt="" />,
  });
}

export function infoToast(massage: string) {
  toast(massage, {
    className:
      "font-secondary text-base bg-blue-100 rounded-2xl text-center w-[400px]",
    icon: () => <img src={infoIcon} alt="" />,
  });
}
