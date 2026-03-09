import { Link } from "react-router-dom";

export default function CartEmpty() {
  return (
    <>
      <section className="text-center h-[70vh] pt-2">
        <h3 className="md:text-3xl text-2xl  font-bold text-green-600 py-28">
          Cart is Empty !
        </h3>
        <Link to={`/products`}>
          <button className="btn">Check Our Products</button>
        </Link>
      </section>
    </>
  );
}
