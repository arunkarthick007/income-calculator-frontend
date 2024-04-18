import type { ImageProps, ButtonProps } from "@relume_io/relume-ui";
import { Link } from "react-router-dom";

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
  image: ImageProps;
};

export type Header36Props = React.ComponentPropsWithoutRef<"section"> & Props;

export const Header36 = (props: Header36Props) => {
  const { heading, description, buttons, image } = {
    ...props,
  } as Props;
  return (
    <header className="flex flex-col-reverse md:flex-row items-center gap-y-16 pt-8 md:h-screen lg:grid-cols-2 lg:pt-0">
      <div className="mx-[5%] md:max-w-md md:justify-self-start lg:ml-[5vw] lg:mr-20 lg:justify-self-end">
        <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
          {heading}
        </h1>
        <p className="md:text-md pb-1 pt-2">{description}</p>
      </div>
      <div className="mr-[5%] h-auto md:h-full lg:mr-[5vw] md:ml-auto">
        <img
          src={image.src}
          alt={image.alt}
          className="md:h-full w-full md:max-h-[40rem] md:w-auto"
        />
      </div>
    </header>
  );
};
