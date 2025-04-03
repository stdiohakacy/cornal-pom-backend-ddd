export interface UseCaseInterface<TIn, TOut> {
  execute(request: TIn): Promise<TOut>;
}
