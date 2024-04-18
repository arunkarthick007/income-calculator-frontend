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
      />
      <div>
        <Header36
          heading="Genistar Worksheet For Personal Income" // Set the heading prop
          description="Plan Your Work, Work Your Plan!" // Set the description prop
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
