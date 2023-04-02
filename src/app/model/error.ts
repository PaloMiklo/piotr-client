export class ClientError {
  constructor(private readonly _operation: string, private readonly _message: string, private readonly timestamp: string) {}
}
