import { IValues } from "../../common/utils/useForm"; // IValues를 가져오기

export default function validate(values: IValues): IValues {
  const errors: IValues = { name: "", email: "", message: "" };

  if (!values.name.trim()) {
    errors.name = "Name is required";
  }
  if (!values.email.trim()) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.message.trim()) {
    errors.message = "Message is required";
  }

  return errors;
}
