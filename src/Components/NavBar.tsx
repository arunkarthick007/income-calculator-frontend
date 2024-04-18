import type { ImageProps, ButtonProps } from "@relume_io/relume-ui";

type Props = {
  logo: ImageProps;
};

export type Navbar3Props = React.ComponentPropsWithoutRef<"section"> & Props;

export const Navbar3 = (props: Navbar3Props) => {
  const { logo } = {
    ...props,
  } as Props;

  return (
    <nav className="grid h-auto w-full grid-cols-[1fr_max-content_1fr] items-center justify-between border-b border-border-primary bg-white px-[5%] md:min-h-18">
      <div className="flex min-h-16 w-[100px] items-center md:w-1/4">
        <img src={logo.src} alt={logo.alt} style={{ display: "block" }} />
      </div>
    </nav>
  );
};
