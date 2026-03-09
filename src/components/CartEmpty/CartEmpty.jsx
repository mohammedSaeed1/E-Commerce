import { Link } from "react-router-dom";

export default function CartEmpty() {
  return (
    <>
      <section className="text-center flex justify-center items-center h-[70vh] pt-2">
        <h3 className="md:text-3xl text-2xl  font-bold text-green-600 block">
          Cart is Empty !
        </h3>
        <Link to={`/products`}>
          <button className="btn">Check Our Products</button>
        </Link>
      </section>
    </>
  );
}
