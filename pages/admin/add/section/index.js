import { useState } from "react";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

import supabase from "src/client";
import { MADHHABS } from "src/constants";
import Form from "components/Form/Form";
import FormHeader from "components/Form/FormHeader";
import FormBody from "components/Form/FormBody";
import FormFeedback from "components/Form/FormFeedback";
import CustomAlert from "components/Form/CustomAlert";

const AddSection = () => {
  const madhhabNames = Object.keys(MADHHABS);

  const submitSection = async () => {
    setSubmitData(null);
    setError(null);
    setLoading(true);

    const { data, error } = await supabase
      .from("sections")
      .insert([{ madhhab, name }]);

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSubmitData(data);
      setName("");
    }
  };

  const [madhhab, setMadhhab] = useState(madhhabNames[0]);
  const [name, setName] = useState("");

  const [submitData, setSubmitData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Form>
      <FormHeader
        title={"إضافة قسم فقهي"}
        description={
          "اختر المذهب ثم اسم القسم الفقهي مثل: عبادات، معاملات إلخ."
        }
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitSection();
        }}
      >
        <FormBody>
          <FormControl isRequired>
            <FormLabel htmlFor="madhhab">المذهب الفقهي</FormLabel>
            <Select
              id="madhhab"
              dir="ltr"
              value={madhhab}
              onChange={(e) => setMadhhab(e.target.value)}
            >
              {Object.keys(MADHHABS).map((el) => (
                <option value={el} key={el}>
                  {MADHHABS[el]}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="name">اسم القسم الفقهي</FormLabel>
            <Input
              id="name"
              type={"text"}
              placeholder="الاسم"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <Button type="submit" colorScheme={"blue"}>
            إضافة القسم
          </Button>
        </FormBody>
      </form>

      <FormFeedback>
        {loading && (
          <CustomAlert status={"warning"} title={"تتم إضافة القسم..."} />
        )}

        {error && (
          <CustomAlert
            status={"error"}
            title={"حدثت مشكلة خلال إضافة القسم"}
            description={error}
          />
        )}

        {!error && submitData && (
          <CustomAlert
            status={"success"}
            title={"تمت إضافة القسم الفقهي بنجاح"}
          />
        )}
      </FormFeedback>
    </Form>
  );
};

export default AddSection;
