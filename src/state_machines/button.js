import { createMachine } from 'xstate';

const buttonMachine = createMachine({
    id:"button",
    initial: 'idle',
    states: {
        idle: {
          on: {
            click: 'loading'
          }
        },
        loading: {
            on: {
              success: 'success',
              error: 'error'
            }
        },
        success: {
            on: {
                retry: 'idle'
            }
        },
        error: {
            on: {
                retry: 'idle'
            }
        },
    }
})