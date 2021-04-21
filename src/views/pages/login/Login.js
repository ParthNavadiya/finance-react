import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch } from "react-redux";
import { loginService } from '../../../Services/LoginServices'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [visible, setVisible] = useState({
    isShow: false,
    message: ''
  })
  const [state, setState] = useState({
    username: "",
    password: ""
  })

  useEffect(() => {
    if (visible.isShow) {
      setTimeout(() => { 
        setVisible({
          isShow: false,
          message: ''
        })
      }, 5000)
    }
  }, [visible.isShow])

  const validateData = () => {
    let isValid = true;
    const { username, password } = state
    if (username === "" || password === "") {
      isValid = false
    }

    return isValid;
  }

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    if (validateData()) {
      try {
        const res = await loginService(state)
        if (res.errormsg) {
          setVisible({
            ...visible,
            isShow: true,
            message: res.message
          })
        } else {
          sessionStorage.setItem('accessToken', res.result.accessToken)
          sessionStorage.setItem('accessTokenExp', res.result.accessTokenExp)
          sessionStorage.setItem('refreshToken', res.result.refreshToken)
          sessionStorage.setItem('refreshTokenExp', res.result.refreshTokenExp)
          const isUserAdmin = res.result.user.roles && res.result.user.roles.findIndex(item => item.isAdmin)
          dispatch({
            type: "ACTION_USER_LOGIN",
            userInfo: res.result.user,
            userRole: isUserAdmin !== -1 ? true : false
          })
          history.push('/home')
        }
      } catch (err) { }
    } else {
      setVisible({
        ...visible,
        isShow: true,
        message: "user name or password field required."
      })
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {visible.isShow && (
                    <CAlert
                      color="warning"
                      closeButton
                    >
                      {visible.message}
                    </CAlert>
                  )}
                  <CForm>
                  <h1>Login</h1>
                  <p className="text-muted">Sign In to your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="username" placeholder="Username" autoComplete="username" onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" name="password" placeholder="Password" onChange={handleChange} autoComplete="current-password" />
                  </CInputGroup>
                  <CRow>
                    <CCol xs="6">
                      <CButton type='button' onClick={handleSubmit} color="primary" className="px-4">Login</CButton>
                    </CCol>
                    <CCol xs="6" className="text-right">
                      <CButton color="link" className="px-0">Forgot password?</CButton>
                    </CCol>
                  </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                    <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
