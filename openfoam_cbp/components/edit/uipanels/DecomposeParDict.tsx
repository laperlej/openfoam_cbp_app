import React, { useState, useEffect } from 'react'
import { Save } from './utils/Save'
import { isValidNonZero2Digit } from './utils/validators'
import { CustomTextField } from 'components/custom/CustomTextField'
import { CustomSelect } from 'components/custom/CustomSelect'

export const DecomposeParDict = ({ ast }) => {
  const [method, setMethod] = useState(ast?.['method']?.[0]?.value || 'scotch')
  const [nbSubdomains, setNbSubdomains] = useState(
    ast?.['numberOfSubdomains']?.[0]?.value || '2'
  )
  const [simpleX, setSimpleX] = useState(
    ast?.['simpleCoeffs']?.['n']?.value?.[0]?.value || '1'
  )
  const [simpleY, setSimpleY] = useState(
    ast?.['simpleCoeffs']?.['n']?.value?.[1]?.value || '1'
  )
  const [simpleZ, setSimpleZ] = useState(
    ast?.['simpleCoeffs']?.['n']?.value?.[2]?.value || '1'
  )
  const methodChoices = ['scotch', 'simple']
  const vars = [
    { foamObj: ast?.['method']?.[0], newValue: method },
    { foamObj: ast?.['numberOfSubdomains']?.[0], newValue: nbSubdomains },
    { foamObj: ast?.['simpleCoeffs']?.['n']?.value?.[0], newValue: simpleX },
    { foamObj: ast?.['simpleCoeffs']?.['n']?.value?.[1], newValue: simpleY },
    { foamObj: ast?.['simpleCoeffs']?.['n']?.value?.[2], newValue: simpleZ }
  ]
  useEffect(() => {
    setNbSubdomains(String(Number(simpleX) * Number(simpleY) * Number(simpleZ)))
  }, [simpleX, simpleY, simpleZ])
  const validate = () => {
    return (
      isValidNonZero2Digit(nbSubdomains) &&
      isValidNonZero2Digit(simpleX) &&
      isValidNonZero2Digit(simpleY) &&
      isValidNonZero2Digit(simpleZ)
    )
  }
  return (
    <div>
      <p />
      Choose a decomposition method
      <br />
      <CustomSelect
        options={methodChoices}
        onChange={(event) => setMethod(event.target.value)}
        value={method}
      />
      <p />
      {method === 'scotch' ? (
        <>
          Choose the number of subdomains.
          <br />
          <CustomTextField
            style={{ width: '50px' }}
            value={nbSubdomains}
            validationFn={isValidNonZero2Digit}
            onChange={(event) => setNbSubdomains(event.target.value)}
          />
          <p />
        </>
      ) : null}
      {method === 'simple' ? (
        <>
          <span>X: </span>
          <CustomTextField
            style={{ width: '50px' }}
            value={simpleX}
            validationFn={isValidNonZero2Digit}
            onChange={(event) => setSimpleX(event.target.value)}
          />
          <p />
          <span>Y: </span>
          <CustomTextField
            style={{ width: '50px' }}
            value={simpleY}
            validationFn={isValidNonZero2Digit}
            onChange={(event) => setSimpleY(event.target.value)}
          />
          <p />
          <span>Z: </span>
          <CustomTextField
            style={{ width: '50px' }}
            value={simpleZ}
            validationFn={isValidNonZero2Digit}
            onChange={(event) => setSimpleZ(event.target.value)}
          />
          <p />
        </>
      ) : null}
      <Save vars={vars} isValid={validate()} />
    </div>
  )
}
