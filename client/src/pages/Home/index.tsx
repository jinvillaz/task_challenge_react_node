import { useEffect } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Task as TaskIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import { getTasks } from '../../reducers/tasks/tasks.actions'
import { useAppDispatch, useAppSelector } from '../../reducers/hooks'
import { selectTasks } from '../../reducers/tasks/tasks.selectors'
import { format } from 'date-fns'

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 250,
    sortable: false,
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1,
    minWidth: 150,
    sortable: false,
  },
  {
    field: 'type',
    headerName: 'Task Type',
    width: 150,
  },
  {
    field: 'dueDate',
    headerName: 'Due date',
    width: 150,
    valueFormatter: (params) => {
      console.info(params.value)
      return params?.value ? format(new Date(params?.value), 'MM/dd/yyyy') : ''
    },
  },
  {
    field: 'labelAssigned',
    headerName: 'Label Assigned',
    width: 150,
  },
]

export const Home = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectTasks)

  const goToForm = () => {
    navigate('/form')
  }

  useEffect(() => {
    dispatch(getTasks())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid container sx={{ height: '100%', flexFlow: 'column', paddingLeft: '50px', paddingRight: '50px' }}>
      <Grid container sx={{ height: '200px', width: '100%' }}>
        <Grid item xs={12} textAlign="center">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100%">
            <TaskIcon style={{ fontSize: '60px', paddingRight: '25px' }} />{' '}
            <Typography variant="h2"> Task App</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} textAlign="left">
          <Box display="flex" justifyContent="flex-start" alignItems="center" minHeight="100%">
            <Typography variant="h4">Tasks</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end" alignItems="center" minHeight="100%">
            <Button variant="contained" onClick={goToForm}>
              + Add Task
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%' }}>
        <Grid item xs={12}>
          {/* <ConfirmationDialog state={openDialog} deleteItem={removeTask} setOpen={setOpenDialog} /> */}
          <DataGrid
            getRowId={(row) => row._id}
            rows={tasks}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
