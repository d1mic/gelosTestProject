function Page404() {
  return (
    <section className="w-full h-screen">
      <img
        src={process.env.PUBLIC_URL + "/404.png"}
        className="object-contain w-full h-full"
        alt="404"
      />
    </section>
  );
}

export default Page404;
