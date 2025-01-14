"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { CartSidebar } from "./CartSidebar";

export function Header() {
  const { products, cartVisibility } = useSelector(
    (rootReducer) => rootReducer.cartReducer
  );
  const dispatch = useDispatch();

  const handleVisibeSidebar = () => {
    dispatch({
      type: "cart/setVisible",
      payload: !cartVisibility,
    });
  };

  return (
    <>
      <header>
        <div className="logo-container">
          <Image
            src="/images/starsoft.png"
            alt="Starsoft Logo"
            width={80}
            height={36}
            priority
          />
        </div>
        <div className="cart">
          <button onClick={handleVisibeSidebar} className="bag-icon">
            <Image
              src="/images/bag.svg"
              alt="Icon bag"
              width={30}
              height={30}
              priority
            />
            <p>{products.length}</p>
          </button>
        </div>
      </header>
      <CartSidebar handleVisibeSidebar={handleVisibeSidebar} />
    </>
  );
}
