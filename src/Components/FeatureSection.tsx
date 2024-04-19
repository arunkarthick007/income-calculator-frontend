"use client";

import { Button, ChevronRight } from "@relume_io/relume-ui";
import type { ButtonProps, ImageProps } from "@relume_io/relume-ui";

export type Layout1Props = React.ComponentPropsWithoutRef<"section">;

export const Layout1 = () => {
  //const tagline = "";
  const heading = "Let's Get Started!";
  return (
    <section className="px-[5%] md:py-4 pt-12">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:items-center text-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {heading}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};
