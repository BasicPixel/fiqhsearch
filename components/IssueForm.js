import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";

const IssueForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [maddhab, setMaddhab] = useState("hanbali");
  const [topic, setTopic] = useState("hanbali");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [proof, setProof] = useState("");

  return (
    <Stack spacing={4} pb={12}>
      <Heading>إضافة مسألة فقهية</Heading>
      <Text>
        اختر المذهب الفقهي والموضوع، ثم اكتب السؤال والجواب والدليل، كلّا في
        مكانه المخصص.
      </Text>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl isRequired py={2}>
            <FormLabel htmlFor="maddhab">المذهب الفقهي</FormLabel>
            <Select
              id="maddhab"
              dir="ltr"
              value={maddhab}
              onChange={(e) => setMaddhab(e.target.value)}
            >
              <option value="hanbali">الحنبلي</option>
              <option value="shafi'i">الشافعي</option>
              <option value="maliki">المالكي</option>
              <option value="hanafi">الحنفي</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="topic">الباب / الكتاب الفقهي</FormLabel>
            <Select
              id="topic"
              dir="ltr"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              <option value="hanbali">الحنبلي</option>
              <option value="shafi'i">الشافعي</option>
              <option value="maliki">المالكي</option>
              <option value="hanafi">الحنفي</option>
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
        </Stack>
      </form>
    </Stack>
  );
};

export default IssueForm;
