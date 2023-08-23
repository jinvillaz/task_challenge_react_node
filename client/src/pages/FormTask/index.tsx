import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Event as EventIcon } from '@mui/icons-material'
import { useFormik } from 'formik'
import { validationSchema } from './schema'

// import { useAppDispatch } from '../../reducers/hooks';
// import { createContact, updateContact } from '../../reducers/contacts/contacts.actions';
import { BodyTask, FormDataTask, TypeTask } from '../../model/task'
import { MobileDatePicker } from '@mui/x-date-pickers'
import { format, isValid } from 'date-fns'
import { createTask } from '../../reducers/tasks/tasks.actions'
import { useAppDispatch } from '../../reducers/hooks'

interface ListTypesTask {
  key: string
  value: string
}

const typesTask: ListTypesTask[] = Object.keys(TypeTask).map((key) => {
  return {
    key,
    value: TypeTask[key as keyof typeof TypeTask],
  }
})

export const FormTask = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  const onSubmit = async (values: FormDataTask) => {
    const data: BodyTask = {
      name: values.name,
      description: values.description,
      type: values.type,
    }
    if (isValid(values.dueDate)) {
      data.dueDate = format(values.dueDate as Date, 'MM/dd/yyyy')
    }
    console.info(data)
    dispatch(createTask(data))
    navigate('/')
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      description: '',
      type: TypeTask.WORK,
      dueDate: null,
    },
    validationSchema,
    onSubmit,
  })

  const goHome = () => {
    navigate('/')
  }

  return (
    <Grid container>
      <Grid item xs={6} textAlign="left" sx={{ paddingLeft: '25px', paddingTop: '30px' }}>
        <Box display="flex" justifyContent="flex-start" alignItems="center" minHeight="100%">
          <Typography variant="h4">Add new task</Typography>
        </Box>
      </Grid>
      <Grid item xs={6} sx={{ paddingTop: '30px', paddingRight: '25px' }}>
        <Box display="flex" justifyContent="flex-end" alignItems="center" minHeight="100%">
          <Button variant="contained" onClick={goHome}>
            Return to list
          </Button>
        </Box>
      </Grid>
      <Container sx={{ flexGrow: 1, padding: 5 }}>
        <form onSubmit={formik.handleSubmit} style={{ width: '80%', justifyContent: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="category-label">Type Task</InputLabel>
                <Select
                  labelId="category-label"
                  name="type"
                  label="Type Task"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                >
                  {typesTask.map((type) => (
                    <MenuItem key={type.key} value={type.value}>
                      {type.value}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.type && formik.errors.type && <div>{formik.errors.type}</div>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <MobileDatePicker
                disablePast
                label={formik.values.dueDate ? '' : 'Due date'}
                format="MM/dd/yyyy"
                value={formik.values.dueDate}
                onChange={(value) => {
                  formik.setFieldValue('dueDate', value, true)
                }}
                slotProps={{
                  textField: {
                    variant: 'outlined',
                    error: formik.touched.dueDate && Boolean(formik.errors.dueDate),
                    fullWidth: true,
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end">
                            <EventIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                disabled={!formik.isValid || !formik.dirty}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Grid>
  )
}
