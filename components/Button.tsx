import { forwardRef } from 'react'
import {classNames} from '../utils'

export const Button = forwardRef<HTMLButtonElement>(({className, children, ...other}, ref) => {
  return(
    <button
      ref={ref}
    className={classNames("inline-flex items-center justify-center rounded-md font-medium text-slate-900 whitespace-nowrap shadow-sm disabled:bg-slate-100 disabled:text-slate-400 py-2 max-h-10 px-2.5 gap-1 text-base border border-slate-300 bg-white text-slate-800 hover:bg-gray-50",className)}
      type="button"
      {...other}
    >
      {children}
    </button>
  )
})