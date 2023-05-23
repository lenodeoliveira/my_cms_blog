import { AddFileRepository } from '@/data/protocols/db/files/add-file-repository'
import { RemoveFileRepository } from '@/data/protocols/db/files/remove-file-repository'
import { LoadFilesRepository } from '@/data/protocols/db/files/load-files-repository'
import { File } from './entities/users'
import { FindOptions } from 'sequelize'
export class FilesMysqlRepository implements AddFileRepository, RemoveFileRepository, LoadFilesRepository {

    async addFile (file: AddFileRepository.Params): Promise<void> {
        await File.create(file)
    }

    async removeFile (text: string): Promise<void> {
        if (text) await File.destroy({
            where: {
                name: text
            }
        })
    
    }

    async loadAll (params: LoadFilesRepository.Params): Promise<LoadFilesRepository.Result> {
        const reqOffSet = Number(params.page)
        const reqLimit = Number(params.limit)

        const orderBy = params.orderBy ? params.orderBy : 'name'
        const orientation = params.orientation ? params.orientation : 'ASC'
        const offset =  isNaN(reqOffSet) ? 0 : reqOffSet
        const limit = isNaN(reqLimit) ? 10 : reqLimit

        const options: FindOptions<unknown> = {
            attributes: [
                'id',
                'name',
                'ext',
                'url',
                'size',
                'mime',
                'folderPath',
                'createdAt',
                'updatedAt'
            ],
            limit: limit,
            offset: offset,
            order: [[`${orderBy}`, `${orientation}`]]
        }

        const files = await File.findAndCountAll(options)
        return files
    }
}

 