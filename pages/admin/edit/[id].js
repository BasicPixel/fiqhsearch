import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import supabase from "../../../src/client";
import { useState } from "react";
import { Auth } from "@supabase/ui";

const IssueEditor = ({ issue }) => {
  const [question, setQuestion] = useState(issue.question);
  const [answer, setAnswer] = useState(issue.answer);
  const [proof, setProof] = useState(issue.proof);

  const [submitData, setSubmitData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = Auth.useUser();

  const submitEdit = async () => {
    setSubmitData(null);
    setError(null);
    setLoading(true);

    const { data, error } = await supabase
      .from("issues")
      .update({ question, answer, proof })
      .eq("id", issue.id);

    setLoading(false);

    if (error) setError(error.message);
    else setSubmitData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !(
        question === issue.question &&
        answer === issue.answer &&
        proof === issue.proof
      )
    ) {
      submitEdit();
    } else {
      console.log("nah man");
    }
  };

  if (user)
    return (
      <Stack spacing={2}>
        <Heading>تعديل مسألة</Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
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
              تأكيد التعديلات
            </Button>
          </Stack>
        </form>

        {loading && (
          <Alert status="warning">
            <Spinner />
            <AlertTitle mr={2}>جار تعديل المسألة...</AlertTitle>
          </Alert>
        )}

        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>حدثت مشكلة خلال تعديل المسألة</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!error && submitData && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle mr={2}>تم تعديل المسألة بنجاح</AlertTitle>
          </Alert>
        )}
      </Stack>
    );

  return <Heading>You have to be logged in.</Heading>;
};

export default IssueEditor;

export async function getServerSideProps(context) {
  const { data: issue } = await supabase
    .from("issues")
    .select()
    .eq("id", context.query.id)
    .single();

  return {
    props: { issue },
  };
}
