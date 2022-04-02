import React from "react";
import { useRouter } from "next/router";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { FiTrash } from "react-icons/fi";

import supabase from "src/client";

const DeleteIssueBtn = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    setLoading(true);

    await supabase.from("issues").delete().match({ id });

    setLoading(false);
    onClose();
    router.back();
  };

  return (
    <>
      <Button colorScheme={"red"} rightIcon={<FiTrash />} onClick={onOpen}>
        حذف المسألة
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent dir="ltr">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              حذف المسألة
            </AlertDialogHeader>

            <AlertDialogBody>
              هل أنت متأكد؟ لا يمكنك إعادة المسألة نفسها بعد الحذف.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                إلغاء
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                حذف
              </Button>
              {loading && <Spinner />}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteIssueBtn;
