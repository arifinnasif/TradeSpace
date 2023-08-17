import { Box, Card, CardBody, CardHeader, Heading, Stack,
         StackDivider,
         Text,
} from "@chakra-ui/react";

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
  <Card>
    <CardHeader>
      <Heading size='md'>Check your Ad informations</Heading>
    </CardHeader>

    <CardBody>
      <Stack divider={<StackDivider />} spacing='4'>
        <Box>
          <Heading size='xs' textTransform='uppercase'>
            Category
          </Heading>
          <Text pt='2' fontSize='sm'>
            {category}
          </Text>
        </Box>
        
        <Box>
          <Heading size='xs' textTransform='uppercase'>
            Title
          </Heading>
          <Text pt='2' fontSize='sm'>
            {title}
          </Text>
        </Box>
      </Stack>
    </CardBody>
  </Card>
  )
}

export default Step4;