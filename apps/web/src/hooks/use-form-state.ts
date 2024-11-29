import { type FormEvent, useState, useTransition } from 'react'

interface FormStateProps {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export function useFormState(
  action: (data: FormData) => Promise<FormStateProps>,
  initialState?: FormStateProps,
) {
  const [isPending, startTransition] = useTransition()
  const [formState, setFormState] = useState(
    initialState ?? { success: false, message: null, errors: null },
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)

      setFormState(state)
    })
  }

  return [formState, handleSubmit, isPending] as const
}
