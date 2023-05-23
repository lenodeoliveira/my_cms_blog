import { LoadFiles } from '@/domain/usecases/files/load-files'

export const mockLoadFiles = (): LoadFiles.Result => {
    return {
        count: 1,
        rows: [{
            id: 'any_id',
            name: 'any_name',
            ext: 'any_ext',
            url: 'url',
            mime: 'any_mime',
            size: 1111,
            folderPath: 'any_path',
            createdAt: new Date(),
            updatedAt: new Date(),
            createdAtById: 'any_id',
            updatedById: 'any_id',
        }
        ]
    }   
}

