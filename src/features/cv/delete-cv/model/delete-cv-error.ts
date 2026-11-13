export const deleteCvError = {
  forbidden: 'forbidden',
  generic: 'generic',
} as const

export type DeleteCvError = (typeof deleteCvError)[keyof typeof deleteCvError]

export const deleteCvErrorKey = {
  forbidden: 'deleteCv.errorForbidden',
  generic: 'deleteCv.errorGeneric',
} as const satisfies Record<DeleteCvError, `deleteCv.error${string}`>
