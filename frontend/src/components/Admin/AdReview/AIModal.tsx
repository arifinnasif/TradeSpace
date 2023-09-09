import {
  Text,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  Badge,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { FunctionComponent, MutableRefObject } from "react";

interface AIModalProps {
  aiVerdict: any;
  initialRef: MutableRefObject<null>;
  finalRef: MutableRefObject<null>;
  isOpen: boolean;
  onClose: () => void;
}

const AIModal: FunctionComponent<AIModalProps> = ({
  aiVerdict,
  initialRef,
  finalRef,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text maxWidth={"350px"} noOfLines={1}>
            Threat Score : {aiVerdict.weighted_threat_score.toFixed(2)}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={2}>
            <HStack spacing={2}>
              {aiVerdict.exif_verdict.is_image_downloaded && (
                <Tag
                  size={"lg"}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="red"
                >
                  <TagLabel>Downloaded</TagLabel>
                </Tag>
              )}
              {aiVerdict.exif_verdict.is_image_tampered && (
                <Tag
                  size={"lg"}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="red"
                >
                  <TagLabel>Tampered</TagLabel>
                </Tag>
              )}
              {aiVerdict.exif_verdict.is_image_stale && (
                <Tag
                  size={"lg"}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="red"
                >
                  <TagLabel>Stale</TagLabel>
                </Tag>
              )}
            </HStack>
            <HStack spacing={2}>
              {aiVerdict.category_verdict.specified_category_probability && (
                <Tag
                  size={"lg"}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="orange"
                >
                  <TagLabel>
                    {(
                      aiVerdict.category_verdict
                        .specified_category_probability * 100
                    ).toFixed(2)}
                    % match
                  </TagLabel>
                </Tag>
              )}
            </HStack>
            <HStack spacing={2}>
              {aiVerdict.nlp_verdict.has_banned_words && (
                <Tag
                  size={"lg"}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="red"
                >
                  <TagLabel>Banned Words</TagLabel>
                </Tag>
              )}
              {aiVerdict.nlp_verdict.has_harmful_links && (
                <Tag
                  size={"lg"}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="red"
                >
                  <TagLabel>Malicious Links</TagLabel>
                </Tag>
              )}
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AIModal;
