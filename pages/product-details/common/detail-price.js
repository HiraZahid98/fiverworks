import React, { useState, useContext } from "react";
import Link from "next/link";
import sizeChart from "../../../public/assets/images/size-chart.jpg";
import { Modal, ModalBody, ModalHeader, Media, Input } from "reactstrap";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import CartContext from "../../../helpers/cart";
import CountdownComponent from "../../../components/common/widgets/countdownComponent";
import MasterSocial from "./master_social";

const DetailsWithPrice = ({ item, stickyClass, changeColorVar }) => {
  const [modal, setModal] = useState(false);
  const CurContect = useContext(CurrencyContext);
  const symbol = CurContect.state.symbol;
  const toggle = () => setModal(!modal);
  const product = item;
  const context = useContext(CartContext);
  const stock = context.stock;
  const plusQty = context.plusQty;
  const minusQty = context.minusQty;
  const quantity = context.quantity;
  const uniqueColor = [];
  const uniqueSize = [];
  const [activeSize, setActiveSize] = useState("");
  const [activeColor, setActiveColor] = useState("");

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <>
      <div className={`product-right ${stickyClass}`}>
          {/* Detail Price */}
        <h2> {product.title} </h2>
        <h4>
          <del>
            {symbol}
            {product.price}
          </del>
          <span>{product.discount}% off</span>
        </h4>
        <h3>
          {symbol}
          {product.price - (product.price * product.discount) / 100}
        </h3>
        {product.variants.map((vari) => {
          var findItem = uniqueColor.find((x) => x.color === vari.color);
          if (!findItem) uniqueColor.push(vari);
          var findItemSize = uniqueSize.find((x) => x === vari.size);
          if (!findItemSize) uniqueSize.push(vari.size);
        })}
        
        <>
          {!!product.color && 
            <ul className="color-variant">
              {product.color.map((vari, i) => {
                return (
                  <li className={activeColor === vari.color_name ? vari.color_name+" active" : vari.color_name} key={i} title={vari.color_name} onClick={() => setActiveColor(vari.color_name)}></li>
                );
              })}
          </ul>}
        </>
        <div className="product-description border-product">
          <div>
            <h6 className="product-title size-text">
              select size
              <span>
                <a
                  href={null}
                  data-toggle="modal"
                  data-target="#sizemodal"
                  onClick={toggle}
                >
                  size chart
                </a>
              </span>
            </h6>
            <Modal isOpen={modal} toggle={toggle} centered>
              <ModalHeader toggle={toggle}>Sheer Straight Kurta</ModalHeader>
              <ModalBody>
                <Media src={sizeChart} alt="size" className="img-fluid" />
              </ModalBody>
            </Modal>
            <div className="size-box">
              {!!product.size && <ul>
                {product.size.map((data, i) => {
                  return (
                    <li key={i} className={activeSize === data.size_name ? "active" : ""} onClick={() => setActiveSize(data.size_name)}>
                      <a href={null}>{data.size_name}</a>
                    </li>
                  );
                })}
              </ul>}
            </div>
          </div>
          <span className="instock-cls">{stock}</span>
          <h6 className="product-title">quantity</h6>
          <div className="qty-box">
            <div className="input-group">
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn quantity-left-minus"
                  onClick={minusQty}
                  data-type="minus"
                  data-field=""
                >
                  <i className="fa fa-angle-left"></i>
                </button>
              </span>
              <Input
                type="text"
                name="quantity"
                value={quantity}
                onChange={changeQty}
                className="form-control input-number"
              />
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn quantity-right-plus"
                  onClick={() => plusQty(product)}
                  data-type="plus"
                  data-field=""
                >
                  <i className="fa fa-angle-right"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="product-buttons">
          <a
            href={null}
            className="btn btn-solid"
            onClick={() => context.addToCart(product, quantity)}
          >
            add to cart
          </a>
          <Link href={`/page/account/checkout`}>
            <a className="btn btn-solid">buy now</a>
          </Link>
        </div>
        {!!product.product_fit && <div className="border-product">
          <h6 className="product-title">product fit</h6>
          <p>{product.product_fit}</p>
        </div>}
        {!!product.material_ratio && <div className="border-product">
            <h6 className="product-title">Material Ratio</h6>
            <p>{product.material_ratio}</p>
        </div>}
        {!!product.department && <div className="border-product">
            <h6 className="product-title">Department</h6>
            <p>{product.department}</p>
        </div>}
        {!!product.generic_name && <div className="border-product">
            <h6 className="product-title">Generic Name</h6>
            <p>{product.generic_name}</p>
        </div>}
        {!!product.country_of_Orgin && <div className="border-product">
            <h6 className="product-title">Country Of Orgin</h6>
            <p>{product.country_of_Orgin}</p>
        </div>}
        {!!product.age_of_use && <div className="border-product">
            <h6 className="product-title">Age Of Use</h6>
            <p>{product.age_of_use}</p>
        </div>}
        {!!product.skillset && <div className="border-product">
            <h6 className="product-title">Skillset</h6>
            <p>{product.skillset}</p>
        </div>}

        {!!product.ideal_for && <div className="border-product">
            <h6 className="product-title">Ideal For</h6>
            <p>{product.ideal_for}</p>
        </div>}

        {!!product.occasion && <div className="border-product">
            <h6 className="product-title">Occasion</h6>
            <p>{product.occasion}</p>
        </div>}

        {!!product.primary_product_type_color && <div className="border-product">
            <h6 className="product-title">Primary Product Type Color</h6>
            <p>{product.primary_product_type_color}</p>
        </div>}

        {!!product.secondary_product_type_color && <div className="border-product">
            <h6 className="product-title">Secondary Product Type Color</h6>
            <p>{product.secondary_product_type_color}</p>
        </div>}

        {!!product.pattern && <div className="border-product">
            <h6 className="product-title">Pattern</h6>
            <p>{product.pattern}</p>
        </div>}

        {!!product.product_type && <div className="border-product">
            <h6 className="product-title">Product Type</h6>
            <p>{product.product_type}</p>
        </div>}

        {!!product.machine_washable && <div className="border-product">
            <h6 className="product-title">Machine Washable</h6>
            <p>{product.machine_washable}</p>
        </div>}

        {!!product.thread_count && <div className="border-product">
            <h6 className="product-title">Thread Count</h6>
            <p>{product.thread_count}</p>
        </div>}

        {!!product.maximum_wattage && <div className="border-product">
            <h6 className="product-title">Maximum Wattage</h6>
            <p>{product.maximum_wattage}</p>
        </div>}

        {!!product.Adjustable && <div className="border-product">
            <h6 className="product-title">Adjustable</h6>
            <p>{product.Adjustable}</p>
        </div>}

        {!!product.project_shape && <div className="border-product">
            <h6 className="product-title">Project Shape</h6>
            <p>{product.project_shape}</p>
        </div>}

        {!!product.body_material && <div className="border-product">
            <h6 className="product-title">Body Material</h6>
            <p>{product.body_material}</p>
        </div>}

        {!!product.product_inner_material && <div className="border-product">
            <h6 className="product-title">Product Inner Material</h6>
            <p>{product.product_inner_material}</p>
        </div>}

        {!!product.handle_with_care && <div className="border-product">
            <h6 className="product-title">Handle With Care</h6>
            <p>{product.handle_with_care}</p>
        </div>}

        {!!product.mechanism && <div className="border-product">
            <h6 className="product-title">mechanism</h6>
            <p>{product.mechanism}</p>
        </div>}

        {!!product.GSM && <div className="border-product">
            <h6 className="product-title">GSM</h6>
            <p>{product.GSM}</p>
        </div>}

        {!!product.leak_resistance && <div className="border-product">
            <h6 className="product-title">leak resistance</h6>
            <p>{product.leak_resistance}</p>
        </div>}

        {!!product.connector && <div className="border-product">
            <h6 className="product-title">connector</h6>
            <p>{product.connector}</p>
        </div>}

        {!!product.connectivity_technology && <div className="border-product">
            <h6 className="product-title">connectivity technology</h6>
            <p>{product.connectivity_technology}</p>
        </div>}

        {!!product.compatible_devices && <div className="border-product">
            <h6 className="product-title">compatible devices</h6>
            <p>{product.compatible_devices}</p>
        </div>}

        {!!product.hardware_platform && <div className="border-product">
            <h6 className="product-title">hardware platform</h6>
            <p>{product.hardware_platform}</p>
        </div>}

        {!!product.display_technologies && <div className="border-product">
            <h6 className="product-title">display technologies</h6>
            <p>{product.display_technologies}</p>
        </div>}

        {!!product.special_feature && <div className="border-product">
            <h6 className="product-title">special feature</h6>
            <p>{product.special_feature}</p>
        </div>}

        {!!product.resolution && <div className="border-product">
            <h6 className="product-title">resolution</h6>
            <p>{product.resolution}</p>
        </div>}

        {!!product.refresh_rate && <div className="border-product">
            <h6 className="product-title">refresh rate</h6>
            <p>{product.refresh_rate}</p>
        </div>}

        {!!product.battery_type && <div className="border-product">
            <h6 className="product-title">battery type</h6>
            <p>{product.battery_type}</p>
        </div>}

        {!!product.rechargeable && <div className="border-product">
            <h6 className="product-title">rechargeable</h6>
            <p>{product.rechargeable}</p>
        </div>}

        {!!product.no_of_battery && <div className="border-product">
            <h6 className="product-title">no of battery</h6>
            <p>{product.no_of_battery}</p>
        </div>}

        {!!product.warrently_summary && <div className="border-product">
            <h6 className="product-title">warrently summary</h6>
            <p>{product.warrently_summary}</p>
        </div>}

        {!!product.warrently_year && <div className="border-product">
            <h6 className="product-title">warrently year</h6>
            <p>{product.warrently_year}</p>
        </div>}

        {!!product.discount && <div className="border-product">
            <h6 className="product-title">discount</h6>
            <p>{product.discount}</p>
        </div>}

        {!!product.product_instock && <div className="border-product">
            <h6 className="product-title">product instock</h6>
            <p>{product.product_instock}</p>
        </div>}

        {!!product.product_quantity && <div className="border-product">
            <h6 className="product-title">product quantity</h6>
            <p>{product.product_quantity}</p>
        </div>}

        {!!product.product_price && <div className="border-product">
            <h6 className="product-title">product price</h6>
            <p>{product.product_price}</p>
        </div>}
        
        <div className="border-product">
          <h6 className="product-title">product details</h6>
          <p>{product.description}</p>
        </div>
        <div className="border-product">
          <h6 className="product-title">share it</h6>
          <div className="product-icon">
            <MasterSocial />
          </div>
        </div>
        <div className="border-product">
          <h6 className="product-title">Time Reminder</h6>
          <CountdownComponent />
        </div>
      </div>
    </>
  );
};

export default DetailsWithPrice;
