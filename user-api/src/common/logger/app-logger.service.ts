import { Injectable, Logger, Scope } from '@nestjs/common'

@Injectable({ scope: Scope.TRANSIENT })
export class AppLoggerService extends Logger {
    log(message: string, trace?: string) {
        super.log(message, trace)
    }

    debug(message: string, trace?: string, context?: string) {
        super.debug(message, trace)
    }

    error(message: string, trace?: any, context?: string) {
        if (trace instanceof Error) {
            return super.error(message, trace.stack, context)
        }

        super.error(message, trace, context)
    }
}
