import * as yup from 'yup'

const passwordRegExp =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!"#\$%&'\(\)\-=\^~\|@`\[\{;\+:\*\]\},<\.>\/\?_])[a-zA-Z0-9!"#\$%&'\(\)\-=\^~\|@`\[\{;\+:\*\]\},<\.>\/\?_]*$/

export const validateSchema = yup.object().shape({
  title: yup.string().required('Vui lòng nhập tiêu đề'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .matches(passwordRegExp, 'Mật khẩu bao gồm chữ in hoa, số và ký tự đặc biệt')
    .min(8, 'Độ dài mật khẩu phải có ít nhất 8 ký tự')
})
