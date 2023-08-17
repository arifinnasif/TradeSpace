import { FunctionComponent } from "react";

interface Step4Props {
  onPrev: () => void;
  onSubmit: () => void;
  category?: string;
  title?: string;
  description?: string;
  is_sell_ad: boolean;
  is_negotiable: boolean;
  is_used: boolean;
  years_used?: number;
  months_used?: number;
  days_used?: number;
  price?: number;
  images?: string[];
  is_phone_public: boolean;
  address?: string;
}

const Step4: FunctionComponent<Step4Props> = ({
  onPrev,
  onSubmit,
  category,
  title,
  description,
  is_sell_ad,
  is_negotiable,
  is_used,
  years_used,
  months_used,
  days_used,
  price,
  images,
  is_phone_public,
  address,
}) => {
  return(
    <div>
      <h1>Step 4</h1>
    </div>
  )
}

export default Step4;