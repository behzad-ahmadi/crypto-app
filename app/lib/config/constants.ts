export enum Hash {
  modalChart = '#ModalChart',
}

export const Constants = {
  dateFormat: 'd MMMM y',
  ApiBseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  FileBseURL: `${process.env.NEXT_PUBLIC_API_FILE_BASE_URL}`,
  WebsiteBaseURL: `${process.env.NEXT_PUBLIC_WEBSITE_BASE_URL}`,
  WebsiteName: '',
  SessionName: '',
  ManageWizardMaxStep: 4,
  ChangeMobileWizardMaxStep: 3,
  DebounceSearchLength: 2,
} as const

export const Regex = {
  mobile:
    /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/,
  nationalCode: /^(?!(\d)\1{9})\d{10}$/,
}

export const Masks = {
  card: 'XXXX XXXX XXXX XXXX',
}

export enum FileType {
  Image = 'image/*',
  Video = 'video/*',
  Audio = 'audio/*',
  Document = 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}
