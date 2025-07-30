export interface StagesListType {
    data: SingleStagesListType[]
    count: number
  }
  
  export interface SingleStagesListType {
    _id: string
    createdBy: string
    name: string
    status: string
    details: string
    clientId: string
    createdAt: string
    updatedAt: string
    __v: number
    stages: number
  }
  
  export interface StageDetailsType {
    _id: string
    name: string
    status: string
    stages: Stage[]
  }
  
  export interface Stage {
    _id: string
    createdBy: string
    name: string
    status: string
    tasks: Task[]
  }
  
  export interface Task {
    _id: string
    createdBy: string
    stageId: string
    name: string
  }
  