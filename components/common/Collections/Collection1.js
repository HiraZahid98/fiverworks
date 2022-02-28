import React, { useContext, useEffect } from 'react';
import Slider from 'react-slick';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Product4 } from '../../../services/script'
import ProductItem from '../product-box/ProductBox1';
import PostLoader from '../PostLoader';
import { Row, Col, Container } from 'reactstrap';
import CartContext from '../../../helpers/cart';
import { WishlistContext } from '../../../helpers/wishlist/WishlistContext';
import { CompareContext } from '../../../helpers/Compare/CompareContext';

const GET_PRODUCTS = gql`
    query  products($type:_CategoryType!,$indexFrom:Int! ,$limit:Int!) {
        products (type: $type,indexFrom:$indexFrom ,limit:$limit){
            items {
                id
                title
                description 
                type
                brand
                category 
                price
                new
                stock
                sale
                discount
                variants{
                    id
                    sku
                    size
                    color
                    image_id
                }
                images{
                    image_id
                    id
                    alt
                    src
                }
            }
        }
    }
`;

const TopCollection = ({ type, title, subtitle, designClass, line, noSlider, cartClass, productDetail, noTitle, titleClass, innerTitle }) => {
    const context = useContext(CartContext)
    const contextWishlist = useContext(WishlistContext);
    const contextCompare = useContext(CompareContext);
    const [mydata, setMyData] = useState([]);
    const quantity = context.quantity;

    var { loading, data } = useQuery(GET_PRODUCTS, {
        variables: {
            type: type,
            indexFrom: 0,
            limit: 8
        }
    });

    useEffect(() => {
        const url = "http://127.0.0.1:8000/product/detial";
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                let res = {products:{items: json.data}};
                setMyData(res);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, []);


    return (
        <>
            <section className={designClass}>
                {noSlider ?
                    <Container>
                        <Row>
                            <Col>
                                {
                                    noTitle ?
                                        ''
                                        :
                                        <div className={titleClass}>
                                            {subtitle ? <h4>{subtitle}</h4> : ''}
                                            <h2 className={innerTitle}>{title}</h2>
                                                {line ?
                                                <div className="line"></div>
                                                : ''}
                                        </div>
                                }

                                {(!mydata || !mydata.products || !mydata.products.items || mydata.products.items.length === 0 || loading) ?
                                    (mydata && mydata.products && mydata.products.items && mydata.products.items.length === 0) ?
                                        <Col xs="12">
                                            <div>
                                                <div className="col-sm-12 empty-cart-cls text-center">
                                                    <Media src={emptySearch} className="img-fluid mb-4 mx-auto" alt="" />
                                                    <h3><strong>Your Cart is Empty</strong></h3>
                                                    <h4>Explore more shortlist some items.</h4>
                                                </div>
                                            </div>
                                        </Col>
                                        :
                                        <div className="row mx-0 margin-default">
                                            <div className="col-xl-3 col-lg-4 col-6">
                                                <PostLoader />
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-6">
                                                <PostLoader />
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-6">
                                                <PostLoader />
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-6">
                                                <PostLoader />
                                            </div>
                                        </div>
                                    :
                                    <Slider {...Product4} className="product-4 product-m no-arrow">
                                        {mydata && mydata.products.items.slice(0, 8).map((product, index) =>
                                            <div key={index}>
                                                <ProductItem product={product} productDetail={productDetail}
                                                    addCompare={() => contextCompare.addToCompare(product)}
                                                    addWishlist={() => contextWishlist.addToWish(product)}
                                                    addCart={() => context.addToCart(product, quantity)} key={index} cartClass={cartClass} />
                                            </div>
                                        )
                                        }
                                    </Slider>
                                }
                            </Col>
                        </Row>
                    </Container>
                    :
                    <>
                        <div className="title1 title-gradient  section-t-space">
                            {subtitle ? <h4>{subtitle}</h4> : ''}
                            <h2 className="title-inner1">{title}</h2>
                        </div>
                        <Container>
                            <Row>
                                {mydata && mydata.products.items.slice(0, 8).map((product, index) =>
                                    <Col xl="3" sm="6" key={index}>
                                        <div>
                                            <ProductItem product={product} productDetail={productDetail}
                                                addCompare={() => contextCompare.addToCompare(product)}
                                                addWishlist={() => contextWishlist.addToWish(product)}
                                                addCart={() => context.addToCart(product, quantity)} key={index} />
                                        </div>
                                    </Col>
                                )
                                }
                            </Row>
                        </Container>
                    </>
                }

            </section>
        </>
    )
}


export default TopCollection;