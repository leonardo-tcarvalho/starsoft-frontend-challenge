import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

export function CartSidebar({ handleVisibeSidebar }) {
  const { products, cartVisibility } = useSelector(
    (rootReducer) => rootReducer.cartReducer
  );

  const dispatch = useDispatch();

  const handleSomeProduct = (product) => {
    dispatch({
      type: "cart/addProduct",
      payload: product,
    });
  };

  const handleRemoveProduct = (product) => {
    if (product.quantity > 1) {
      dispatch({
        type: "cart/removeProduct",
        payload: product,
      });
    } else {
      dispatch({
        type: "cart/deleteProduct",
        payload: product,
      });
    }
  };

  const handleDeleteProduct = (product) => {
    dispatch({
      type: "cart/deleteProduct",
      payload: product,
    });
  };

  return (
    <aside
      className={`cart-sidebar ${cartVisibility ? "cart-open" : "cart-close"}`}
    >
      <div className="header-cart">
        <button
          onClick={handleVisibeSidebar}
          className={`arrow-button ${
            cartVisibility ? "arrow-open" : "arrow-close"
          }`}
        >
          <Image
            src="/images/arrow.png"
            alt=""
            width={20}
            height={20}
            layout="responsive"
          />
        </button>
        <p>Mochila de Compras</p>
      </div>
      <div className="scroll-list">
        <div className="container-products">
          {products.map((product) => (
            <div className="product-item" key={product.id}>
              <div className="container-product-img-cart">
                <Image
                  className="card-img-cart"
                  src={product.imageSrc}
                  alt=""
                  width={0}
                  height={0}
                  layout="responsive"
                />
              </div>
              <div className="container-product-info-cart">
                <p className="product-title">{product.name}</p>
                <p className="product-description">{product.description}</p>
                <div className="container-price-cart">
                  <Image
                    src="/images/ethereum.png"
                    alt="Price Icon"
                    width={25}
                    height={25}
                  />
                  <p>{product.price} ETH</p>
                </div>
                <div className="container-qtd-cart">
                  <div className="product-qtd">
                    <button onClick={() => handleRemoveProduct(product)}>
                      -
                    </button>
                    <p className="qtd">{product.quantity}</p>
                    <button onClick={() => handleSomeProduct(product)}>
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(product)}
                    className="container-delete-cart"
                  >
                    <Image
                      src="/images/delete.png"
                      alt=""
                      width={0}
                      height={0}
                      layout="responsive"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container-payment">
        <div className="total-price-cart">
          <p>TOTAL</p>
          <div>
            <Image src="/images/ethereum.png" alt="" width={20} height={20} />
            <p>
              {products.reduce(
                (total, product) => total + product.price * product.quantity,
                0
              )}{" "}
              ETH
            </p>
          </div>
        </div>
        <button className="button-payment-cart">FINALIZAR COMPRA</button>
      </div>
    </aside>
  );
}
