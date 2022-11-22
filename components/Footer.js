import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/global";
import CustomLink from "./CustomLink";
import nextConfig from "../next.config";
import Image from "next/image";

export default function Footer() {
  let { state } = useContext(GlobalContext);
  let { footers, isLoading } = state;
  const [copyright, setCopyright] = useState(nextConfig.env.FOOTER_COPYRIGHT);
  const [paymentImage, setPaymentImage] = useState(
    nextConfig.env.FOOTER_PAYMENT_LOGO_URL
  );

  return (
    <footer className="relative z-10 bg-[#D4A68B] w-full flex flex-col items-center py-6 md:py-12">
      <div className="wrapper-fluid grid grid-flow-row gap-y-6 md:gap-y-12">
        <div className="grid grid-cols-2 gap-y-6 md:grid-flow-col md:w-3/4 lg:w-1/2">
          {footers.map((item, i) => (
            <div key={`foot-menu-parent-${i}`} className="group">
              <h4 className="h3 !font-sans capitalize">
                {item.name.toLowerCase()}
              </h4>
              <div className="grid grid-flow-row mt-2 transition duration-100 group-hover:text-[#865132]">
                {item.children.map((footer, i) => (
                  <div key={`foot-menu-${i}`}>
                    <CustomLink
                      to={footer.url}
                      className={
                        "transition duration-100 hover:text-black hover:font-bold"
                      }
                    >
                      <span
                        className="text-xs md:text-sm"
                        dangerouslySetInnerHTML={{ __html: footer.name }}
                      />
                    </CustomLink>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="md:flex md:flex-row-reverse items-center justify-between border-t border-black border-opacity-5 pt-6">
          <Image
            src={paymentImage}
            alt="Payment method"
            width={500}
            height={25}
          />
          <div className="flex flex-col md:flex-row items-center space-x-1 mt-4 md:mt-0 space-y-2 md:space-y-0">
            <div className="text-xs">
              <span> {copyright} </span>
              Site by
              <a
                href="https://www.mineral.co.id"
                target="_blank"
                rel="noopener referrer"
              >
                Mineral
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
