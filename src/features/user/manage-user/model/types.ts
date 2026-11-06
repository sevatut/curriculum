export type UserFormError =
  | 'required'
  | 'invalidEmail'
  | 'weakPassword'
  | 'emailTaken'
  | 'detailsNotSaved'
  | 'forbidden'
  | 'generic'

export type UserFormState = {
  error?: UserFormError
}
