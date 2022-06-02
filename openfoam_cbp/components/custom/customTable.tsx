import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export const CustomTable = ({ rows, columns, setRows }) => {
  function onChange(params, event) {
    setRows(
      rows.map((row) =>
        row.id === params.id
          ? { ...row, [params.field]: event.target.value }
          : row
      )
    )
  }

  function cellContent(row, params) {
    const value = row[params.field]
    if (params.editable) {
      if (params.options) {
        //dropdown
        return (
          <Select
            style={{ width: params.width }}
            value={value}
            variant="standard"
            onChange={(event) => onChange({ ...params, id: row.id }, event)}
          >
            {params.options.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        )
      } else {
        //regular text input
        return (
          <TextField
            style={{ width: params.width }}
            value={value}
            variant="standard"
            onChange={(event) => onChange({ ...params, id: row.id }, event)}
            error={!params.validate(value)}
          />
        )
      }
    }

    return (
      <TextField
        style={{ width: params.width }}
        value={value}
        variant="standard"
        InputProps={{
          readOnly: true
        }}
      />
    )
  }

  function headerCells() {
    return (
      <TableRow>
        {columns.map((column) => {
          return (
            <TableCell padding="none" key={column.field}>
              {column.headerName}
            </TableCell>
          )
        })}
      </TableRow>
    )
  }

  function rowCells(rowDefinition) {
    return (
      <TableRow key={rowDefinition.id}>
        {columns.map((column) => {
          return (
            <TableCell padding="none" key={column.field}>
              {cellContent(rowDefinition, column)}
            </TableCell>
          )
        })}
      </TableRow>
    )
  }

  return (
    <TableContainer>
      <Table
        style={{ margin: 'auto', textAlign: 'center' }}
        sx={{ align: 'center', width: 500 }}
      >
        <TableHead>{headerCells()}</TableHead>
        <TableBody>{rows.map((row) => rowCells(row))}</TableBody>
      </Table>
    </TableContainer>
  )
}
