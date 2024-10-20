interface PostPutDataType {
  data: Record<string, any>
}

interface GetDataType {
  params?: Record<string, any>
}

interface DeleteType {
  id: number | string
}
