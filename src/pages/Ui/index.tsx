import { yupResolver } from '@hookform/resolvers/yup'

import Button from '@/components/common/Button'
import { DatePicker } from '@/components/common/DatePicker'
import { Form, useForm } from '@/components/common/Form'
import Input from '@/components/common/Input'
import InputNumber from '@/components/common/InputNumber'
import InputPassword from '@/components/common/InputPassword'
import { Select } from '@/components/common/Select'
import { validateSchema } from '@/utils/validations/validate'

interface Options {
  value: string
  label: string
  disable: boolean
}

const options: Options[] = [
  { value: 'javascript', label: 'JavaScript', disable: false },
  { value: 'python', label: 'Python', disable: false },
  { value: 'java', label: 'Java', disable: false },
  { value: 'csharp', label: 'C#', disable: false },
  { value: 'ruby', label: 'Ruby', disable: false },
  { value: 'php', label: 'PHP', disable: false },
  { value: 'typescript', label: 'TypeScript', disable: false },
  { value: 'html', label: 'HTML', disable: false },
  { value: 'css', label: 'CSS', disable: false },
  { value: 'sql', label: 'SQL', disable: false },
  { value: 'swift', label: 'Swift', disable: false },
  { value: 'kotlin', label: 'Kotlin', disable: false },
  { value: 'go', label: 'Go', disable: false },
  { value: 'rust', label: 'Rust', disable: false },
  { value: 'scala', label: 'Scala', disable: false },
  { value: 'dart', label: 'Dart', disable: false },
  { value: 'r', label: 'R', disable: false }
]

const UiPage = () => {
  const form = useForm({
    resolver: yupResolver(validateSchema),
    mode: 'all'
  })

  return (
    <div className='w-[300px]'>
      <Input type='text' placeholder='Tên' allowClear={true} fullWidth loading />
      <div className='mt-4'>
        <Input type='text' placeholder='Tên' allowClear={true} fullWidth />
      </div>
      <div className='mt-4'>
        <Form form={form}>
          <Form.Item name='title' label='Tên'>
            <Input type='text' placeholder='Tên' allowClear={true} fullWidth />
          </Form.Item>
        </Form>
      </div>
      <div className='mt-4'>
        <Form form={form}>
          <Form.Item name='password' label='Mật khẩu'>
            <InputPassword placeholder='Mật khẩu' fullWidth />
          </Form.Item>
        </Form>
      </div>
      <div className='mt-4'>
        <InputNumber placeholder='Số' fullWidth />
      </div>
      <div className='mt-4'>
        <Select options={options} width='100%' />
      </div>
      <div className='mt-4'>
        <DatePicker />
      </div>
      <div className='mt-4'>
        <Button color='secondary'>Button Primary</Button>
      </div>
      <div className='mt-4'>
        <Button variant='outlined'>Button Outline</Button>
      </div>
      <div className='mt-4'>
        <Button>Button Primary</Button>
      </div>
      <div className='mt-4'>
        <Button loading>Button Primary</Button>
      </div>
      <div className='mt-4'>
        <Button loading variant='outlined'>
          Button Outline
        </Button>
      </div>
      <div className='mt-4'>
        <Button variant='text'>Button Text</Button>
      </div>
    </div>
  )
}

export default UiPage
