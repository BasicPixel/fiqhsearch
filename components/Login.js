import {
  Alert,
  AlertIcon,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FiLogIn } from "react-icons/fi";
import app from "../src/client";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(getAuth(app));
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Stack spacing={4}>
      <Heading>تسجيل الدخول</Heading>
      <Text>
        تسجيل الدخول لواجهة المسؤولين لإضافة المسائل الفقهية إلى الموقع
      </Text>
      <Text>لإنشاء حساب، يرجى التواصل مع مسؤولي الموقع</Text>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          signInWithEmailAndPassword(loginData.email, loginData.password);
        }}
      >
        <FormControl isRequired py={2}>
          <FormLabel htmlFor="email">البريد الإلكتروني</FormLabel>
          <Input
            id="email"
            placeholder="Email..."
            type="email"
            dir={"ltr"}
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="password">كلمة السر</FormLabel>
          <Input
            id="password"
            placeholder="Password..."
            dir={"ltr"}
            type={showPassword ? "text" : "password"}
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </FormControl>

        <Checkbox
          isChecked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
          py={2}
          display={"block"}
        >
          إظهار كلمة السر
        </Checkbox>

        <Button leftIcon={<FiLogIn />} colorScheme="blue" type="submit">
          تسجيل الدخول
        </Button>
      </form>

      {loading && (
        <Alert status="info">
          <AlertIcon />
          جارٍ الدخول...
        </Alert>
      )}

      {error && (
        <Alert status="error">
          <AlertIcon />
          لم يتم العثور على الحساب.
        </Alert>
      )}
    </Stack>
  );
};

export default Login;
