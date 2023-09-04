import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AddPostForm from "./AddPostForm";

interface CustomDialogProps {
  closeModal: () => void;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ closeModal }) => {
  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="  max-w-[616px] p-12  align-middle transform bg-[#F3F0EE] rounded-[24px] shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex justify-center text-lg font-bold text-[20px] leading-[26px] text-[#17494D] font-primary"
                >
                  افزودن پست
                </Dialog.Title>
                <AddPostForm
                  onSubmit={closeModal}
                  onCancel={closeModal}
                  onAdd={closeModal}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CustomDialog;
