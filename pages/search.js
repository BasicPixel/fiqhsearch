import { useRouter } from "next/router";

import { Divider, Heading, Stack, Text } from "@chakra-ui/react";

import IssueDisplay from "components/IssueDisplay";
import supabase from "src/client";
import { ISSUE_FIELDS, MADHHABS } from "src/constants";

const Search = ({ results }) => {
  const router = useRouter();

  return (
    <Stack spacing={4}>
      <Heading>نتائج البحث</Heading>
      {/* Display data about provided query */}
      <Text>
        بحثتَ عن: &quot;<b>{router.query.q}</b>&quot; في{" "}
        <b>{ISSUE_FIELDS[router.query.searchIn]}</b> من المذهب{" "}
        <b>{MADHHABS[router.query.madhhab]}</b>
      </Text>
      {results.length > 1 ? (
        <IssueDisplay issues={results} />
      ) : (
        <>
          <Divider />
          <Heading fontSize={"2xl"}>لم يعد بحثك بأي نتائج...</Heading>
          <Text fontSize={"lg"}>جرب البحث بكلمات أقل.</Text>
        </>
      )}
    </Stack>
  );
};

export default Search;

export async function getServerSideProps(context) {
  const { data: results } = await supabase
    .from("issues")
    .select()
    .eq("madhhab", context.query.madhhab)
    .textSearch(context.query.searchIn, `'${context.query.q}'`);

  return {
    props: { results },
  };
}
