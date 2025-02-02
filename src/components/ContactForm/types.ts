import { TFunction } from "react-i18next";
import { IValues } from "../../common/utils/useForm"; // IValues 가져오기

export interface ContactProps {
  title: string;
  content: string;
  id: string;
  t: TFunction;
}

export interface ValidationTypeProps {
  type: keyof IValues; // IValues의 키 중 하나만 허용
}
