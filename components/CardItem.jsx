"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

export const CardItem = ({ id, imageSrc, name, description, price }) => {
  const { products } = useSelector((rootReducer) => rootReducer.cartReducer);
  const productInCart = products.find((product) => product.id === id);

  const dispatch = useDispatch();
  const handleAddItem = () => {
    dispatch({
      type: "cart/addProduct",
      payload: {
        id,
        imageSrc,
        name,
        price,
        description,
      },
    });
  };

  return (
    <div key={id} className="card-product">
      <div>
        <Image
          className="card-product-img"
          src={imageSrc}
          alt={name}
          width={300}
          height={300}
          layout="responsive"
          objectFit="contain"
          priority
        />
        <div className="product-info">
          <p className="product-name">{name}</p>
          <p className="product-description">{description}</p>
        </div>
      </div>
      <div>
        <div className="price-item-card">
          <Image
            src="/images/ethereum.png"
            alt="Price Icon"
            width={25}
            height={25}
          />
          <p>{price} ETH</p>
        </div>
        {productInCart ? (
          <div className="price-locked">ADICIONADO AO CARRINHO</div>
        ) : (
          <div className="price-unlocked" onClick={handleAddItem}>
            COMPRAR
          </div>
        )}
      </div>
    </div>
  );
};
