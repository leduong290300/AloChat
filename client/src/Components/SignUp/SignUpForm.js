import React, { useState } from "react";
import { VStack } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

export default function SignUpForm() {
  const [show, setShow] = useState(false);

  const handleChangeShow = () => {
    setShow(!show);
  };

  const uploadImage = (image) => {};

  return (
    <VStack>
      <FormControl isRequired>
        <FormLabel>Tên đăng nhập</FormLabel>
        <Input placeholder="Nguyen Van A" />
      </FormControl>

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

      <FormControl isRequired>
        <FormLabel>Nhập lại mật khẩu</FormLabel>
        <InputGroup size="md">
          <Input type={show ? "text" : "password"} />
          <InputRightElement width="4.5em">
            <Button h="1.75em" size="sm" onClick={handleChangeShow}>
              {show ? "Ẩn" : "Hiện"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Tải ảnh lên</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => uploadImage(e.target.files[0])}
        />
      </FormControl>

      <Button colorScheme="blue" width="100%" style={{ marginTop: "15px" }}>
        Đăng ký tài khoản
      </Button>
    </VStack>
  );
}
