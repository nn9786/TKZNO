import { Checkbox, FormControlLabel } from '@mui/material'
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
}

export const ReactHookFormSwitch = <T extends FieldValues>({ control, name, label }: Props<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormControlLabel
        control={<Checkbox checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />}
        label={label}
      />
    )}
  />
)
