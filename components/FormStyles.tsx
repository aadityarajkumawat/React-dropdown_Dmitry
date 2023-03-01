import { classNames } from '../utils'

export const FormStyles = ({
  disabled,
  hasError,
}: {
  disabled?: boolean
  hasError?: boolean
}) => {
  return classNames(
    '',
    disabled
      ? 'disabled:cursor-not-allowed bg-slate-50'
      : 'hover:border-blue-600 hover:ring-blue-600 focus:border-blue-600 focus:ring-blue-600 ',
    'block h-[40px] w-full rounded-md border-slate-300 text-base shadow-none outline-none placeholder-slate-400 pr-2.5',
    hasError
      ? 'border-red-300 pr-10 focus:border-red-500  focus:ring-red-500 hover:border-red-500'
      : '',
  )
}
