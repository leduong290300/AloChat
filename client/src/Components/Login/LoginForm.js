import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { VStack } from "@chakra-ui/layout";
import { useTranslation } from "react-i18next";
export default function LoginForm() {
  const [show, setShow] = useState(false);

  const handleChangeShow = () => {
    setShow(!show);
  };
  const { t } = useTranslation();
  return (
    <VStack>
      <FormControl isRequired>
        <FormLabel>{t("email")}</FormLabel>
        <Input placeholder="example@example.com" />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>{t("password")}</FormLabel>
        <InputGroup size="md">
          <Input type={show ? "text" : "password"} />
          <InputRightElement width="5.5em">
            <Button h="1.75em" size="sm" onClick={handleChangeShow}>
              {show ? `${t("show")}` : `${t("hide")}`}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button colorScheme="blue" width="100%" style={{ marginTop: "15px" }}>
        {t("button_login")}
      </Button>
    </VStack>
  );
}
