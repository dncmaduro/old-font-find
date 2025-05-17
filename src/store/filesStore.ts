import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface StoredFile {
  name: string
  type: string
  content: string // base64
}

interface FilesStore {
  files: StoredFile[]
  getAllFiles: () => StoredFile[]
  addFiles: (files: File[]) => void
  deleteFile: (name: string) => void
}

export const useFilesStore = create<FilesStore>()(
  persist(
    (set, get) => ({
      files: [],

      getAllFiles: () => get().files,

      addFiles: (newFiles) => {
        const readerPromises = newFiles.map((file) => {
          return new Promise<StoredFile>((resolve) => {
            const reader = new FileReader()
            reader.onload = () => {
              resolve({
                name: file.name,
                type: file.type,
                content: reader.result as string // base64
              })
            }
            reader.readAsDataURL(file)
          })
        })

        Promise.all(readerPromises).then((storedFiles) => {
          set((state) => ({
            files: [...state.files, ...storedFiles.filter((f) => !state.files.find((e) => e.name === f.name))]
          }))
        })
      },

      deleteFile: (name) =>
        set((state) => ({
          files: state.files.filter((f) => f.name !== name)
        }))
    }),
    {
      name: 'files-persistent'
    }
  )
)
