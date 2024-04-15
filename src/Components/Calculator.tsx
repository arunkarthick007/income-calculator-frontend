import { Navbar3 } from "./NavBar";
import { Header36 } from "./HeadSection";
import { Layout1 } from "./FeatureSection";
import { CalculatorForm } from "./CalculatorForm";

function Calculator() {
  return (
    <div>
      <Navbar3
        logo={{
          src: "https://media.genistar.co.uk/graphics/logo/Genistar-master-logo-dark-24.svg",
          alt: "Logo",
        }}
        links={[
          { title: "Home", url: "https://genistar.co.uk/" },
          { title: "About", url: "https://genistar.co.uk/who-we-are" },
        ]}
        buttons={[{ title: "Calculator", size: "sm", variant: "primary" }]}
      />
      <div>
        <Header36
          heading="Empowering Families Through Financial Education" // Set the heading prop
          description="At Genistar, we are dedicated to educating families about their financial choices, helping them achieve financial freedom and security." // Set the description prop
          buttons={[{ title: "Learn More" }]} // Set the buttons prop
          image={{
            // Set the image prop
            src: "https://media.genistar.co.uk/graphics/calculator.svg",
            alt: "Calculator",
          }}
        />
      </div>
      <div>
        <Layout1></Layout1>
      </div>
      <div>
        <CalculatorForm></CalculatorForm>
      </div>
    </div>
  );
}

export default Calculator;
