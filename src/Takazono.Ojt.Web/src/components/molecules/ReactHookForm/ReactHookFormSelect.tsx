import { MenuItem, TextField } from '@mui/material'
import type { ReactNode } from 'react'
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form'

type Option = {
  value: string
  label: ReactNode
}

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
  options: Option[]
  disabled?: boolean
  error?: boolean
  helperText?: ReactNode
}

export const ReactHookFormSelect = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  disabled,
  error,
  helperText,
}: Props<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TextField {...field} select label={label} disabled={disabled} error={error} helperText={helperText}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    )}
  />
)
