import { mapToJSON } from '@/helpers/functionHelpers'
import {create} from 'zustand'
import {persist} from 'zustand/middleware'

type useHashMapStore = {
  stageMap: any
  setStageMap: (id: string, name: string) => void
}

export const useHashMapStore = create<useHashMapStore>()(
  persist(
    (set, get) => ({
      stageMap: undefined,
      setStageMap: (id, name) => {
        const newMap = new Map(get().stageMap)
        newMap.set(id, name)
        set({stageMap: mapToJSON(newMap)})
      },
    }),
    {
      name: 'useHashMapStore',
    }
  )
)
