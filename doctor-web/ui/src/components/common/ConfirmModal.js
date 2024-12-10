import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Loading from './../common/Loading';

function ConfirmModal({
  open,
  type,
  title,
  body,
  loading = false,
  disable = false,
  confirmButton,
  onConfirm,
  closeButton,
  onClose,
  children,
}) {
  const [show, setShow] = useState(open);

  const handleClose = () => {
    onClose && onClose(false);
  };

  const handleConfirm = () => {
    setShow(false);
    onConfirm && onConfirm(false);
  };

  useEffect(() => {
    setShow(open);
  }, [open]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body || children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {closeButton ?? 'Close'}
          </Button>
          <Button
            variant={type || 'primary'}
            disabled={disable}
            onClick={handleConfirm}
          >
            <Loading loading={loading}>{confirmButton}</Loading>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;
