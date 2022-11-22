import Head from "next/head";
import Image from "next/image";
import LayoutDefault from "../layouts/default";

export default function Home() {
  return (
    <section className="Homepage">
      <section className="HeroSlide flex justify-center pb-6 md:pb-10">
        <div className="w-screen max-w-screen-3xl">INI BODY</div>
      </section>
    </section>
  );
}

Home.getLayout = function getLayout(page) {
  return <LayoutDefault>{page}</LayoutDefault>;
};
