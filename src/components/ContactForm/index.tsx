import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { ContactProps, ValidationTypeProps } from "./types";
import { useForm } from "../../common/utils/useForm";
import validate from "../../common/utils/validationRules";
import { Button } from "../../common/Button";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import { ContactContainer, FormGroup, Span, ButtonContainer } from "./styles";

const Contact = ({ title, content, id, t }: ContactProps) => {
  const { values, errors, handleChange, handleSubmit } = useForm(validate);

  const ValidationType = ({ type }: ValidationTypeProps) => {
    const ErrorMessage = errors[type as keyof typeof errors];
    return <Span>{ErrorMessage}</Span>;
  };

  return (
    <ContactContainer id={id}>
      <Row justify="center" align="middle">
        {/* 🟢 Title과 Content 부분 - 더 넓게 설정 */}
        <Col span={20} style={{ textAlign: "center", marginBottom: "20px" }}>
          {title && <h6 style={{ fontSize: "24px", fontWeight: "bold" }}>{title}</h6>}
          {content && <p style={{ fontSize: "18px", maxWidth: "800px", margin: "0 auto" }}>{content}</p>}
        </Col>

        {/* 🟢 Email Form 부분 - 기존 크기 유지 */}
        <Col lg={10} md={12} sm={20} xs={24}>
          <FormGroup autoComplete="off" onSubmit={handleSubmit}>
            <Col span={24}>
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={values.name || ""}
                onChange={handleChange}
              />
              <ValidationType type="name" />
            </Col>
            <Col span={24}>
              <Input
                type="text"
                name="email"
                placeholder="Your Email"
                value={values.email || ""}
                onChange={handleChange}
              />
              <ValidationType type="email" />
            </Col>
            <Col span={24}>
              <TextArea
                placeholder="Your Message"
                value={values.message || ""}
                name="message"
                onChange={handleChange}
              />
              <ValidationType type="message" />
            </Col>
            <ButtonContainer>
              <Button name="submit">{t("Submit")}</Button>
            </ButtonContainer>
          </FormGroup>
        </Col>
      </Row>
    </ContactContainer>
  );
};

export default withTranslation()(Contact);
