import { useState } from "react";

import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Auth } from "@supabase/ui";

import supabase from "src/client";
import Form from "components/Form/Form";
import FormHeader from "components/Form/FormHeader";
import FormBody from "components/Form/FormBody";
import FormFeedback from "components/Form/FormFeedback";
import CustomAlert from "components/Form/CustomAlert";
import DeleteIssueBtn from "components/Buttons/DeleteIssueBtn";

const IssueEditor = ({ issue }) => {
  const [question, setQuestion] = useState(issue?.question);
  const [answer, setAnswer] = useState(issue?.answer);
  const [proof, setProof] = useState(issue?.proof);

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
      .update({ ...issue, question, answer, proof })
      .eq("id", issue?.id);

    setLoading(false);

    if (error) setError(error.message);
    else setSubmitData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !(
        question === issue?.question &&
        answer === issue?.answer &&
        proof === issue?.proof
      )
    ) {
      submitEdit();
    }
  };

  if (user) {
    if (issue) {
      return (
        <Form>
          <FormHeader title={"تعديل المسألة"} />
          <form onSubmit={handleSubmit}>
            <FormBody>
              <DeleteIssueBtn id={issue?.id} />
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
            </FormBody>
          </form>

          <FormFeedback>
            {loading && (
              <CustomAlert status="warning" title="جارٍ تعديل المسألة..." />
            )}

            {error && (
              <CustomAlert
                status="error"
                title="حدثت مشكلة خلال تعديل المسألة"
                description={error}
              />
            )}

            {!error && submitData && (
              <CustomAlert status="success" title="تم تعديل المسألة" />
            )}
          </FormFeedback>
        </Form>
      );
    } else {
      return <Heading>لم نعثر على المسألة المطلوبة.</Heading>;
    }
  }

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
