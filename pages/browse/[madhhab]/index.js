import { useRouter } from "next/router";

import { Container, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";

import Card from "components/Card";
import AddSectionBtn from "components/Buttons/AddSectionBtn";
import useData from "hooks/useData";
import LoadingSkeleton from "components/LoadingSkeleton";
import { MADHHABS } from "src/constants";

const Browse = () => {
  const router = useRouter();
  const madhhab = router.query.madhhab || "hanbali";
  const { user } = Auth.useUser();

  const [data, loading, error] = useData(
    `sections?select=*&madhhab=eq.${madhhab}`
  );

  return (
    <Container maxW={"full"} py={"6"}>
      <Stack spacing={4}>
        <Heading>أقسام المسائل</Heading>
        <Text>المذهب: {MADHHABS[madhhab]}</Text>

        {user && <AddSectionBtn />}

        {!loading && data && (
          <Flex py={4} gap={4} flexWrap="wrap">
            {data.length === 0 ? (
              <Text fontSize={"lg"}>ما من أقسام هنا...</Text>
            ) : (
              data.map((el) => (
                <Link key={el.id} href={`${madhhab}/${el.id}`}>
                  <Card>
                    <Text fontSize={"xl"}>{el.name}</Text>
                  </Card>
                </Link>
              ))
            )}
          </Flex>
        )}

        {loading && <LoadingSkeleton />}

        {error && (
          <Heading>
            There was an error while fetching data. Check the console for more
            info.
          </Heading>
        )}
      </Stack>
    </Container>
  );
};

export default Browse;
