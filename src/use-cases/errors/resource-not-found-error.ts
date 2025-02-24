export class ResourceNotFoundError extends Error {
    constructor() {
        super('Resource não encontrada')
    }
}