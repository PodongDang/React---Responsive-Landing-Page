import { useState } from "react";
import { notification } from "antd";
import emailjs from "emailjs-com";

export interface IValues {
  name: string;
  email: string;
  message: string;
  [key: string]: string; // 인덱스 시그니처 추가
}


const initialValues: IValues = { name: "", email: "", message: "" };

// EmailJS 설정 (환경변수 또는 직접 입력)
const EMAIL_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "your_service_id";
const EMAIL_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "your_template_id";
const EMAIL_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "your_public_key";

const showNotification = (type: "success" | "error", message: string, description: string) => {
  notification[type]({ message, description });
};

export const useForm = (validate: (values: IValues) => IValues) => {
  const [formState, setFormState] = useState<{ values: IValues; errors: IValues }>({
    values: { ...initialValues },
    errors: { ...initialValues },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    event.target.style.backgroundColor = value.trim() ? "lightyellow" : "white";

    setFormState((prevState) => ({
      values: { ...prevState.values, [name]: value },
      errors: { ...prevState.errors, [name]: "" },
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { values } = formState;
    const errors = validate(values);
    setFormState((prevState) => ({ ...prevState, errors }));

    if (Object.values(errors).some((error) => error)) return;

    try {
      const response = await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        values,
        EMAIL_PUBLIC_KEY
      );

      if (response.status === 200) {
        (event.target as HTMLFormElement).reset(); // 타입 단언 추가
        setFormState({ values: { ...initialValues }, errors: { ...initialValues } });
        showNotification("success", "Success", "Your message has been sent!");
      } else {
        showNotification("error", "Error", "Failed to send your message.");
      }
    } catch (error) {
      showNotification("error", "Error", "Failed to submit form. Please try again later.");
    }
  };

  return { handleChange, handleSubmit, values: formState.values, errors: formState.errors };
};
