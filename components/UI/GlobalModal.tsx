'use client'

import { Button } from "@/components/UI/Button";
import H2Text from "@/components/UI/H2Text";
import { useModalStore } from "@/store/useModalStore";
import { AnimatePresence, motion } from "framer-motion";

const GlobalModal = () => {
  const {
    isOpen,
    modalTitle,
    modalText,
    closeButtonText,
    confirmButtonText,
    confirmOnClick,
    closeModal,
  } = useModalStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-[10000] grid place-items-center cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-primaryText border-1 border-borderColor p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <H2Text>{modalTitle}</H2Text>
            <div className="text-secondaryText mt-2 text-sm ">{modalText}</div>
            <section className="flex items-center mt-6 gap-2">
              <Button
                buttonDivClassName="ml-auto"
                onClick={closeModal}
                variant={'outline'}
              >
                {closeButtonText}
              </Button>
              <Button
                onClick={confirmOnClick}
                buttonDivClassName=""
                variant='destructive'>
                {confirmButtonText}
              </Button>
            </section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalModal;
