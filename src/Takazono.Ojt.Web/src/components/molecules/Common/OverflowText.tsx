// 省略表示テキスト
import { memo, useLayoutEffect, useRef, useState } from 'react'

import { Tooltip, Typography } from '@/components/atoms/Mui'

type Props = {
  text: string
}

const styles = {
  text: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    minWidth: 0,
  },
}

/** テーブルのセル等、幅が限られる場所で1行省略表示し、実際に省略されている場合のみホバーでTooltip表示する。 */
export const OverflowText = memo(({ text }: Props) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (el) {
      setIsOverflowing(el.scrollWidth > el.clientWidth)
    }
  }, [text])

  return (
    <Tooltip title={text} disableHoverListener={!isOverflowing}>
      <Typography ref={ref} variant="body2" component="span" sx={styles.text}>
        {text}
      </Typography>
    </Tooltip>
  )
})
OverflowText.displayName = 'OverflowText'
