export const fetchGraphql =
  <TData, TVariables>(
    query: { toString(): string },
    variables?: TVariables,
  ): (() => Promise<TData>) =>
  async () => {
    let response: Response
    let result: {
      data?: TData
      errors?: { message: string; extensions?: { code?: string } }[]
      message?: string
    }
    try {
      response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.toString(), variables }),
        signal: AbortSignal.timeout(45_000),
      })
      result = await response.json()
    } catch {
      throw new Error(
        'Не удалось связаться с сервером. Проверьте соединение и попробуйте ещё раз.',
      )
    }
    if (!response.ok || result.errors?.length || !result.data) {
      const error = new Error(
        result.errors?.[0]?.message ||
          result.message ||
          'Не удалось отправить запрос. Попробуйте ещё раз.',
      )
      Object.assign(error, { code: result.errors?.[0]?.extensions?.code })
      throw error
    }
    return result.data
  }
