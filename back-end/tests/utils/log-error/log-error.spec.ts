import { LogError } from '@/utils/log-error/log-error'
import fs from 'fs'

describe('LogErrorFile', () => {
  
    test('Should create a folder and file to add errors', async () => {

        const lgError = new LogError()
        lgError.log('test-error')
        const dir = './logs/'
        const file = './logs/log-errors.log'
        expect(fs.existsSync(dir)).toBeTruthy()
        expect(fs.existsSync(file)).toBeTruthy()
        fs.writeFile('./logs/log-errors.log', '', function(){console.log('done')})  
    })
})


