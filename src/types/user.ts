type Address ={
  city: string
  state: string
  country: string
}

export type User = {
  first_name: string
  last_name: string
  email: string
  password: string
  company_name: string
  phone_number: string
  confirm_password?: string
  user_id?: string
  invite_code?: string
  invited_by?: string
  gender?:string
  birth_year?: number
  race?: string
  address_id?: string
  address?: Address
}
