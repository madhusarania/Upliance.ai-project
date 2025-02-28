import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Save, AlertTriangle } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useSpring, animated } from "@react-spring/web";

const UserForm: React.FC = () => {
  const { formState, setFormState, saveUserData, hasUnsavedChanges } =
    useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [navigateTo, setNavigateTo] = useState<string | null>(null);

  const formSpring = useSpring({
    to: {
      opacity: 1,
      transform: "translateY(0px)",
    },
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 120, friction: 14 },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserData();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNavigateTo(null);
  };

  const handleConfirmNavigation = () => {
    setIsModalOpen(false);
    if (navigateTo) {
      window.location.href = navigateTo;
    }
  };

  return (
    <>
      <animated.div style={formSpring}>
        <Card className="w-full">
          <CardHeader className="flex justify-center pb-0">
            <h2 className="text-2xl font-bold">User Data Form</h2>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                variant="bordered"
                isRequired
              />
              <Input
                label="Address"
                name="address"
                value={formState.address}
                onChange={handleInputChange}
                variant="bordered"
                isRequired
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleInputChange}
                variant="bordered"
                isRequired
              />
              <Input
                label="Phone"
                name="phone"
                type="tel"
                value={formState.phone}
                onChange={handleInputChange}
                variant="bordered"
                isRequired
              />
              <Button
                type="submit"
                color="primary"
                className="mt-2 self-center"
                startContent={<Save size={18} />}
              >
                Save User Data
              </Button>
            </form>
          </CardBody>
        </Card>
      </animated.div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalContent>
          <ModalHeader className="flex gap-1 items-center text-warning">
            <AlertTriangle size={20} />
            Unsaved Changes
          </ModalHeader>
          <ModalBody>
            <p>
              You have unsaved changes in the form. Do you want to leave without
              saving?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={handleCloseModal}>
              Cancel
            </Button>
            <Button color="danger" onPress={handleConfirmNavigation}>
              Leave Without Saving
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserForm;
