export type BoardDetailsStatusType = {
  _id: string
  status: 'active' | 'completed'
  todo: Todo[]
  inprogress: any[]
  done: any[]
}

export interface Todo {
  _id: string
  createdBy: string
  name: string
  status: string
  boardId: string
  templateId: any
  clientId: string
  createdAt: string
  updatedAt: string
  __v: number
  tasks: Task[]
}

export interface Task {
  _id: string
  createdBy: string
  stageId: string
  name: string
  position?: number
  status: 'todo' | 'in progress' | 'done'
  startDate?: string
  endDate?: string
  collaboratorIds: string[]
  dependentOn: string[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface TaskDetailsType {
  _id: string
  createdBy: string
  stageId: string
  name: string
  position: any
  status: string
  startDate: any
  endDate: any
  collaboratorIds: string[]
  dependentOn: string[]
  createdAt: string
  updatedAt: string
  __v: number
  clientId: string
  projectId: string
  boardId: string
  collaborators: Collaborator[]
  tasks: Task[]
  stageName?: string
  activities?: Activity[]
  
}

export interface Activity {
  _id: string
  createdBy: string
  taskId: string
  action: string
  clientId: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Collaborator {
  _id: string
  clientId: string
  email: string
  name: string
  phone: string
  status: string
  role: string
  registrationType: string
  isVerified: boolean
  isRegistered: boolean
  deactivateDate: any
  verificationCode: any
  avatar: any
  lastLogin?: string
  createdAt: string
  updatedAt: string
  createdBy: string
  stripeCustomerId: any
  receiveUpdate?: string
}

export interface Task {
  _id: string
  createdBy: string
  stageId: string
  name: string
  position?: number
  status: 'todo' | 'in progress' | 'done'
  startDate?: string
  endDate?: string
  collaboratorIds: string[]
  dependentOn: string[]
  __v: number
  clientId: string
  stageName: string
}






export interface BoardDetailsType {
  _id: string
  status: string
  stages: Stage[]
}

export interface Stage {
  _id: string
  createdBy: string
  name: string
  status: string
  boardId: string
  templateId: any
  clientId: string
  createdAt: string
  updatedAt: string
  __v: number
  tasks: Task[]
}

export interface Task {
  _id: string
  createdBy: string
  stageId: string
  name: string
  position?: number
  status: 'todo' | 'in progress' | 'done'
  startDate?: string
  endDate?: string
  collaboratorIds: string[]
  dependentOn: string[]
  createdAt: string
  updatedAt: string
  __v: number
  clientId: string
}
