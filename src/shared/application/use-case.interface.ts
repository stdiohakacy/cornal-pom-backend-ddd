export interface UseCaseInterface<TIn, TOut> {
  execute(request: TIn): TOut | Promise<TOut>;
}
