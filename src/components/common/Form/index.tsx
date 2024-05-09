import React, { useEffect, useRef } from 'react'
import type { FieldValues, RegisterOptions, UseFormReturn } from 'react-hook-form'
import {
  Controller,
  FormProvider,
  useController as useRHFController,
  useFieldArray as useRHFFieldArray,
  useForm as useRHFForm,
  useFormContext as useRHFFormContext,
  useFormState as useRHFFormState,
  useWatch as useRHFWatch
} from 'react-hook-form'
import { isEmpty } from 'lodash'

export interface FormItemProps {
  label?: React.ReactNode
  children?: React.ReactElement
  name?: string
  className?: string
  rules?: RegisterOptions<FieldValues, string>
  formatter?: (value: any) => void
  parser?: (value: any) => number
  gap?: [number, number]
  layout?: 'horizontal' | 'vertical'
}

export interface FormProps<T extends FieldValues = FieldValues>
  extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  form?: UseFormReturn<T, any, T | undefined>
  children?: React.ReactNode
  onFinish?: (values: T) => void
  onValuesChange?: (
    changedValues: {
      [key: string]: any
    },
    allValues: T
  ) => void
  layout?: 'horizontal' | 'vertical'
  gap?: [number, number]
}

export const useForm = useRHFForm
export const useFieldArray = useRHFFieldArray
export const useWatch = useRHFWatch
export const useController = useRHFController
export const useFormContext = useRHFFormContext
export const useFormState = useRHFFormState

export const Form = <T extends FieldValues>({
  form,
  children,
  onFinish = () => {},
  onValuesChange = () => {},
  layout = 'vertical',
  gap = [8, 16],
  ...rest
}: FormProps<T>) => {
  const defaultMethods = useForm()
  const methods = (form || defaultMethods) as UseFormReturn<T, any, T | undefined>
  const { watch } = methods
  useEffect(() => {
    const subscription = watch((value, item) => {
      const keyName = (item.name || '').toString()
      const keyValue = value[(item.name || '').toString()]
      return onValuesChange(
        {
          [keyName]: keyValue
        },
        value as T
      )
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const newChild = React.cloneElement(child as React.ReactElement<any>, {
        layout,
        gap
      })
      return newChild
    }
    return child
  })

  return (
    <FormProvider {...methods}>
      <form {...rest} onSubmit={methods.handleSubmit(onFinish)}>
        {childrenWithProps}
      </form>
    </FormProvider>
  )
}

const FormItem: React.FC<FormItemProps> = (props) => {
  const { label, name, children, rules, className = '', formatter, gap = [10, 16], layout } = props
  const {
    control,
    formState: { errors, submitCount }
  } = useFormContext()
  const ref = useRef<HTMLParagraphElement | null>(null)
  const getFieldError = () => {
    if (!isEmpty(errors)) {
      const find = Object.keys(errors).find((key) => key === name)
      if (find) return errors[find]
      const splitName: string[] = (name || '').split('.')
      if (splitName.length > 1) {
        let errorObj: any
        splitName.map((key, idx) => {
          if (idx === 0 && errors[key]) errorObj = errors[key]
          if (idx > 0 && errorObj) errorObj = errorObj[key]
        })
        return errorObj
      }
    }
    return null
  }

  const isRequired = !!rules?.required

  const err = getFieldError()
  const isError = !isEmpty(err)
  const haveRef = JSON.stringify(err) === JSON.stringify(Object.values(errors).at(0)) ? ref : null
  useEffect(() => {
    if (isError && ref.current && submitCount > 0) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [submitCount])

  if (!children) return null

  return (
    <>
      <div
        style={{
          gap: gap[0],
          marginBottom: isError && layout === 'horizontal' ? 0 : gap[1]
        }}
        className={`flex  ${layout === 'horizontal' ? 'flex-row' : 'flex-col'} ${className}`}
        ref={haveRef}
      >
        {label && (
          <p className='min-w-fit gap-6 text-[14px] font-medium leading-tight text-text-primary'>
            {label} {isRequired && <span className='text-error'>*</span>}
          </p>
        )}
        <div className={`w-full`}>
          {name ? (
            <Controller
              control={control}
              name={name}
              rules={rules}
              render={({ field }) => {
                return React.cloneElement(children, {
                  ...field,
                  ref: null,
                  disabled: field.disabled || children.props.disabled,
                  onChange: (val: any) => {
                    field.onChange(val)
                    if (children.props.onChange) {
                      children.props.onChange(val)
                    }
                  },
                  ...(field.value
                    ? {
                        values: field.value, // select
                        value: formatter ? formatter(field.value) : field.value, // right approach
                        filelist: field.value, // upload
                        enabled: field.value // switch
                      }
                    : null),
                  ...(isError
                    ? {
                        className: `${children.props.className} border-red-500`
                      }
                    : null)
                })
              }}
            />
          ) : (
            children
          )}
        </div>
        {layout === 'vertical' && isError ? (
          <p className='inline-block text-sm text-error'>{err?.message?.toString()}</p>
        ) : null}
      </div>
      {layout === 'horizontal' && isError ? (
        <p
          style={{
            marginBottom: gap[1]
          }}
          className='mt-2 inline-block text-sm text-error'
        >
          {err?.message?.toString()}
        </p>
      ) : null}
    </>
  )
}

Form.Item = FormItem
