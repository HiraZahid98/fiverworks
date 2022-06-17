import React, { useState } from "react";
import {
  Col,
  Media,
  Row,
  Modal,
  ModalBody,
  Input,
  Form,
  Button,
} from "reactstrap";
import offerBanner from "../../public/assets/images/Offer-banner.png";

const ModalComponent = () => {
  const [modal, setModal] = useState(true);
  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = async() => {
    
    if(email !== ''){
      setEmailValidation(false);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      };
      const requestUrl = "https://thexboss.com/web/project/addsubscribtion";
      const response = await fetch(requestUrl,requestOptions);
      const json = await response.json();
      console.log(json);
    }else{
      setEmailValidation(true);
    }
  }

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      className="theme-modal modal-lg"
      centered
    >
      <div>
        <ModalBody className="modal1">
          <Row className="compare-modal">
            <Col lg="12">
              <div className="modal-bg">
                <Button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={toggle}
                >
                  <span aria-hidden="true">&times;</span>
                </Button>
                <div className="offer-content">
                  <Media
                    src={offerBanner}
                    className="img-fluid blur-up lazyload"
                    alt=""
                  />
                  <h2>newsletter</h2>
                  <Form
                    action="https://pixelstrap.us19.list-manage.com/subscribe/post?u=5a128856334b598b395f1fc9b&amp;id=082f74cbda"
                    className="auth-form needs-validation"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    target="_blank"
                  >
                    <div className="form-group mx-sm-3">
                      <Input
                        type="text"
                        className="form-control"
                        name="EMAIL"
                        id="mce-EMAIL"
                        placeholder="Enter your email"
                        required="required"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {emailValidation && <div className="validate-error">Please Enter your email.</div>}
                      <Button
                        type="button"
                        className="btn btn-solid"
                        id="mc-submit"
                        onClick={handleSubmit}
                      >
                        subscribe
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default ModalComponent;
