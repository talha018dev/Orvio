export interface ActivityDetailsType {
  totalStep: number
  doneStep: number
  currentStepName: string
  tasks: Task[]
  files: File[]
}

export interface Task {
  _id: string
  createdBy: string
  stageId: string
  name: string
  position: any
  status: 'todo' | 'in progress' | 'done'
  startDate: any
  endDate: any
  collaboratorIds: any[]
  dependentOn: any[]
  clientId: string
  statusChangedAt: string
  createdAt: string
  updatedAt: string
  __v: number
  collaborators: any[]
  stageName: string
}

export interface File {
  _id: string
  createdBy: string
  name: string
  url: string
  key: any
  uploadedDate: string
  size: any
  expirationDate: string
  type: string
  status: string
  projectId: string
  clientId: string
  createdAt: string
  updatedAt: string
  __v: number
}
