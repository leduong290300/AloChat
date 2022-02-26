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

export default function LoginForm() {
  const [show, setShow] = useState(false);

  const handleChangeShow = () => {
    setShow(!show);
  };

  return (
    <VStack>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder="example@example.com" />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Mật khẩu</FormLabel>
        <InputGroup size="md">
          <Input type={show ? "text" : "password"} />
          <InputRightElement width="4.5em">
            <Button h="1.75em" size="sm" onClick={handleChangeShow}>
              {show ? "Ẩn" : "Hiện"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button colorScheme="blue" width="100%" style={{ marginTop: "15px" }}>
        Đăng nhập tài khoản
      </Button>
    </VStack>
  );
}
