"use client";

import { Button, ChevronRight } from "@relume_io/relume-ui";
import type { ButtonProps, ImageProps } from "@relume_io/relume-ui";

export type Layout1Props = React.ComponentPropsWithoutRef<"section">;

export const Layout1 = () => {
  const tagline = "Income Calculator";
  const heading = "Discover Your Income Potential";
  const description =
    "Use our Income Calculator to understand your Financial Potential and make informed descions.";
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {heading}
            </h2>
            <p className="md:text-md">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
