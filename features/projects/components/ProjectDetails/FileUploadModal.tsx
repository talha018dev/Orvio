'use client'

import H2Text from "@/components/UI/H2Text";
import AddFileLinkForm from "@/features/projects/components/ProjectDetails/AddFileLinkForm";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const FileUploadModal = ({ projectId, isOpen, setIsOpen, refetchProjectDetails }: { projectId: string, isOpen: boolean; setIsOpen: Dispatch<SetStateAction<boolean>>, refetchProjectDetails: any }) => {
  const router = useRouter()


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur w-screen h-screen top-0 left-0 fixed inset-0 z-50 grid place-items-center cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-primaryText max-h-[80dvh] overflow-auto rounded-lg p-6 w-full max-w-lg shadow-xl cursor-default relative"
          >
            <H2Text>Add File Link</H2Text>
            <div className="text-secondaryText mt-2 text-sm ">Added link will be visible for both client and admin portal.</div>
            <AddFileLinkForm refetchProjectDetails={refetchProjectDetails} projectId={projectId} setIsOpen={setIsOpen} />

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FileUploadModal;