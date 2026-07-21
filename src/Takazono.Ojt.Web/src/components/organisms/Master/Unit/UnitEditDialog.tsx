import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { UnitDto } from '@/api/@types'
import { Box, Button, Drawer, Stack, TextField, Typography } from '@/components/atoms/Mui'
import { ReactHookFormSwitch } from '@/components/molecules/ReactHookForm/ReactHookFormSwitch'
import { useApi } from '@/hooks/useApi'
import { useLocalizationLabels } from '@/hooks/useLocalizationLabels'
import { useUnitSchema, type UnitFormValues } from '@/hooks/useUnitSchema'
import { deleteUnit, updateUnit } from '@/services/unitApi'

const styles = {
  drawerPaper: {
    width: { xs: '100%', sm: 440 },
    maxWidth: '100vw',
  },
  drawerBody: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    px: 3,
    py: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    bgcolor: 'background.paper',
    borderBottom: '1px solid',
    borderColor: 'divider',
  },
  formStack: {
    px: 3,
    py: 2,
    spacing: 2,
    overflowY: 'auto',
    flexGrow: 1,
  },
}

type Props = {
  unit: UnitDto | null
  onClose: () => void
  onSaved: () => void
}

export const UnitEditDialog = ({ unit, onClose, onSaved }: Props) => {
  const { getLabel } = useLocalizationLabels()
  const { api } = useApi()
  const schema = useUnitSchema()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UnitFormValues>({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (unit) {
      reset({ code: unit.code ?? '', name: unit.name ?? '', useFlag: unit.useFlag ?? true })
    }
  }, [unit, reset])

  if (!unit) return null

  const onSubmit = handleSubmit(async (values) => {
    await api(() => updateUnit(unit.sid!, { ...values, version: unit.version ?? '' }), {
      successMessage: getLabel('M0002') /* 更新しました。 */,
      onSuccess: onSaved,
    })
  })

  const handleDelete = async () => {
    if (!window.confirm(getLabel('M0004') /* 削除してよろしいですか？ */)) return
    await api(() => deleteUnit(unit.sid!), {
      successMessage: getLabel('M0003') /* 削除しました。 */,
      onSuccess: onSaved,
    })
  }

  return (
    <Drawer anchor="right" open onClose={onClose} slotProps={{ paper: { sx: styles.drawerPaper } }}>
      <Box sx={styles.drawerBody}>
        <Stack direction="row" spacing={2} sx={styles.header}>
          <Typography variant="h6">{getLabel('B0006') /* 編集 */}</Typography>
          <Stack direction="row" spacing={1}>
            <Button color="error" onClick={handleDelete}>
              {getLabel('B0005') /* 削除 */}
            </Button>
            <Button onClick={onClose}>{getLabel('B0004') /* キャンセル */}</Button>
            <Button variant="contained" onClick={onSubmit} disabled={isSubmitting}>
              {getLabel('B0003') /* 保存 */}
            </Button>
          </Stack>
        </Stack>
        <Stack spacing={2} sx={styles.formStack}>
          <TextField
            label={getLabel('T0032') /* 単位コード */}
            placeholder={getLabel('T0034', { value: getLabel('T0038') /* 00000000 */ }) /* 例）{value} */}
            {...register('code')}
            error={!!errors.code}
            helperText={errors.code?.message}
          />
          <TextField
            label={getLabel('T0033') /* 単位名称 */}
            placeholder={getLabel('T0034', { value: getLabel('T0039') /* 錠 */ }) /* 例）{value} */}
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <ReactHookFormSwitch control={control} name="useFlag" label={getLabel('T0011') /* 使用区分 */} />
        </Stack>
      </Box>
    </Drawer>
  )
}
