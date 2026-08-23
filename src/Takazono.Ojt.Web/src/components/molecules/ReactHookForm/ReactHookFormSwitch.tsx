import { FormControlLabel, Switch } from '@mui/material'
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
  disabled?: boolean
}

export const ReactHookFormSwitch = <T extends FieldValues>({ control, name, label, disabled }: Props<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormControlLabel
        control={
          <Switch checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} disabled={disabled} />
        }
        label={label}
      />
    )}
  />
)
