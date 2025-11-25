import { os } from '../os'

export const example = {
  test: os.example.test.handler(async () => {
    return {
      message: 'Hello from ORPC',
    }
  }),
}
