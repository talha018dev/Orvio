'use client'

import { Button } from "@/components/UI/Button";
import H2Text from "@/components/UI/H2Text";
import { deleteTemporaryProjectUpdate } from "@/features/projects/queryFunctions/projectQueryFunctions";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const SpringModal = ({ isOpen, setIsOpen, projectIdFromEditProps, leaveUrl }: { isOpen: boolean; setIsOpen: Dispatch<SetStateAction<boolean>>, projectIdFromEditProps?: string, leaveUrl?: string }) => {
  const router = useRouter()

  const deleteTemporaryProjectMutation = useMutation<any, any, any, any>({ mutationFn: deleteTemporaryProjectUpdate })

  const deleteTemporaryProject = () => {
    const updatedData = {
      projectId: projectIdFromEditProps
    }

    deleteTemporaryProjectMutation.mutate(updatedData, {
      onSuccess: (data: any) => {
        if (projectIdFromEditProps) {
          router.push(`/projects/${projectIdFromEditProps}/details`)
        }
      },
      onError: (error: any) => {
      },
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-primaryText p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <H2Text>Cancel</H2Text>
            <div className="text-secondaryText mt-2 text-sm ">You are about to leave this page, all changes will be lost. Do you want to leave this page?</div>
            <section className="flex items-center mt-6 gap-2">
              <Button buttonDivClassName="ml-auto" onClick={() => setIsOpen(false)} variant={'outline'}>Stay</Button>
              {
                projectIdFromEditProps ?
                  <Button onClick={deleteTemporaryProject} buttonDivClassName="" variant='destructive'>Yes, Leave</Button> :
                  <Link
                    href={leaveUrl ?? '/projects'}
                    className=""
                  >
                    <Button buttonDivClassName="" variant='destructive'>Yes, Leave</Button>
                  </Link>
              }
            </section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpringModal;