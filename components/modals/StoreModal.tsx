"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/Modal";

const StoreModal = () => {
  const StoreModal = useStoreModal();
  return (
    <Modal
      title="create store"
      description="njkn"
      isOpen={StoreModal.isOpen}
      onClose={StoreModal.onClose}
    >
      Future create
    </Modal>
  );
};

export default StoreModal;
