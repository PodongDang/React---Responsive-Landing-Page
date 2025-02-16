import { lazy } from "react";
import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import MissionContent from "../../content/MissionContent.json";
import ProductContent from "../../content/ProductContent.json";
import ContactContent from "../../content/ContactContent.json";

const Contact = lazy(() => import("../../components/ContactForm"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const ContentBlock2 = lazy(() => import("../../components/ContentBlock2"));


const Home = () => {
  return (
    <Container>
      <ScrollToTop />
      <ContentBlock2
        direction="left"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        id="intro"
      />
      <MiddleBlock
        title={MiddleBlockContent.title}
        content={MiddleBlockContent.text}
      />
      <ContentBlock
        direction="left"
        title={AboutContent.title}
        content={AboutContent.text}
        section={AboutContent.section}
        icon="meditation.png"
        id="about"
      />
      <ContentBlock
        direction="right"
        title={MissionContent.title}
        content={MissionContent.text}
        icon="nature.png"
        id="mission"
      />
      {/* <ContentBlock
        direction="left"
        title={ProductContent.title}
        content={ProductContent.text}
        icon="waving.svg"
        id="product"
      /> */}
      <Contact
        title={ContactContent.title}
        content={ContactContent.text}
        id="contact"
      />
    </Container>
  );
};

export default Home;
