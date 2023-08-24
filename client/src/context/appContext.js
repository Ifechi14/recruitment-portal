import React from 'react'
import axios from 'axios'
import { useReducer, useContext } from 'react'
import { 
  DISPLAY_ALERT, 
  CLEAR_ALERT, 
  REGISTER_USER_BEGIN, 
  REGISTER_USER_ERROR, 
  REGISTER_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  CLEAR_VALUES,
  HANDLE_CHANGE,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_APPLY_JOB,
  APPLY_JOB_BEGIN,
  APPLY_JOB_SUCCESS,
  APPLY_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  DELETE_JOB_BEGIN,
  CLEAR_FILTERS,
  CHANGE_PAGE
} from './action'
import reducer from './reducer'

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const userLocation = localStorage.getItem('location')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  showSidebar: false,
  isEditing: false,
  isApplying:false,
  applyJobId: '',
  editJobId: '',
  position: '',
  company: '',
  jobLocation: userLocation || '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  resume: '',
  jobs: [],
  stats: {},
  monthlyApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const authFetch = axios.create({
      baseURL: '/api/v1',
    });

    //axios interceptors: to control error response 
    //request
    authFetch.interceptors.request.use((config)=>{
      config.headers['Authorization'] = `Bearer ${state.token}`
      return config
    },(error)=>{
      return Promise.reject(error)
    });

    //response
    authFetch.interceptors.response.use(
      (response)=>{
      return response
    },
    (error)=>{
      console.log(error.response);
      // if(error.response.status === 401){
      //   console.log('AUTH ERROR');
      // }
      return Promise.reject(error)
    });

    const handleChange = ({ name, value}) =>{
      dispatch ({ 
        type: HANDLE_CHANGE,
        payload : {name, value}
      })
    }

    const clearValues = () =>{
      dispatch({ type: CLEAR_VALUES })
    }

    const displayAlert = () =>{
        dispatch({type:DISPLAY_ALERT});
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(() => {
          dispatch({
            type: CLEAR_ALERT,
          });
        }, 3000);
      };
    const addUserToLocalStorage = ({ user, token, location})=>{
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
      localStorage.setItem('location', location)
    }

    const removeUserFromLocalStorage = ()=>{
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('location')
    }

    const registerUser = async (currentUser)=>{
      dispatch({ type: REGISTER_USER_BEGIN })
      try {
        const response = await axios.post('/api/v1/auth/register', currentUser)
        // console.log(currentUser);
        const { user, token, location } = response.data;
        dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: {
            user,
            token,
            location
          }
        })
        addUserToLocalStorage({user, token, location})
      } catch (error) {
        // console.log(error.response);
        dispatch({
          type: REGISTER_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
      clearAlert()
    }

    const loginUser = async (currentUser)=>{
      dispatch({ type: LOGIN_USER_BEGIN })
      try {
        const {data} = await axios.post('/api/v1/auth/login', currentUser)
        const { user, token, location } = data;
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: {
            user,
            token,
            location
          }
        })
        addUserToLocalStorage({user, token, location})
      } catch (error) {
        dispatch({
          type: LOGIN_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
      clearAlert()
      // console.log(currentUser);
    }

    const setupUser = async ({currentUser, endPoint, alertText})=>{
      dispatch({ type: SETUP_USER_BEGIN })
      try {
        const {data} = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
        const { user, token, location } = data;
        dispatch({
          type: SETUP_USER_SUCCESS,
          payload: {
            user,
            token,
            location,
            alertText
          }
        })
        addUserToLocalStorage({user, token, location})
      } catch (error) {
        dispatch({
          type: SETUP_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
      clearAlert()
      // console.log(currentUser);
    }

    const toggleSidebar = () =>{
      dispatch({ type: TOGGLE_SIDEBAR })
    }

    const logoutUser = () => {
      dispatch({ type: LOGOUT_USER })
      removeUserFromLocalStorage()
    }

    const updateUser = async (currentUser) => {
      dispatch({ type: UPDATE_USER_BEGIN })
      try {
        const { data } = await authFetch.patch('/auth/updateUser', currentUser);
        const { user, location, token } = data;

        dispatch({ 
          type: UPDATE_USER_SUCCESS,
          payload: { user, location, token }
        });
        addUserToLocalStorage({ user, location, token })
        // console.log(data);
      } catch (error) {
        console.log(error);
          dispatch({ 
            type: UPDATE_USER_ERROR, 
            payload: { msg: 'error'} 
          });
        
        
      }
      clearAlert()
    }

    

    const createJob = async () =>{
      dispatch({ type: CREATE_JOB_BEGIN })
      try {
        const { position, company, jobLocation, jobType, status } = state;
        await authFetch.post('/jobs', {
          company,
          position,
          jobLocation,
          jobType,
          status,
        });
        dispatch({ type: CREATE_JOB_SUCCESS })
        // or call function instead clearValues()
        dispatch({ type: CLEAR_VALUES });
      } catch (error) {
    
        console.log(error); // Log the error object itself
        dispatch({ type: CREATE_JOB_ERROR, payload: { msg: 'error' }});
        
      }
        clearAlert();
    }

    const getJobs = async () => {
        // will add page later
        const { page, search, searchStatus, searchType, sort } = state;
        //get page
        let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
        if (search) {
          url = url + `&search=${search}`;
        }
        dispatch({ type: GET_JOBS_BEGIN });
        try {
          const { data } = await authFetch(url);
          const { jobs, totalJobs, numOfPages } = data;
          dispatch({
            type: GET_JOBS_SUCCESS,
            payload: {
              jobs,
              totalJobs,
              numOfPages,
            },
          });
        } catch (error) {
          logoutUser()
        }
        clearAlert();
    }

    const setApplyJob = (id) =>{
      dispatch({ type: SET_APPLY_JOB, payload: { id }})
    }

    const applyJob = async () => {
      dispatch({ type: APPLY_JOB_BEGIN });
      try {
        const { position, company, jobLocation, jobType, status, resume } = state;
      
        //await
        await authFetch.patch(`/jobs/${state.applyJobId}`, {
          company,
          position,
          jobLocation,
          resume,
          jobType,
          status,
        });
        dispatch({
          type: APPLY_JOB_SUCCESS,
        });
        dispatch({ type: CLEAR_VALUES });
      } catch (error) {
        if (error.response.status === 401) return;
        dispatch({
          type: APPLY_JOB_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
      clearAlert();
      console.log('apply job');
    }


    const deleteJob = async (jobId) => {
      dispatch({ type: DELETE_JOB_BEGIN });
      try {
        await authFetch.delete(`/jobs/${jobId}`);
        getJobs();
      } catch (error) {
        logoutUser();
      }
    };

    const showStats = async () => {
      dispatch({ type: SHOW_STATS_BEGIN })
      try {
        const { data } = await authFetch('/jobs/stats')
        dispatch({
          type: SHOW_STATS_SUCCESS,
          payload: {
            stats: data.defaultStats,
            monthlyApplications: data.monthlyApplications,
          },
        })
      } catch (error) {
        console.log(error.response)
        logoutUser()
      }
      clearAlert()
    }

    const clearFilters = () =>{
      dispatch({ type: CLEAR_FILTERS})
    }

    const changePage = (page) => {
      dispatch({ type: CHANGE_PAGE, payload: { page } })
    }
    
    return (
        <AppContext.Provider 
        value={{ 
          ...state, 
          displayAlert, 
          registerUser, 
          loginUser, 
          setupUser, 
          toggleSidebar,
          logoutUser,
          updateUser,
          handleChange,
          clearValues,
          createJob,
          deleteJob,
          setApplyJob,
          applyJob,
          getJobs,
          showStats,
          clearFilters,
          changePage
        }}>{children}</AppContext.Provider>
    )
}

//hook setup
const useAppContext = () =>{
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext}