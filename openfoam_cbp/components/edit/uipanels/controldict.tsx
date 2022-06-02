import React, { useState } from 'react'
import { Save } from './utils/save'
import { CustomTextField } from '../../custom/customTextField'
import { isValidInt } from './utils/validator'

export const ControlDict = ({ ast }) => {
  const [startTime, setStartTime] = useState(
    ast?.['startTime']?.[0]?.value || '0'
  )
  const [endTime, setEndTime] = useState(ast?.['endTime']?.[0]?.value || '0')
  const [deltaT, setDeltaT] = useState(ast?.['deltaT']?.[0]?.value || '0')
  const [writeInterval, setWriteInterval] = useState(
    ast?.['writeInterval']?.[0]?.value || '0'
  )
  const vars = [
    { foamObj: ast?.['startTime']?.[0], newValue: startTime },
    { foamObj: ast?.['endTime']?.[0], newValue: endTime },
    { foamObj: ast?.['deltaT']?.[0], newValue: deltaT },
    { foamObj: ast?.['writeInterval']?.[0], newValue: writeInterval }
  ]
  const validate = () => {
    return (
      isValidInt(startTime) &&
      isValidInt(endTime) &&
      isValidInt(deltaT) &&
      isValidInt(writeInterval)
    )
  }

  return (
    <>
      <p />
      Choose start time.
      <br />
      <CustomTextField
        style={{ width: '120px' }}
        value={startTime}
        validationFn={isValidInt}
        onChange={(event) => setStartTime(event.target.value)}
      />
      <p />
      Choose end time.
      <br />
      <CustomTextField
        style={{ width: '120px' }}
        value={endTime}
        validationFn={isValidInt}
        onChange={(event) => setEndTime(event.target.value)}
        data-testid="edit-controldict-endtime"
      />
      <p />
      Time between each step (deltaT).
      <br />
      <CustomTextField
        style={{ width: '120px' }}
        value={deltaT}
        validationFn={isValidInt}
        onChange={(event) => setDeltaT(event.target.value)}
      />
      <p />
      Choose write interval.
      <br />
      <CustomTextField
        style={{ width: '120px' }}
        value={writeInterval}
        validationFn={isValidInt}
        onChange={(event) => setWriteInterval(event.target.value)}
        data-testid="edit-controldict-writeinterval"
      />
      <p />
      <br />
      <Save vars={vars} isValid={validate()} />
    </>
  )
}
