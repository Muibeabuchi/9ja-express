import { usePaystackPayment } from "react-paystack"
import { toast } from "sonner"

const usePaystack = ({
  amount,
  email,
  onSuccess,
  onError,
}: {
  amount: number
  email: string
  onSuccess: () => void
  onError?: () => void
}) => {
  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: amount * 100, // Amount in kobo (e.g., 20000 NGN)
    publicKey: import.meta.env.VITE_PAYSTACK_API_KEY,
  }

  const onClose = () => {
    toast.error("Payment cancelled")
    onError?.()
  }

  const initializePayment = usePaystackPayment(config)

  return {
    initializePayment: () =>
      initializePayment({
        onSuccess,
        onClose,
      }),
  }
}

export default usePaystack
