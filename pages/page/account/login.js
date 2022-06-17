import React,{useState} from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import { Container, Row, Form, Label, Input ,Col} from 'reactstrap';
import {useRouter} from 'next/router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValidation, setEmailValidation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleLogin = () => {
        (email === '') ? setEmailValidation(true) : setEmailValidation(false); 
        (password === '') ? setPasswordValidation(true) : setPasswordValidation(false);
        if(email !== '' && password !== ''){
            setIsLoading(true);
            fetch('https://thexboss.com/web/project/userlogin', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                username: email,
                password: password,
              }),
            }).then((res) => res.json())
            .then((data) => {
                if(data.status === 'success'){
                    let res = data.userData;
                    window.localStorage.setItem("user-details", JSON.stringify(res));
                    router.push('/page/account/dashboard');
                    setIsLoading(false);
                }
            })
            .catch(console.log);
        }
    }
    return (
        <>
            {isLoading ? (
                <div className="loader-wrapper">
                    <div className="loader"></div>
                </div>
            ) : (
            <CommonLayout parent="home" title="login">
                <section className="login-page section-b-space">
                    <Container>
                        <Row>
                            <Col lg="6">
                                <h3>Login</h3>
                                <div className="theme-card">
                                    <Form className="theme-form">
                                        <div className="form-group">
                                            <Label for="email">Email</Label>
                                            <Input type="text" className="form-control form-control-custom" id="email" placeholder="Email" required="" onChange={(e) => {setEmail(e.target.value)}} />
                                            {emailValidation && <div className="validate-error">Email cannot be blank.</div>}
                                        </div>
                                        <div className="form-group">
                                            <Label for="review">Password</Label>
                                            <Input type="password" className="form-control form-control-custom" id="review"
                                                placeholder="Enter your password" required="" onChange={(e) => {setPassword(e.target.value)}} />
                                            {passwordValidation && <div className="validate-error">Password cannot be blank.</div>}
                                        </div><button type="button" onClick={handleLogin} className="btn btn-solid">Login</button>
                                    </Form>
                                </div>
                            </Col>
                            <Col lg="6" className="right-login">
                                <h3>New Customer</h3>
                                <div className="theme-card authentication-right">
                                    <h6 className="title-font">Create A Account</h6>
                                    <p>Sign up for a free account at our store. Registration is quick and easy. It allows you to be
                                able to order from our shop. To start shopping click register.</p><a href="/page/account/register"
                                        className="btn btn-solid">Create an Account</a>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                </CommonLayout>
            )}
        </>
    )
}

export default Login;