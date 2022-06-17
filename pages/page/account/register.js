import React,{useState} from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import { Input, Container, Row, Form, Label ,Col} from 'reactstrap';
import {useRouter} from 'next/router';

const Register = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [emailValidation, setEmailValidation] = useState(false);
    const [firstnameValidation, setFirstnameValidation] = useState(false);
    const [lastnameValidation, setLastnameValidation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);
    const [mobileValidation, setMobileValidation] = useState(false);
    const history = useRouter();
    const handleSigup = () => {
        (email === '') ? setEmailValidation(true) : setEmailValidation(false); 
        (password === '') ? setPasswordValidation(true) : setPasswordValidation(false);
        (firstname === '') ? setFirstnameValidation(true) : setFirstnameValidation(false);
        (lastname === '') ? setLastnameValidation(true) : setLastnameValidation(false);
        (mobile === '') ? setMobileValidation(true) : setMobileValidation(false);
        if(firstname !== '' && email !== '' && password !== ''){
            fetch('https://thexboss.com/web/project/userregister', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                email: email,
                firstname: firstname,
                lastname: lastname,
                mobile: mobile,
                password: password,
                city: 'Chennai',
                }),
            }).then((res) => res.json())
            .then((data) => {
                if(data.status === 'success'){
                    window.localStorage.removeItem('user-details');
                    history.push("/page/account/login");
                }
            })
            .catch(console.log);
        }
      }
    return (
        <CommonLayout parent="home" title="register">
            <section className="register-page section-b-space">
                <Container>
                    <Row>
                        <Col lg="12">
                            <h3>create account</h3>
                            <div className="theme-card">
                                <Form className="theme-form">
                                    <Row>
                                        <Col md="6">
                                            <Label for="email">First Name</Label>
                                            <Input type="text" className="form-control form-control-custom" id="fname" placeholder="First Name" required="" onChange={(e) => {setFirstname(e.target.value)}} />
                                            {firstnameValidation && <div className="validate-error">First Name cannot be blank.</div>}
                                        </Col>
                                        <Col md="6">
                                            <Label for="review">Last Name</Label>
                                            <Input type="text" className="form-control form-control-custom" id="lname" placeholder="Last Name" required="" onChange={(e) => {setLastname(e.target.value)}} />
                                            {lastnameValidation && <div className="validate-error">Last Name cannot be blank.</div>}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Label for="email">email</Label>
                                            <Input type="text" className="form-control form-control-custom" id="email" placeholder="Email" required="" onChange={(e) => {setEmail(e.target.value)}} />
                                            {emailValidation && <div className="validate-error">Email cannot be blank.</div>}
                                        </Col>
                                        <Col md="6">
                                            <Label for="review">Password</Label>
                                            <Input type="password" className="form-control form-control-custom" id="review"
                                                placeholder="Enter your password" required="" onChange={(e) => {setPassword(e.target.value)}} />
                                            {passwordValidation && <div className="validate-error">Password cannot be blank.</div>}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Label for="mobile">Mobile</Label>
                                            <Input type="text" className="form-control form-control-custom" id="fname" placeholder="Mobile" required="" onChange={(e) => {setMobile(e.target.value)}} />
                                            {mobileValidation && <div className="validate-error">Mobile cannot be blank.</div>}
                                        </Col>
                                        <Col md="6">
                                           
                                        </Col>
                                        <button type="button" onClick={handleSigup} className="btn btn-solid">create Account</button>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </CommonLayout>
    )
}

export default Register