import React, { useState } from 'react'
import { CustomTextField } from 'components/custom/CustomTextField'
import { Save } from './utils/Save'
import { isValidFloat } from './utils/validators'

const Uniform1d = ({ ast }) => {
  const currentFieldValue = ast?.['internalField']?.[1]?.value
  const [fieldValue, setFieldValue] = useState(currentFieldValue || '0')
  const tokensToReplace = Object.values(ast?.['boundaryField'])
    .map((vars) => vars?.['value']?.[1])
    .filter((token) => token?.value == currentFieldValue)
  const vars = [{ foamObj: ast?.['internalField']?.[1], newValue: fieldValue }]
  for (let token of tokensToReplace) {
    vars.push({ foamObj: token, newValue: fieldValue })
  }
  const validate = () => {
    return isValidFloat(fieldValue)
  }
  return (
    <>
      <p />
      Adjust internal and boundary field values.
      <br />
      <CustomTextField
        style={{ width: '200px' }}
        value={fieldValue}
        validationFn={isValidFloat}
        onChange={(event) => setFieldValue(event.target.value)}
      />
      <p />
      <br />
      <Save vars={vars} isValid={validate()} />
    </>
  )
}

const Uniform3d = ({ ast }) => {
  const currentFieldValue = ast?.['internalField uniform']?.value?.[0]?.value
  const [fieldValue, setFieldValue] = useState(currentFieldValue || '0')
  const tokensToReplace = Object.values(ast?.['boundaryField'])
    .map((vars) => vars?.['value uniform']?.value?.[0])
    .filter((token) => token?.value == currentFieldValue)
  const vars = [
    {
      foamObj: ast?.['internalField uniform']?.value?.[0],
      newValue: fieldValue
    }
  ]
  for (let token of tokensToReplace) {
    vars.push({ foamObj: token, newValue: fieldValue })
  }
  const validate = () => {
    return isValidFloat(fieldValue)
  }
  return (
    <>
      <p />
      Adjust internal and boundary field values.
      <br />
      <CustomTextField
        value={fieldValue}
        validationFn={isValidFloat}
        onChange={(event) => setFieldValue(event.target.value)}
      />
      <p />
      <br />
      <Save vars={vars} isValid={validate()} />
    </>
  )
}

const Help = () => {
  return (
    <>
      <br />
      <h4>Edit Section</h4>
      <br />
      Select files on the right hand panel to adjust the case&apos;s settings.
      <br />
      Files in the <b>system</b> folder are a good place to start.
    </>
  )
}

export const Conditions = ({ fileData, ast }) => {
  switch (fileData['data']) {
    case 'U':
      return <Uniform3d key={fileData['data']} ast={ast} />
    case 'Ts':
    case 'T':
    case 'pc':
    case 'k':
    case 'nut':
    case 'p':
    case 'p_rgh':
    case 'ws':
    case 'gcr':
    case 'alphat':
    case 'epsilon':
      return <Uniform1d key={fileData['data']} ast={ast} />
    default:
      return <Help />
  }
}
