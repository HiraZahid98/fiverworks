import React, { useState, useEffect, useRef } from "react";
import ProductTab from "../common/product-tab";
import Service from "../common/service";
import NewProduct from "../../shop/common/newProduct";
import Slider from "react-slick";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import ImageZoom from "../common/image-zoom";
import DetailsWithPrice from "../common/detail-price";
import Filter from "../common/filter";
import { Container, Row, Col, Media } from "reactstrap";
import { useRouter } from 'next/router';

const GET_SINGLE_PRODUCTS = gql`
  query product($id: Int!) {
    product(id: $id) {
      id
      title
      description
      type
      brand
      category
      price
      new
      sale
      discount
      stock
      variants {
        id
        sku
        size
        color
        image_id
      }
      images {
        alt
        src
      }
    }
  }
`;

const LeftSidebarPage = ({ pathId }) => {
  var { loading, data } = useQuery(GET_SINGLE_PRODUCTS, {
    variables: {
      id: parseInt(pathId),
    },
  });
  const router = useRouter()
  const [mydata, setMyData] = useState([]);


  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();

  var products = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    fade: true,
  };
  var productsnav = {
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
  };

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, [data]);

  const { nav1, nav2 } = state;

  const filterClick = () => {
    document.getElementById("filter").style.left = "-15px";
  };

  const changeColorVar = (img_id) => {
    slider2.current.slickGoTo(img_id);
  };

  useEffect(() => {
    let id = router.query.id;
    const url = "http://shoppyspot.com/shoppyspot-backend/web/project/productdetails?id="+id;
    const fetchData = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          let res = {product:json.data};
          console.log(res);
          setMyData(res);
        } catch (error) {
            console.log("error", error);
        }
    };
    fetchData();
  }, []);
  //console.log(data);
  return (
    <section className="">
      <div className="collection-wrapper">
        <Container>
          <Row>
            <Col sm="3" className="collection-filter">
              <Filter />
              <Service />
              {/* <!-- side-bar single product slider start --> */}
              <NewProduct />
              {/* <!-- side-bar single product slider end --> */}
            </Col>
            <Col lg="9" sm="12" xs="12">
              <Container fluid={true}>
                <Row>
                  <Col cl="12">
                    <div className="filter-main-btn mb-2">
                      <span onClick={filterClick} className="filter-btn">
                        <i className="fa fa-filter" aria-hidden="true"></i>{" "}
                        filter
                      </span>
                    </div>
                  </Col>
                </Row>
                {!mydata ||
                !mydata.product ||
                mydata.product.length === 0 ||
                loading ? (
                  "loading"
                ) : (
                  <Row className="leftImage">
                            <Col lg="1" sm="2" xs="12" >
                                <Row>
                                    <Slider className="slider-nav image-left-thumb"
                                        {...productsnav}
                                        asNavFor={nav1}
                                        ref={slider => (slider2.current = slider)}
                                    >
                                        {mydata.product.images.map((vari, index) =>
                                                <div key={index}>
                                                    <Media src={`${vari.src}`} key={index} alt={vari.alt} className="img-fluid w-100" />
                                                    {mydata.product.images.src}
                                                </div>
                                            )}
                                    </Slider>
                                </Row>
                            </Col>
                            <Col lg="5" sm="10" xs="12" className="order-up">
                                <Slider {...products} asNavFor={nav2} ref={slider => (slider1.current = slider)} className="product-right-slick">
                                    {
                                        mydata.product.images.map((vari, index) =>
                                            <div key={index}>
                                                <ImageZoom image={vari} />
                                            </div>
                                        )}
                                </Slider>
                            </Col>
                            <Col lg="6" className="rtl-text">
                            {!!mydata.product && <DetailsWithPrice
                              item={mydata.product}
                              changeColorVar={changeColorVar}
                            />}
                            </Col>
                        </Row>
                )}
              </Container>
              <ProductTab />
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default LeftSidebarPage;
