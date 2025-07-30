"use client";

import { AceternityTab } from "@/components/AceternityTab";
import BoardItems from "@/features/board/components/BoardItems";
import ProjectDoneCheckbox from "@/features/board/components/ProjectDoneCheckbox";
import { getBoardDetailsStatusByIdQueryOptions } from "@/features/board/queryOptions/boardQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

type BoardDetailsTabsProps = {
    projectId: string
    boardId: string
}

export function BoardDetailsTabs({ projectId, boardId }: BoardDetailsTabsProps) {
    const searchParams = useSearchParams()
    const currentTab = (searchParams.get('currentTab') ?? 'ToDo') as 'ToDo' | 'InProgress' | 'Done'

    const { data: boardDetails, isFetching: boardDetailsLoader, refetch: refetchBoardDetails } = useQuery(getBoardDetailsStatusByIdQueryOptions(boardId))

    const AnimatedTabContent = ({ isActive, tabKey, children, }: { isActive: boolean; tabKey: string; children: React.ReactNode; }) => (
        <AnimatePresence mode="wait">
            {isActive && (
                <motion.div
                    key={tabKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );

    const getTabItems = (tabKey: 'ToDo' | 'InProgress' | 'Done') => {
        const dataMap = {
            ToDo: boardDetails?.todo,
            InProgress: boardDetails?.inprogress,
            Done: boardDetails?.done,
        }
        return (
            <BoardItems
                listItems={dataMap[tabKey]}
                listItemsLoader={boardDetailsLoader}
                currentTab={currentTab}
                boardId={boardId}
                projectId={projectId}
                boardDetails={boardDetails}
            />
        )
    }

    const tabs = [
        {
            title: "To Do",
            value: "ToDo",
            content: (
                <AnimatedTabContent isActive={currentTab === "ToDo"} tabKey="ToDo">
                    {getTabItems("ToDo")}
                </AnimatedTabContent>
            ),
        },
        {
            title: "In Progress",
            value: "InProgress",
            content: (
                <AnimatedTabContent isActive={currentTab === "InProgress"} tabKey="InProgress">
                    {getTabItems("InProgress")}
                </AnimatedTabContent>
            ),
        },
        {
            title: "Done",
            value: "Done",
            content: (
                <AnimatedTabContent isActive={currentTab === "Done"} tabKey="Done">
                    <ProjectDoneCheckbox
                        boardDetails={boardDetails}
                        boardDetailsLoader={boardDetailsLoader}
                    />
                    {getTabItems("Done")}
                </AnimatedTabContent>
            ),
        },
    ]

    return (
        <div className="flex flex-col w-full items-start justify-start mt-6">
            <AceternityTab tabs={tabs} />
        </div>
    )
}






