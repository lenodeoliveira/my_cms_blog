import { FindContentByIdRepository } from '@/data/protocols/db/content/find-content-by-id'
import { FindContentById } from '@/domain/usecases/content/find-content-by-id'

export class DbFindContentById implements FindContentById {
    constructor (private readonly findContentByIdRepository: FindContentByIdRepository) {}

    async findContent (id: string): Promise<boolean> {
        return await this.findContentByIdRepository.findById(id)
    } 
}