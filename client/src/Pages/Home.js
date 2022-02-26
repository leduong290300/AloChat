import React, { useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Select,
} from "@chakra-ui/react";
import LoginForm from "../Components/Login/LoginForm";
import SignUpForm from "../Components/SignUp/SignUpForm";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";

const languages = [
  {
    code: "vi",
    name: "Tiếng việt",
    country_code: "vi",
  },
  {
    code: "us",
    name: "English",
    country_code: "us",
  },
  {
    code: "kr",
    name: "한국어",
    country_code: "kr",
  },
];
export default function Home() {
  const currentLanguageCode = cookies.get("i18next") || "vi";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
  }, [currentLanguage, t]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        flexWrap="wrap"
      >
        <Text fontSize="30px" fontFamily="Work sans" color="black">
          Alochat
        </Text>
        <Select placeholder={t("choose_language")}>
          {languages.map(({ code, name, country_code }) => (
            <option
              key={code}
              value={code}
              onClick={() => {
                i18next.changeLanguage(code);
              }}
            >
              {name}
            </option>
          ))}
        </Select>
      </Box>
      <Box
        bg="white"
        color="black"
        borderRadius="lg"
        borderWidth="1px"
        w="100%"
        p={4}
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">{t("name_button_login")}</Tab>
            <Tab width="50%">{t("name_button_register")}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            <TabPanel>
              <SignUpForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
