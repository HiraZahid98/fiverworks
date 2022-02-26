import React, { Fragment } from 'react';
import { Container ,Row ,Col ,Media} from 'reactstrap';
import visa from '../../../public/assets/images/icon/visa.png';
import mastercard from '../../../public/assets/images/icon/mastercard.png';
import paypal from '../../../public/assets/images/icon/paypal.png';
import americanexpress from '../../../public/assets/images/icon/american-express.png';
import discover from '../../../public/assets/images/icon/discover.png';

const CopyRight = ({layout, fluid}) => {
    return (
        <Fragment>
            <div className={`sub-footer ${layout}`}>
                <Container fluid={fluid}>
                    <Row>
                        <Col xl="6" md="6" sm="12">
                            <div className="footer-end">
                                <p><i className="fa fa-copyright" aria-hidden="true"></i> 2022-23 powered by
                                Health Beauty Bank</p>
                            </div>
                        </Col>
                        <Col xl="6" md="6" sm="12">
                            <div className="payment-card-bottom">
                                Developed by <a href="https://inno8designs.in/">inno8 design</a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    )
}

export default CopyRight;