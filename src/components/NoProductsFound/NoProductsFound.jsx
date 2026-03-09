export default function NoProductsFound() {
  return (
    <>
      <section className="text-center flex justify-center items-center">
         <h3 className="md:text-3xl text-2xl py-24 font-bold text-green-600">
                    We couldn't find that Product . How about you check out our <Link to={'/'} className="underline hover:text-green-800 dark:hover:text-green-400">Home Page</Link>
                  </h3>
      </section>
    </>
  );
}
