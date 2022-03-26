import { useRouter } from "next/router";
import React, { useState } from "react";

import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";

import { MADHHABS } from "../../../src/constants";
import { useData } from "../../../hooks/useData";

const Add = () => {
  const router = useRouter();
  const madhhab = router.query.madhhab;
  const data = useData();

  // I spent too much time on the code from here
  const structuredData = {};

  data.forEach((obj) => {
    structuredData[obj.id] = { ...obj };
  });

  const allTopics = [];

  for (let i in structuredData) {
    if (structuredData[i].issues) {
      allTopics.push(...Object.keys(structuredData[i].issues));
    }
  }
  // To here

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(topic);
    console.log(question);
    console.log(answer);
    console.log(proof);
  };

  const [topic, setTopic] = useState(allTopics[0]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [proof, setProof] = useState("");

  return (
    <Stack spacing={4} pb={12}>
      <Heading>إضافة مسألة فقهية</Heading>
      <Text>
        اختر الباب الفقهي ثم اكتب السؤال والجواب والدليل، كلّا في مكانه المخصص.
      </Text>

      <Text>المذهب الفقهي: {MADHHABS[madhhab]}</Text>

      <Divider />

      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="topic">الباب / الكتاب الفقهي</FormLabel>
            <Select
              id="topic"
              dir="ltr"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              {allTopics.map((el) => (
                <option value={el} key={el}>
                  {el}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="question">السؤال</FormLabel>
            <Input
              id="question"
              type={"text"}
              placeholder="نص السؤال..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="answer">الجواب</FormLabel>
            <Textarea
              id="answer"
              type={"text"}
              placeholder="نص الجواب..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={5}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="proof">الدليل</FormLabel>
            <Textarea
              id="proof"
              type={"text"}
              placeholder="دليل المسألة..."
              value={proof}
              onChange={(e) => setProof(e.target.value)}
              rows={5}
            />
          </FormControl>
          <Button type="submit" colorScheme={"blue"}>
            إضافة المسألة
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default Add;
